"""
ユーザー関連のシリアライザー
"""
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """ユーザーシリアライザー"""
    
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'display_name',
            'avatar',
            'bio',
            'is_active',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'email', 'created_at', 'updated_at')


class UserProfileSerializer(serializers.ModelSerializer):
    """ユーザープロフィールシリアライザー（詳細情報）"""
    
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'display_name',
            'avatar',
            'bio',
            'is_active',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'email', 'created_at', 'updated_at')


class UserUpdateSerializer(serializers.ModelSerializer):
    """ユーザー更新シリアライザー"""
    
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'display_name',
            'avatar',
            'bio',
        )

