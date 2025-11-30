"""
100%カバレッジ達成のための最終テスト

残りの未カバー行をすべてカバーします。
"""
from unittest.mock import patch
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status, serializers

User = get_user_model()


class AuthenticationSerializerFinalTestCase(TestCase):
    """認証シリアライザーの最終テスト"""

    def test_register_serializer_duplicate_email_in_validate_email(self):
        """RegisterSerializerのvalidate_emailで重複エラー (行99)"""
        from apps.authentication.serializers import RegisterSerializer

        # 既存ユーザー作成
        User.objects.create_user(
            email='existing@example.com',
            password='testpass123'
        )

        # 同じメールで登録試行
        serializer = RegisterSerializer(data={
            'email': 'EXISTING@example.com',  # 大文字でも検証される
            'password': 'StrongPass123!',
            'password_confirm': 'StrongPass123!'
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)
        self.assertIn('既に使用されています', str(serializer.errors['email']))

    def test_google_auth_serializer_empty_token(self):
        """Google認証で空トークン (行186-188 raiseケース)"""
        from apps.authentication.serializers import GoogleAuthSerializer

        # validate_access_tokenを直接呼び出して確実に行187をカバー
        serializer = GoogleAuthSerializer()

        # 空文字列でテスト
        with self.assertRaises(serializers.ValidationError) as context:
            serializer.validate_access_token('')

        self.assertIn('必須', str(context.exception))

        # 空白のみでテスト
        with self.assertRaises(serializers.ValidationError) as context:
            serializer.validate_access_token('   ')

        self.assertIn('必須', str(context.exception))

    def test_google_auth_serializer_valid_token_with_spaces(self):
        """Google認証で有効なトークンに前後の空白がある (行190 return value.strip())"""
        from apps.authentication.serializers import GoogleAuthSerializer

        # validate_access_tokenメソッドを直接呼び出してreturn文を実行
        serializer = GoogleAuthSerializer()

        # 空白付きの有効なトークン
        token_with_spaces = '  valid-google-token-12345  '
        validated_token = serializer.validate_access_token(token_with_spaces)

        # 空白が削除されているか確認 (行190のreturn value.strip()が実行される)
        self.assertEqual(validated_token, 'valid-google-token-12345')
        self.assertNotEqual(validated_token, token_with_spaces)

    def test_social_auth_serializer_uppercase_provider(self):
        """ソーシャル認証でプロバイダー名が大文字"""
        from apps.authentication.serializers import SocialAuthSerializer

        serializer = SocialAuthSerializer(data={
            'access_token': 'fake-token',
            'provider': 'TWITTER'  # 大文字
        })

        self.assertTrue(serializer.is_valid())
        # 小文字に変換されているか確認
        self.assertEqual(serializer.validated_data['provider'], 'twitter')


class AuthenticationViewFinalTestCase(APITestCase):
    """認証ビューの最終テスト"""

    def test_login_non_200_response(self):
        """ログイン時に例外が発生するケース（行91-96のexceptブロック）"""
        # 正常なユーザーを作成
        User.objects.create_user(
            email='testuser@example.com',
            password='CorrectPass123!'
        )

        url = reverse('authentication:token_obtain_pair')

        # 間違ったパスワードでログイン試行
        # 例外が発生して行91-96のexceptブロックが実行される
        data = {
            'email': 'testuser@example.com',
            'password': 'WrongPassword123!'
        }

        response = self.client.post(url, data)
        # 401が返される（例外ハンドラーで処理される）
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # エラーメッセージが返されることを確認
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'ログインに失敗しました。')

    @patch('apps.authentication.views.id_token.verify_oauth2_token')
    def test_google_auth_user_without_google_id(self, mock_verify):
        """Google IDが未設定の既存ユーザーでGoogle認証"""
        # Google IDなしの既存ユーザーを作成
        User.objects.create_user(
            email='nogoogleid@example.com',
            password='pass123'
        )

        mock_verify.return_value = {
            'email': 'nogoogleid@example.com',
            'sub': 'new-google-id-789',
            'given_name': 'Test',
        }

        url = reverse('authentication:google_auth')
        data = {'access_token': 'fake-token'}

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Google IDが更新されたか確認
        user = User.objects.get(email='nogoogleid@example.com')
        self.assertEqual(user.google_id, 'new-google-id-789')


class UserSerializerFinalTestCase(TestCase):
    """ユーザーシリアライザーの最終テスト"""

    def test_validate_bio_over_500_chars(self):
        """bioが500文字を超える場合 (行125 raise)"""
        from apps.users.serializers import UserUpdateSerializer

        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

        # validate_bioメソッドを直接呼び出してテスト
        serializer = UserUpdateSerializer(user)

        # 501文字のbio
        long_bio = 'a' * 501

        # ValidationErrorが発生することを確認
        with self.assertRaises(serializers.ValidationError) as context:
            serializer.validate_bio(long_bio)

        # エラーメッセージを確認
        self.assertIn('500文字以内', str(context.exception))

    def test_validate_bio_returns_value(self):
        """bioバリデーションが値を返す (行128 return)"""
        from apps.users.serializers import UserUpdateSerializer

        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

        serializer = UserUpdateSerializer(user, data={
            'bio': 'Valid bio under 500 chars'
        }, partial=True)

        self.assertTrue(serializer.is_valid())
        # バリデーションが通って値が返される (行128のreturn)
        self.assertEqual(
            serializer.validated_data['bio'],
            'Valid bio under 500 chars'
        )


class UserTaskFinalTestCase(TestCase):
    """Celeryタスクの最終テスト"""

    def test_cleanup_inactive_users_exception_handling(self):
        """クリーンアップタスク実行時の例外ハンドリング (行101-106)"""
        from apps.users.tasks import cleanup_inactive_users

        # tasksモジュール内でUserがインポートされるため、
        # モジュールレベルではなく関数実行時にエラーを発生させる
        with patch('apps.users.models.User.objects.filter') as mock_filter:
            # filterメソッドが例外を投げるようにモック
            mock_filter.side_effect = Exception('Database error')

            # 例外が発生してもエラーメッセージを返す
            result = cleanup_inactive_users(days=30)

            # エラーメッセージを含む結果を返す (行106のreturn)
            self.assertIn('Error:', result)


class UserViewFinalTestCase(APITestCase):
    """ユーザービューの最終テスト"""

    def test_profile_view_unauthenticated_user_is_authenticated_false(
        self
    ):
        """
        get_objectでis_authenticatedがFalse
        またはuserがNoneの場合 (行53-54)
        """
        from apps.users.views import UserProfileView
        from django.http import HttpRequest
        from django.contrib.auth.models import AnonymousUser

        # AnonymousUser (is_authenticated=False)を設定してget_objectを呼び出す
        view = UserProfileView()
        request = HttpRequest()
        request.user = AnonymousUser()
        view.request = request

        # get_objectでPermissionDeniedErrorが発生することを確認
        from apps.users.exceptions import PermissionDeniedError
        with self.assertRaises(PermissionDeniedError):
            view.get_object()

    @patch('apps.users.views.generics.RetrieveAPIView.retrieve')
    def test_user_detail_view_generic_error(self, mock_retrieve):
        """UserDetailViewで一般的なエラー (行195-199)"""
        # ユーザー作成とログイン
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=user)

        # retrieveメソッドが一般的な例外を投げるようにモック
        mock_retrieve.side_effect = RuntimeError('Unexpected error')

        url = reverse('users:detail', kwargs={'pk': user.id})
        response = self.client.get(url)

        # 500エラーが返される
        self.assertEqual(
            response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        self.assertIn('error', response.data)
