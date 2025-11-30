"""
カスタムユーザーモデル

このモジュールはカスタムユーザーモデルとユーザーマネージャーを提供します。
メール認証をベースとした認証システムを実装しています。
"""
from __future__ import annotations

from typing import Any, Optional

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """
    カスタムユーザーマネージャー
    メールアドレスを使用した認証システムのためのカスタムマネージャー。
    usernameフィールドの代わりにemailを使用します。
    """
    def create_user(
        self,
        email: str,
        password: Optional[str] = None,
        **extra_fields: Any
    ) -> 'User':
        """
        通常ユーザーの作成

        Args:
            email: ユーザーのメールアドレス
            password: ユーザーのパスワード（オプション）
            **extra_fields: その他のユーザーフィールド

        Returns:
            User: 作成されたユーザーインスタンス

        Raises:
            ValueError: メールアドレスが提供されない場合
        """
        if not email:
            raise ValueError(_('メールアドレスは必須です'))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email: str,
        password: Optional[str] = None,
        **extra_fields: Any
    ) -> 'User':
        """
        スーパーユーザーの作成

        Args:
            email: ユーザーのメールアドレス
            password: ユーザーのパスワード（オプション）
            **extra_fields: その他のユーザーフィールド

        Returns:
            User: 作成されたスーパーユーザーインスタンス

        Raises:
            ValueError: スタッフ権限またはスーパーユーザー権限が正しく設定されていない場合
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('スーパーユーザーはis_staff=Trueである必要があります'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('スーパーユーザーはis_superuser=Trueである必要があります'))

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    カスタムユーザーモデル

    メールアドレスベースの認証を使用するカスタムユーザーモデル。
    ソーシャル認証（Google, Twitter, Discord）もサポートしています。

    Attributes:
        email: ユーザーのメールアドレス（ユニーク、必須）
        display_name: ユーザーの表示名（オプション）
        avatar: ユーザーのアバター画像（オプション）
        bio: ユーザーの自己紹介（オプション）
        google_id: Google OAuth認証用のID（オプション）
        created_at: アカウント作成日時
        updated_at: アカウント最終更新日時
    """

    username = None  # usernameフィールドを削除
    email = models.EmailField(_('メールアドレス'), unique=True)

    # プロフィール情報
    display_name = models.CharField(
        _('表示名'), max_length=50, blank=True
    )
    avatar = models.ImageField(
        _('アバター'), upload_to='avatars/', null=True, blank=True
    )
    bio = models.TextField(_('自己紹介'), max_length=500, blank=True)

    # Google OAuth関連
    google_id = models.CharField(
        _('Google ID'),
        max_length=255,
        blank=True,
        null=True,
        db_index=True  # パフォーマンス最適化のためインデックスを追加
    )

    # タイムスタンプ
    created_at = models.DateTimeField(
        _('作成日時'), auto_now_add=True, db_index=True
    )
    updated_at = models.DateTimeField(_('更新日時'), auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = _('ユーザー')
        verbose_name_plural = _('ユーザー')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['email']),
        ]

    def __str__(self) -> str:
        """
        ユーザーの文字列表現を返す

        Returns:
            str: ユーザーのメールアドレス
        """
        return self.email

    def get_display_name(self) -> str:
        """
        ユーザーの表示名を取得

        display_nameが設定されている場合はそれを返し、
        設定されていない場合はメールアドレスの@以前の部分を返します。

        Returns:
            str: ユーザーの表示名
        """
        if self.display_name:
            return self.display_name
        return self.email.split('@')[0]
