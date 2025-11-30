"""
ソーシャル認証ビューのテスト

Google/Twitter/Discordのモック認証をテストします。
"""
from unittest.mock import patch, MagicMock
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class GoogleAuthViewTestCase(APITestCase):
    """Google認証ビューのテスト"""

    def setUp(self):
        self.url = reverse('authentication:google_auth')

    @patch('apps.authentication.views.id_token.verify_oauth2_token')
    def test_google_auth_new_user(self, mock_verify):
        """Google認証 - 新規ユーザー"""
        # モックのGoogle認証情報
        mock_verify.return_value = {
            'email': 'newuser@gmail.com',
            'sub': 'google-id-123',
            'given_name': 'John',
            'family_name': 'Doe',
        }

        data = {'access_token': 'fake-google-token'}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_new_user'])
        self.assertEqual(response.data['user']['email'], 'newuser@gmail.com')
        self.assertIn('tokens', response.data)

    @patch('apps.authentication.views.id_token.verify_oauth2_token')
    def test_google_auth_existing_user(self, mock_verify):
        """Google認証 - 既存ユーザー"""
        # 既存ユーザーを作成
        User.objects.create_user(
            email='existing@gmail.com',
            password='pass123',
            google_id='google-id-456'
        )

        mock_verify.return_value = {
            'email': 'existing@gmail.com',
            'sub': 'google-id-456',
            'given_name': 'Jane',
            'family_name': 'Smith',
        }

        data = {'access_token': 'fake-google-token'}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['is_new_user'])

    @patch('apps.authentication.views.id_token.verify_oauth2_token')
    def test_google_auth_invalid_token(self, mock_verify):
        """Google認証 - 無効なトークン"""
        mock_verify.side_effect = ValueError('Invalid token')

        data = {'access_token': 'invalid-token'}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_google_auth_missing_token(self):
        """Google認証 - トークン不足"""
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TwitterAuthViewTestCase(APITestCase):
    """Twitter認証ビューのテスト"""

    def setUp(self):
        self.url = reverse('authentication:twitter_auth')

    @patch('requests.get')
    def test_twitter_auth_success(self, mock_get):
        """Twitter認証成功"""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'data': {
                'id': 'twitter-123',
                'username': 'johndoe',
                'name': 'John Doe',
            }
        }
        mock_get.return_value = mock_response

        data = {
            'access_token': 'fake-twitter-token',
            'provider': 'twitter'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)

    @patch('requests.get')
    def test_twitter_auth_api_error(self, mock_get):
        """Twitter API エラー"""
        mock_response = MagicMock()
        mock_response.status_code = 401
        mock_get.return_value = mock_response

        data = {
            'access_token': 'invalid-token',
            'provider': 'twitter'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('requests.get')
    def test_twitter_auth_timeout(self, mock_get):
        """Twitter API タイムアウト"""
        import requests
        mock_get.side_effect = requests.Timeout()

        data = {
            'access_token': 'fake-token',
            'provider': 'twitter'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('requests.get')
    def test_twitter_auth_no_user_id(self, mock_get):
        """Twitter ユーザーID取得失敗"""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'data': {}}
        mock_get.return_value = mock_response

        data = {
            'access_token': 'fake-token',
            'provider': 'twitter'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DiscordAuthViewTestCase(APITestCase):
    """Discord認証ビューのテスト"""

    def setUp(self):
        self.url = reverse('authentication:discord_auth')

    @patch('requests.get')
    def test_discord_auth_success(self, mock_get):
        """Discord認証成功"""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'id': 'discord-123',
            'email': 'user@discord.com',
            'username': 'discorduser',
        }
        mock_get.return_value = mock_response

        data = {
            'access_token': 'fake-discord-token',
            'provider': 'discord'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)

    @patch('requests.get')
    def test_discord_auth_no_email(self, mock_get):
        """Discord メールアドレス取得失敗"""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'id': 'discord-123',
            'username': 'user',
        }
        mock_get.return_value = mock_response

        data = {
            'access_token': 'fake-token',
            'provider': 'discord'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('requests.get')
    def test_discord_auth_api_error(self, mock_get):
        """Discord API エラー"""
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_get.return_value = mock_response

        data = {
            'access_token': 'fake-token',
            'provider': 'discord'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('requests.get')
    def test_discord_auth_timeout(self, mock_get):
        """Discord API タイムアウト"""
        import requests
        mock_get.side_effect = requests.Timeout()

        data = {
            'access_token': 'fake-token',
            'provider': 'discord'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
