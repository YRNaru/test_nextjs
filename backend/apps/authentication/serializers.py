"""
認証関連のシリアライザー

このモジュールは認証機能（ログイン、登録、ソーシャル認証）の
シリアライズ/デシリアライズを提供します。
"""
from typing import Any, Dict

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    カスタムトークン取得シリアライザー
    
    JWTトークンにカスタムクレームを追加します。
    """
    
    @classmethod
    def get_token(cls, user: User) -> Token:
        """
        ユーザーのJWTトークンを生成し、カスタムクレームを追加
        
        Args:
            user: トークンを生成するユーザー
            
        Returns:
            Token: 生成されたJWTトークン
        """
        token = super().get_token(user)
        
        # カスタムクレームを追加
        token['email'] = user.email
        token['display_name'] = user.get_display_name()
        
        return token


class RegisterSerializer(serializers.ModelSerializer):
    """
    ユーザー登録シリアライザー
    
    新規ユーザー登録のためのシリアライザー。
    パスワードの確認と強度チェックを行います。
    """
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        min_length=8,
        help_text="8文字以上のパスワードを入力してください。"
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        help_text="確認のため、もう一度パスワードを入力してください。"
    )
    display_name = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        trim_whitespace=True,
        help_text="表示名（オプション）"
    )
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password_confirm', 'display_name')
        extra_kwargs = {
            'email': {
                'required': True,
                'help_text': "有効なメールアドレスを入力してください。"
            },
        }
    
    def validate_email(self, value: str) -> str:
        """
        メールアドレスのバリデーション
        
        Args:
            value: 検証するメールアドレス
            
        Returns:
            str: 検証済みのメールアドレス（小文字）
            
        Raises:
            serializers.ValidationError: メールアドレスが既に使用されている場合
        """
        email = value.lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "このメールアドレスは既に使用されています。"
            )
        return email
    
    def validate_password(self, value: str) -> str:
        """
        パスワードのバリデーション
        
        Djangoのパスワードバリデーターを使用して
        パスワードの強度をチェックします。
        
        Args:
            value: 検証するパスワード
            
        Returns:
            str: 検証済みのパスワード
            
        Raises:
            serializers.ValidationError: パスワードが弱い場合
        """
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        クロスフィールドバリデーション
        
        パスワードと確認用パスワードの一致を検証します。
        
        Args:
            attrs: 検証する属性の辞書
            
        Returns:
            Dict[str, Any]: 検証済みの属性
            
        Raises:
            serializers.ValidationError: パスワードが一致しない場合
        """
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password": "パスワードが一致しません。"}
            )
        return attrs
    
    def create(self, validated_data: Dict[str, Any]) -> User:
        """
        ユーザーを作成
        
        Args:
            validated_data: 検証済みのデータ
            
        Returns:
            User: 作成されたユーザーインスタンス
        """
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class GoogleAuthSerializer(serializers.Serializer):
    """
    Google認証シリアライザー
    
    Google OAuthトークンの検証とユーザー認証を行います。
    """
    access_token = serializers.CharField(
        required=True,
        help_text="Googleから取得したアクセストークン"
    )
    
    def validate_access_token(self, value: str) -> str:
        """
        アクセストークンのバリデーション
        
        Args:
            value: 検証するアクセストークン
            
        Returns:
            str: 検証済みのアクセストークン
            
        Raises:
            serializers.ValidationError: トークンが空の場合
        """
        if not value or not value.strip():
            raise serializers.ValidationError(
                "アクセストークンは必須です。"
            )
        return value.strip()


class SocialAuthSerializer(serializers.Serializer):
    """
    ソーシャル認証シリアライザー
    
    Twitter、Discord等のソーシャルOAuthトークンの検証を行います。
    """
    access_token = serializers.CharField(
        required=True,
        help_text="ソーシャルプロバイダーから取得したアクセストークン"
    )
    provider = serializers.CharField(
        required=True,
        help_text="認証プロバイダー（twitter, discord等）"
    )
    
    def validate_provider(self, value: str) -> str:
        """
        プロバイダーのバリデーション
        
        Args:
            value: 検証するプロバイダー名
            
        Returns:
            str: 検証済みのプロバイダー名（小文字）
            
        Raises:
            serializers.ValidationError: サポートされていないプロバイダーの場合
        """
        allowed_providers = ['twitter', 'discord']
        provider = value.lower()
        
        if provider not in allowed_providers:
            raise serializers.ValidationError(
                f"サポートされていないプロバイダーです。使用可能: {', '.join(allowed_providers)}"
            )
        return provider
