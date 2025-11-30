"""
バリデーターの完全テスト

すべてのバリデーター関数をテストします。
"""
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from .validators import (
    validate_email_format,
    validate_password_strength,
    validate_display_name,
    validate_bio,
    validate_file_size,
    validate_image_file,
)


class EmailValidatorTestCase(TestCase):
    """メールアドレスバリデーションのテスト"""

    def test_valid_email(self):
        """有効なメールアドレス"""
        validate_email_format('test@example.com')
        validate_email_format('user.name+tag@example.co.jp')

    def test_invalid_email_no_at(self):
        """@がないメールアドレス"""
        with self.assertRaises(ValidationError):
            validate_email_format('invalid-email')

    def test_invalid_email_no_domain(self):
        """ドメインがないメールアドレス"""
        with self.assertRaises(ValidationError):
            validate_email_format('test@')


class PasswordValidatorTestCase(TestCase):
    """パスワード強度バリデーションのテスト"""

    def test_strong_password(self):
        """強いパスワード"""
        validate_password_strength('StrongPass123')

    def test_weak_password_too_short(self):
        """短すぎるパスワード"""
        with self.assertRaises(ValidationError):
            validate_password_strength('Short1')

    def test_weak_password_no_uppercase(self):
        """大文字がないパスワード"""
        with self.assertRaises(ValidationError):
            validate_password_strength('lowercase123')

    def test_weak_password_no_lowercase(self):
        """小文字がないパスワード"""
        with self.assertRaises(ValidationError):
            validate_password_strength('UPPERCASE123')

    def test_weak_password_no_number(self):
        """数字がないパスワード"""
        with self.assertRaises(ValidationError):
            validate_password_strength('NoNumberPass')


class DisplayNameValidatorTestCase(TestCase):
    """表示名バリデーションのテスト"""

    def test_valid_display_name(self):
        """有効な表示名"""
        validate_display_name('John Doe')
        validate_display_name('田中太郎')

    def test_short_display_name(self):
        """短すぎる表示名"""
        with self.assertRaises(ValidationError):
            validate_display_name('A')

    def test_long_display_name(self):
        """長すぎる表示名"""
        with self.assertRaises(ValidationError):
            validate_display_name('A' * 51)

    def test_display_name_with_invalid_chars(self):
        """無効な文字を含む表示名"""
        with self.assertRaises(ValidationError):
            validate_display_name('Test<script>')
        with self.assertRaises(ValidationError):
            validate_display_name('Test{code}')


class BioValidatorTestCase(TestCase):
    """自己紹介バリデーションのテスト"""

    def test_valid_bio(self):
        """有効な自己紹介"""
        validate_bio('This is a valid bio')
        validate_bio('A' * 500)  # 500文字ちょうど

    def test_long_bio(self):
        """長すぎる自己紹介"""
        with self.assertRaises(ValidationError):
            validate_bio('A' * 501)


class FileSizeValidatorTestCase(TestCase):
    """ファイルサイズバリデーションのテスト"""

    def test_valid_file_size(self):
        """有効なファイルサイズ"""
        # 1MBのファイル（モック）
        file = SimpleUploadedFile("test.txt", b"x" * (1024 * 1024))
        validate_file_size(file, max_size_mb=5)

    def test_large_file_size(self):
        """大きすぎるファイルサイズ"""
        # 6MBのファイル（モック）
        file = SimpleUploadedFile("test.txt", b"x" * (6 * 1024 * 1024))
        with self.assertRaises(ValidationError):
            validate_file_size(file, max_size_mb=5)


class ImageFileValidatorTestCase(TestCase):
    """画像ファイルバリデーションのテスト"""

    def test_valid_image_extensions(self):
        """有効な画像拡張子"""
        for ext in ['jpg', 'jpeg', 'png', 'gif', 'webp']:
            file = SimpleUploadedFile(f"test.{ext}", b"x" * 1024)
            validate_image_file(file)

    def test_invalid_image_extension(self):
        """無効な画像拡張子"""
        file = SimpleUploadedFile("test.txt", b"x" * 1024)
        with self.assertRaises(ValidationError):
            validate_image_file(file)

    def test_large_image_file(self):
        """大きすぎる画像ファイル"""
        # 6MBの画像
        file = SimpleUploadedFile("test.jpg", b"x" * (6 * 1024 * 1024))
        with self.assertRaises(ValidationError):
            validate_image_file(file)
