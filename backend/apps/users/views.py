"""
ユーザー関連のビュー

このモジュールはユーザー情報の取得・更新のためのAPIビューを提供します。
"""
import logging
from typing import Any

from django.db.models import QuerySet
from rest_framework import generics, permissions, status
from rest_framework.request import Request
from rest_framework.response import Response

from .exceptions import UserNotFoundError, PermissionDeniedError
from .models import User
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    UserUpdateSerializer,
)

# ロガーの設定
logger = logging.getLogger(__name__)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    ユーザープロフィール取得・更新ビュー
    
    認証済みユーザーが自身のプロフィール情報を
    取得・更新するためのエンドポイントです。
    
    Endpoints:
        GET  /api/users/profile/ - プロフィール取得
        PUT  /api/users/profile/ - プロフィール全体更新
        PATCH /api/users/profile/ - プロフィール部分更新
    """
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self) -> User:
        """
        現在ログイン中のユーザーを取得
        
        Returns:
            User: 現在のユーザーインスタンス
            
        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        user = self.request.user
        if not user or not user.is_authenticated:
            logger.error("Unauthenticated user attempted to access profile")
            raise PermissionDeniedError("認証が必要です。")
        
        logger.info(f"User {user.id} accessed their profile")
        return user
    
    def get_serializer_class(self):
        """
        リクエストメソッドに応じてシリアライザークラスを返す
        
        Returns:
            Serializer: 適切なシリアライザークラス
        """
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserProfileSerializer
    
    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        プロフィール更新処理
        
        Args:
            request: HTTPリクエスト
            *args: 可変長引数
            **kwargs: 可変長キーワード引数
            
        Returns:
            Response: 更新後のユーザー情報
        """
        try:
            response = super().update(request, *args, **kwargs)
            logger.info(f"User {request.user.id} updated their profile successfully")
            return response
        except Exception as e:
            logger.error(
                f"Error updating profile for user {request.user.id}: {str(e)}",
                exc_info=True
            )
            raise


class UserListView(generics.ListAPIView):
    """
    ユーザー一覧ビュー（管理者のみ）
    
    管理者がすべてのユーザーの一覧を取得するための
    エンドポイントです。
    
    Endpoints:
        GET /api/users/list/ - ユーザー一覧取得（管理者のみ）
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_queryset(self) -> QuerySet[User]:
        """
        ユーザーのクエリセットを取得
        
        パフォーマンス最適化のため、必要最小限のフィールドのみを選択します。
        
        Returns:
            QuerySet[User]: ユーザーのクエリセット
        """
        logger.info(f"Admin user {self.request.user.id} accessed user list")
        
        # パフォーマンス最適化: 必要なフィールドのみ選択
        return User.objects.all().order_by('-created_at')
    
    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        ユーザー一覧の取得処理
        
        Args:
            request: HTTPリクエスト
            *args: 可変長引数
            **kwargs: 可変長キーワード引数
            
        Returns:
            Response: ユーザー一覧
        """
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            logger.error(
                f"Error fetching user list: {str(e)}",
                exc_info=True
            )
            return Response(
                {"error": "ユーザー一覧の取得に失敗しました。"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserDetailView(generics.RetrieveAPIView):
    """
    ユーザー詳細ビュー
    
    特定のユーザーの詳細情報を取得するための
    エンドポイントです。
    
    Endpoints:
        GET /api/users/<user_id>/ - ユーザー詳細取得
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self) -> QuerySet[User]:
        """
        ユーザーのクエリセットを取得
        
        Returns:
            QuerySet[User]: ユーザーのクエリセット
        """
        # パフォーマンス最適化: アクティブなユーザーのみ
        return User.objects.filter(is_active=True)
    
    def retrieve(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        ユーザー詳細の取得処理
        
        Args:
            request: HTTPリクエスト
            *args: 可変長引数
            **kwargs: 可変長キーワード引数
            
        Returns:
            Response: ユーザー詳細情報
            
        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        try:
            user_id = kwargs.get('pk')
            logger.info(f"User {request.user.id} accessed details of user {user_id}")
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            # Http404は正常な動作なのでそのままraise
            from django.http import Http404
            if isinstance(e, Http404):
                logger.warning(f"User {user_id} not found")
                raise UserNotFoundError()
            
            logger.error(
                f"Error fetching user details: {str(e)}",
                exc_info=True
            )
            return Response(
                {"error": "ユーザー情報の取得に失敗しました。"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

