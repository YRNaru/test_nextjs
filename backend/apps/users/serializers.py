"""
ユーザー関連のシリアライザー

このモジュールはユーザー情報のシリアライズ・デシリアライズを提供します。
"""
from typing import Any, Dict, OrderedDict

from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    ユーザーシリアライザー
    
    基本的なユーザー情報のシリアライズ/デシリアライズを行います。
    一覧表示や詳細表示で使用します。
    """
    
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
    """
    ユーザープロフィールシリアライザー
    
    ユーザープロフィール情報（詳細情報）のシリアライズ/デシリアライズを行います。
    認証済みユーザーの自身の情報を取得する際に使用します。
    """
    
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
    """
    ユーザー更新シリアライザー
    
    ユーザー情報の更新を行います。
    メールアドレスやIDなどの重要なフィールドは更新できません。
    """
    
    display_name = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        trim_whitespace=True,
    )
    bio = serializers.CharField(
        max_length=500,
        required=False,
        allow_blank=True,
        trim_whitespace=True,
    )
    
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'display_name',
            'avatar',
            'bio',
        )
    
    def validate_display_name(self, value: str) -> str:
        """
        表示名のバリデーション
        
        Args:
            value: 検証する表示名
            
        Returns:
            str: 検証済みの表示名
            
        Raises:
            serializers.ValidationError: バリデーションエラー
        """
        if value and len(value.strip()) < 2:
            raise serializers.ValidationError(
                "表示名は2文字以上である必要があります。"
            )
        return value
    
    def validate_bio(self, value: str) -> str:
        """
        自己紹介のバリデーション
        
        Args:
            value: 検証する自己紹介
            
        Returns:
            str: 検証済みの自己紹介
            
        Raises:
            serializers.ValidationError: バリデーションエラー
        """
        if value and len(value) > 500:
            raise serializers.ValidationError(
                "自己紹介は500文字以内である必要があります。"
            )
        return value

