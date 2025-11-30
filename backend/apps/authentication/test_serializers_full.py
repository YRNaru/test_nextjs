"""
シリアライザーの完全なバリデーションテスト

すべてのバリデーションパターンをテストします。
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from apps.authentication.serializers import RegisterSerializer
from apps.users.serializers import UserUpdateSerializer

User = get_user_model()


class RegisterSerializerFullTestCase(TestCase):
    """ユーザー登録シリアライザーの完全テスト"""
    
    def test_validate_email_lowercase(self):
        """メールアドレスの小文字変換"""
        serializer = RegisterSerializer(data={
            'email': 'TEST@EXAMPLE.COM',
            'password': 'StrongPass123',
            'password_confirm': 'StrongPass123',
        })
        self.assertTrue(serializer.is_valid())
        # メールアドレスが小文字に変換されているか確認
        validated_email = serializer.validated_data['email']
        self.assertEqual(validated_email, 'test@example.com')
    
    def test_validate_password_django_validators(self):
        """Djangoのパスワードバリデーター"""
        # 一般的すぎるパスワード
        serializer = RegisterSerializer(data={
            'email': 'test@example.com',
            'password': 'password',
            'password_confirm': 'password',
        })
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)


class UserUpdateSerializerFullTestCase(TestCase):
    """ユーザー更新シリアライザーの完全テスト"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
    
    def test_validate_display_name_whitespace(self):
        """表示名の前後の空白を削除"""
        serializer = UserUpdateSerializer(self.user, data={
            'display_name': '  Test User  ',
        }, partial=True)
        self.assertTrue(serializer.is_valid())
    
    def test_validate_display_name_too_short_after_strip(self):
        """空白削除後に短すぎる表示名"""
        serializer = UserUpdateSerializer(self.user, data={
            'display_name': ' A ',
        }, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn('display_name', serializer.errors)
    
    def test_validate_bio_exactly_500_chars(self):
        """ちょうど500文字の自己紹介"""
        serializer = UserUpdateSerializer(self.user, data={
            'bio': 'A' * 500,
        }, partial=True)
        self.assertTrue(serializer.is_valid())
    
    def test_validate_bio_over_500_chars(self):
        """500文字を超える自己紹介"""
        serializer = UserUpdateSerializer(self.user, data={
            'bio': 'A' * 501,
        }, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn('bio', serializer.errors)
    
    def test_update_with_empty_fields(self):
        """空フィールドでの更新"""
        serializer = UserUpdateSerializer(self.user, data={
            'display_name': '',
            'bio': '',
        }, partial=True)
        # 空文字は許可される
        self.assertTrue(serializer.is_valid())

