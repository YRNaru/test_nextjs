"""
カスタムユーザーモデル
"""
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """カスタムユーザーマネージャー"""
    
    def create_user(self, email, password=None, **extra_fields):
        """通常ユーザーの作成"""
        if not email:
            raise ValueError(_('メールアドレスは必須です'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """スーパーユーザーの作成"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('スーパーユーザーはis_staff=Trueである必要があります'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('スーパーユーザーはis_superuser=Trueである必要があります'))
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """カスタムユーザーモデル"""
    
    username = None  # usernameフィールドを削除
    email = models.EmailField(_('メールアドレス'), unique=True)
    
    # プロフィール情報
    display_name = models.CharField(_('表示名'), max_length=50, blank=True)
    avatar = models.ImageField(_('アバター'), upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(_('自己紹介'), max_length=500, blank=True)
    
    # Google OAuth関連
    google_id = models.CharField(_('Google ID'), max_length=255, blank=True, null=True)
    
    # タイムスタンプ
    created_at = models.DateTimeField(_('作成日時'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新日時'), auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    class Meta:
        verbose_name = _('ユーザー')
        verbose_name_plural = _('ユーザー')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email
    
    def get_display_name(self):
        """表示名を取得（設定されていない場合はメールアドレスの@以前を返す）"""
        if self.display_name:
            return self.display_name
        return self.email.split('@')[0]

