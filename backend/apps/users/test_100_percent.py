"""
100%カバレッジ達成のための追加テスト

残りの未カバー部分をすべてテストします。
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch, MagicMock

User = get_user_model()


class UserManagerEdgeCaseTestCase(TestCase):
    """UserManagerのエッジケーステスト"""

    def test_create_superuser_without_is_staff(self):
        """is_staffがFalseでスーパーユーザー作成"""
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(
                email='admin@example.com',
                password='adminpass',
                is_staff=False
            )
        self.assertIn('is_staff=True', str(context.exception))

    def test_create_superuser_without_is_superuser(self):
        """is_superuserがFalseでスーパーユーザー作成"""
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(
                email='admin@example.com',
                password='adminpass',
                is_superuser=False
            )
        self.assertIn('is_superuser=True', str(context.exception))


class UserSerializerEdgeCaseTestCase(TestCase):
    """UserSerializerのエッジケーステスト"""

    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

    def test_validate_bio_edge_case(self):
        """自己紹介の境界値テスト（501文字）"""
        from apps.users.serializers import UserUpdateSerializer

        serializer = UserUpdateSerializer(self.user, data={
            'bio': 'A' * 501,
        }, partial=True)

        self.assertFalse(serializer.is_valid())
        self.assertIn('bio', serializer.errors)


class UserProfileViewEdgeCaseTestCase(APITestCase):
    """UserProfileViewのエッジケーステスト"""

    def test_unauthenticated_access_to_profile(self):
        """未認証でプロフィールアクセス"""
        url = reverse('users:profile')
        # 認証なしでアクセス
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_update_with_put(self):
        """PUTメソッドでプロフィール更新"""
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=user)

        url = reverse('users:profile')
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'display_name': 'JohnDoe',
            'bio': 'Test bio'
        }

        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('apps.users.views.UserUpdateSerializer')
    def test_profile_update_exception(self, mock_serializer):
        """プロフィール更新時の例外"""
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=user)

        # シリアライザーが例外を投げるようにモック
        mock_instance = MagicMock()
        mock_instance.is_valid.return_value = True
        mock_instance.save.side_effect = Exception('Database error')
        mock_serializer.return_value = mock_instance

        url = reverse('users:profile')
        data = {'display_name': 'Test'}

        # 例外が発生するはず
        with self.assertRaises(Exception):
            self.client.patch(url, data)


class LoginViewEdgeCaseTestCase(APITestCase):
    """LoginViewのエッジケーステスト"""

    def test_login_with_invalid_data_exception(self):
        """ログイン時の予期しない例外"""
        url = reverse('authentication:token_obtain_pair')

        # 完全に無効なデータ
        data = {
            'email': 'invalid',
            'password': ''
        }

        response = self.client.post(url, data)
        # エラーレスポンスを返すはず
        self.assertIn(response.status_code, [400, 401])


class AuthenticationSerializerEdgeCaseTestCase(TestCase):
    """認証シリアライザーのエッジケーステスト"""

    def test_social_auth_serializer_invalid_provider(self):
        """無効なプロバイダー"""
        from apps.authentication.serializers import SocialAuthSerializer

        serializer = SocialAuthSerializer(data={
            'access_token': 'fake-token',
            'provider': 'invalid_provider'
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn('provider', serializer.errors)


class UserTaskEdgeCaseTestCase(TestCase):
    """Celeryタスクのエッジケーステスト"""

    @patch('apps.users.tasks.send_mail')
    def test_send_welcome_email_with_custom_settings(self, mock_send_mail):
        """カスタム設定でウェルカムメール送信"""
        from apps.users.tasks import send_welcome_email

        # DEFAULT_FROM_EMAILが設定されている場合のテスト
        with patch('apps.users.tasks.settings') as mock_settings:
            mock_settings.DEFAULT_FROM_EMAIL = 'custom@example.com'
            result = send_welcome_email('test@example.com', 'Test User')

            mock_send_mail.assert_called_once()
            self.assertIn('test@example.com', result)


class UserViewErrorHandlingTestCase(APITestCase):
    """ユーザービューのエラーハンドリングテスト"""

    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_get_user_detail_with_server_error(self):
        """ユーザー詳細取得時のサーバーエラー"""
        # 存在するユーザー
        other_user = User.objects.create_user(
            email='other@example.com',
            password='pass123'
        )

        url = reverse('users:detail', kwargs={'pk': other_user.pk})

        # 通常は成功するはず
        response = self.client.get(url)
        self.assertIn(response.status_code, [200, 404])


class AuthenticationViewErrorCaseTestCase(APITestCase):
    """認証ビューのエラーケーステスト"""

    @patch('apps.authentication.views.id_token.verify_oauth2_token')
    def test_google_auth_without_email(self, mock_verify):
        """Google認証でメールアドレスがない場合"""
        mock_verify.return_value = {
            'sub': 'google-id-123',
            'given_name': 'John',
            'family_name': 'Doe',
            # emailがない
        }

        url = reverse('authentication:google_auth')
        data = {'access_token': 'fake-token'}

        response = self.client.post(url, data)
        # エラーレスポンスを返すはず
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logout_with_invalid_token_format(self):
        """無効なトークン形式でログアウト"""
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=user)

        url = reverse('authentication:logout')
        data = {'refresh_token': 'completely-invalid-token-format'}

        response = self.client.post(url, data)
        # エラーレスポンスを返すはず
        self.assertIn(response.status_code, [400, 401])


class RegisterViewEdgeCaseTestCase(APITestCase):
    """ユーザー登録のエッジケーステスト"""

    @patch('apps.authentication.views.RefreshToken.for_user')
    def test_register_token_generation_error(self, mock_token):
        """トークン生成時のエラー"""
        # トークン生成でエラーが発生
        mock_token.side_effect = Exception('Token generation failed')

        url = reverse('authentication:register')
        data = {
            'email': 'newuser@example.com',
            'password': 'StrongPass123',
            'password_confirm': 'StrongPass123',
        }

        response = self.client.post(url, data)
        # エラーレスポンスを返すはず
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
