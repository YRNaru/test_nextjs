"""
ユーザーモデルのテスト

このモジュールはUserモデルとUserManagerのテストを提供します。
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class UserManagerTestCase(TestCase):
    """
    UserManagerのテストケース
    """
    
    def test_create_user(self):
        """
        通常ユーザーの作成をテスト
        """
        email = 'test@example.com'
        password = 'testpass123'
        user = User.objects.create_user(email=email, password=password)
        
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
    
    def test_create_user_without_email(self):
        """
        メールアドレスなしでユーザー作成を試みた場合のテスト
        """
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='testpass123')
    
    def test_create_superuser(self):
        """
        スーパーユーザーの作成をテスト
        """
        email = 'admin@example.com'
        password = 'adminpass123'
        user = User.objects.create_superuser(email=email, password=password)
        
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
    
    def test_email_normalization(self):
        """
        メールアドレスの正規化をテスト
        """
        email = 'test@EXAMPLE.COM'
        user = User.objects.create_user(email=email, password='testpass123')
        
        self.assertEqual(user.email, 'test@example.com')


class UserModelTestCase(TestCase):
    """
    Userモデルのテストケース
    """
    
    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            display_name='Test User'
        )
    
    def test_user_str_representation(self):
        """
        ユーザーの文字列表現をテスト
        """
        self.assertEqual(str(self.user), 'test@example.com')
    
    def test_get_display_name_with_display_name(self):
        """
        display_nameが設定されている場合のget_display_nameをテスト
        """
        self.assertEqual(self.user.get_display_name(), 'Test User')
    
    def test_get_display_name_without_display_name(self):
        """
        display_nameが設定されていない場合のget_display_nameをテスト
        """
        user = User.objects.create_user(
            email='noname@example.com',
            password='testpass123'
        )
        self.assertEqual(user.get_display_name(), 'noname')
    
    def test_user_creation_timestamp(self):
        """
        ユーザー作成時のタイムスタンプをテスト
        """
        self.assertIsNotNone(self.user.created_at)
        self.assertIsNotNone(self.user.updated_at)
    
    def test_unique_email(self):
        """
        メールアドレスの一意性をテスト
        """
        from django.db.utils import IntegrityError
        
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email='test@example.com',  # 重複
                password='testpass123'
            )


class UserDetailViewTestCase(APITestCase):
    """
    ユーザー詳細ビューのテスト
    """
    def setUp(self):
        """
        テストデータのセットアップ
        """
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_get_user_detail(self):
        """
        ユーザー詳細取得のテスト
        """
        url = reverse('users:detail', kwargs={'pk': self.user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_nonexistent_user(self):
        """
        存在しないユーザーの詳細取得のテスト
        """
        url = reverse('users:detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
