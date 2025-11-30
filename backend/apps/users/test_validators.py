from django.test import TestCase
from django.core.exceptions import ValidationError
from .validators import validate_email_format, validate_password_strength


class ValidatorTestCase(TestCase):
    def test_valid_email(self):
        validate_email_format('test@example.com')  # エラーなし

    def test_invalid_email(self):
        with self.assertRaises(ValidationError):
            validate_email_format('invalid-email')

    def test_strong_password(self):
        validate_password_strength('StrongPass123')  # エラーなし

    def test_weak_password(self):
        with self.assertRaises(ValidationError):
            validate_password_strength('weak')


class DisplayNameValidatorTestCase(TestCase):
    def test_valid_display_name(self):
        from .validators import validate_display_name
        validate_display_name('John Doe')  # OK

    def test_short_display_name(self):
        from .validators import validate_display_name
        with self.assertRaises(ValidationError):
            validate_display_name('A')  # 2文字未満

    def test_long_display_name(self):
        from .validators import validate_display_name
        with self.assertRaises(ValidationError):
            validate_display_name('A' * 51)  # 50文字超過

    def test_display_name_with_invalid_chars(self):
        from .validators import validate_display_name
        with self.assertRaises(ValidationError):
            validate_display_name('Test<script>')  # 特殊文字


class BioValidatorTestCase(TestCase):
    def test_valid_bio(self):
        from .validators import validate_bio
        validate_bio('This is a valid bio')  # OK

    def test_long_bio(self):
        from .validators import validate_bio
        with self.assertRaises(ValidationError):
            validate_bio('A' * 501)  # 500文字超過
