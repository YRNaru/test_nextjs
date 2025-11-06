"""
認証関連のシリアライザー
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """カスタムトークン取得シリアライザー"""
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # カスタムクレームを追加
        token['email'] = user.email
        token['display_name'] = user.get_display_name()
        
        return token


class RegisterSerializer(serializers.ModelSerializer):
    """ユーザー登録シリアライザー"""
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password_confirm', 'display_name')
    
    def validate(self, attrs):
        """パスワードの一致を検証"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password": "パスワードが一致しません。"}
            )
        return attrs
    
    def create(self, validated_data):
        """ユーザーを作成"""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class GoogleAuthSerializer(serializers.Serializer):
    """Google認証シリアライザー"""
    access_token = serializers.CharField(required=True)


class SocialAuthSerializer(serializers.Serializer):
    """ソーシャル認証シリアライザー（Twitter、Discord用）"""
    access_token = serializers.CharField(required=True)
    provider = serializers.CharField(required=True)
