"""
認証機能のテスト

このモジュールは認証関連のAPIエンドポイントのテストを提供します。
"""
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class RegisterViewTestCase(APITestCase):
    """
    ユーザー登録APIのテストケース
    """

    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.url = reverse('authentication:register')
        self.valid_data = {
            'email': 'newuser@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123',
            'display_name': 'New User'
        }

    def test_register_success(self):
        """
        正常なユーザー登録をテスト
        """
        response = self.client.post(self.url, self.valid_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertEqual(
            response.data['user']['email'],
            self.valid_data['email']
        )

        # ユーザーがDBに作成されたか確認
        self.assertTrue(
            User.objects.filter(email=self.valid_data['email']).exists()
        )

    def test_register_password_mismatch(self):
        """
        パスワード不一致の場合のテスト
        """
        data = self.valid_data.copy()
        data['password_confirm'] = 'differentpass'

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_duplicate_email(self):
        """
        重複メールアドレスの場合のテスト
        """
        # 最初のユーザーを作成
        User.objects.create_user(
            email=self.valid_data['email'],
            password='testpass123'
        )

        # 同じメールアドレスで登録を試みる
        response = self.client.post(self.url, self.valid_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_short_password(self):
        """
        短いパスワードの場合のテスト
        """
        data = self.valid_data.copy()
        data['password'] = 'short'
        data['password_confirm'] = 'short'

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginViewTestCase(APITestCase):
    """
    ログインAPIのテストケース
    """

    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.url = reverse('authentication:token_obtain_pair')
        self.email = 'testuser@example.com'
        self.password = 'testpass123'
        self.user = User.objects.create_user(
            email=self.email,
            password=self.password
        )

    def test_login_success(self):
        """
        正常なログインをテスト
        """
        data = {
            'email': self.email,
            'password': self.password
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])

    def test_login_invalid_credentials(self):
        """
        無効な認証情報の場合のテスト
        """
        data = {
            'email': self.email,
            'password': 'wrongpassword'
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LogoutViewTestCase(APITestCase):
    """
    ログアウトAPIのテストケース
    """

    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.url = reverse('authentication:logout')
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpass123'
        )
        self.refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.refresh.access_token}'
        )

    def test_logout_success(self):
        """
        正常なログアウトをテスト
        """
        data = {
            'refresh_token': str(self.refresh)
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

    def test_logout_without_token(self):
        """
        トークンなしでログアウトを試みた場合のテスト
        """
        response = self.client.post(self.url, {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class VerifyTokenViewTestCase(APITestCase):
    """
    トークン検証APIのテストケース
    """

    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.url = reverse('authentication:verify')
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpass123'
        )
        self.refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.refresh.access_token}'
        )

    def test_verify_valid_token(self):
        """
        有効なトークンの検証をテスト
        """
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['valid'])
        self.assertIn('user', response.data)

    def test_verify_without_token(self):
        """
        トークンなしで検証を試みた場合のテスト
        """
        self.client.credentials()  # トークンをクリア
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
