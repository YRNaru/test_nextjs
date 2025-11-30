"""
バリデーションユーティリティ

このモジュールはカスタムバリデーション関数を提供します。
"""
import re
from typing import Any, List, Optional

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_email_format(email: str) -> None:
    """
    メールアドレスの形式を検証

    Args:
        email: 検証するメールアドレス

    Raises:
        ValidationError: メールアドレスの形式が無効な場合
    """
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        raise ValidationError(
            _('有効なメールアドレスを入力してください。'),
            code='invalid_email'
        )


def validate_password_strength(password: str) -> None:
    """
    パスワードの強度を検証

    以下の条件をチェックします:
    - 最低8文字以上
    - 少なくとも1つの大文字
    - 少なくとも1つの小文字
    - 少なくとも1つの数字

    Args:
        password: 検証するパスワード

    Raises:
        ValidationError: パスワードが弱い場合
    """
    errors: List[str] = []

    if len(password) < 8:
        errors.append('パスワードは8文字以上である必要があります。')

    if not re.search(r'[A-Z]', password):
        errors.append('パスワードには少なくとも1つの大文字が必要です。')

    if not re.search(r'[a-z]', password):
        errors.append('パスワードには少なくとも1つの小文字が必要です。')

    if not re.search(r'[0-9]', password):
        errors.append('パスワードには少なくとも1つの数字が必要です。')

    if errors:
        raise ValidationError(errors, code='weak_password')


def validate_display_name(name: str) -> None:
    """
    表示名を検証

    Args:
        name: 検証する表示名

    Raises:
        ValidationError: 表示名が無効な場合
    """
    if not name or len(name.strip()) < 2:
        raise ValidationError(
            _('表示名は2文字以上である必要があります。'),
            code='invalid_display_name'
        )

    if len(name) > 50:
        raise ValidationError(
            _('表示名は50文字以内である必要があります。'),
            code='display_name_too_long'
        )

    # 特殊文字のチェック
    if re.search(r'[<>{}[\]\\|`]', name):
        raise ValidationError(
            _('表示名に使用できない文字が含まれています。'),
            code='invalid_characters'
        )


def validate_bio(bio: str) -> None:
    """
    自己紹介を検証

    Args:
        bio: 検証する自己紹介

    Raises:
        ValidationError: 自己紹介が無効な場合
    """
    if len(bio) > 500:
        raise ValidationError(
            _('自己紹介は500文字以内である必要があります。'),
            code='bio_too_long'
        )


def validate_file_size(file: Any, max_size_mb: int = 5) -> None:
    """
    ファイルサイズを検証

    Args:
        file: 検証するファイル
        max_size_mb: 最大ファイルサイズ（MB）

    Raises:
        ValidationError: ファイルサイズが大きすぎる場合
    """
    max_size_bytes = max_size_mb * 1024 * 1024

    if file.size > max_size_bytes:
        raise ValidationError(
            _(f'ファイルサイズは{max_size_mb}MB以下である必要があります。'),
            code='file_too_large'
        )


def validate_image_file(file: Any) -> None:
    """
    画像ファイルを検証

    Args:
        file: 検証する画像ファイル

    Raises:
        ValidationError: 画像ファイルが無効な場合
    """
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    file_extension = file.name.lower().split('.')[-1]

    if f'.{file_extension}' not in valid_extensions:
        raise ValidationError(
            _(f'サポートされている画像形式: {", ".join(valid_extensions)}'),
            code='invalid_image_format'
        )

    # ファイルサイズを検証（5MB以下）
    validate_file_size(file, max_size_mb=5)

