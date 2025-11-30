"""
認証関連のビュー

このモジュールは認証機能（ログイン、登録、ソーシャル認証）の
APIビューを提供します。
"""
import logging
from typing import Any

from django.conf import settings
from django.contrib.auth import get_user_model
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .exceptions import (
    InvalidTokenError,
    GoogleAuthError,
    TwitterAuthError,
    DiscordAuthError,
)
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    GoogleAuthSerializer,
    SocialAuthSerializer,
)

# ロガーの設定
logger = logging.getLogger(__name__)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    カスタムトークン取得ビュー

    メールアドレスとパスワードでログインし、
    JWTトークンとユーザー情報を返します。

    Endpoints:
        POST /api/auth/login/ - ログイン
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        ログインレスポンスをカスタマイズ

        Args:
            request: HTTPリクエスト
            *args: 可変長引数
            **kwargs: 可変長キーワード引数

        Returns:
            Response: ユーザー情報とトークンを含むレスポンス
        """
        try:
            response = super().post(request, *args, **kwargs)

            if response.status_code == 200:
                # ユーザー情報を追加
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                user = serializer.user

                logger.info(f"User {user.id} logged in successfully")

                # レスポンスを再構築
                tokens = response.data
                return Response({
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'display_name': user.get_display_name(),
                    },
                    'tokens': {
                        'access': tokens.get('access'),
                        'refresh': tokens.get('refresh'),
                    }
                }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Login failed: {str(e)}", exc_info=True)
            return Response(
                {"error": "ログインに失敗しました。"},
                status=status.HTTP_401_UNAUTHORIZED
            )


class RegisterView(generics.CreateAPIView):
    """
    ユーザー登録ビュー

    新規ユーザーを作成し、JWTトークンを発行します。

    Endpoints:
        POST /api/auth/register/ - ユーザー登録
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        ユーザー作成処理

        Args:
            request: HTTPリクエスト
            *args: 可変長引数
            **kwargs: 可変長キーワード引数

        Returns:
            Response: 作成されたユーザー情報とトークン
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # トークンを生成
            refresh = RefreshToken.for_user(user)

            logger.info(f"New user {user.id} registered successfully")

            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'display_name': user.get_display_name(),
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"User registration failed: {str(e)}", exc_info=True)
            return Response(
                {"error": "ユーザー登録に失敗しました。"},
                status=status.HTTP_400_BAD_REQUEST
            )


class GoogleAuthView(APIView):
    """
    Google OAuth認証ビュー

    GoogleのOAuthトークンを検証し、ユーザーを認証します。

    Endpoints:
        POST /api/auth/google/ - Google OAuth認証
    """
    permission_classes = (AllowAny,)
    serializer_class = GoogleAuthSerializer

    def post(self, request: Request) -> Response:
        """
        Google OAuth認証処理

        Args:
            request: HTTPリクエスト

        Returns:
            Response: ユーザー情報とトークン

        Raises:
            GoogleAuthError: Google認証に失敗した場合
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Googleトークンを検証
            idinfo = id_token.verify_oauth2_token(
                serializer.validated_data['access_token'],
                google_requests.Request(),
                settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id']
            )

            # ユーザー情報を取得
            email = idinfo.get('email')
            google_id = idinfo.get('sub')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            if not email:
                raise GoogleAuthError("メールアドレスが取得できませんでした。")

            # ユーザーを取得または作成
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'google_id': google_id,
                    'first_name': first_name,
                    'last_name': last_name,
                    'is_active': True,
                }
            )

            # google_idが設定されていない場合は更新
            if not user.google_id:
                user.google_id = google_id
                user.save(update_fields=['google_id'])

            # トークンを生成
            refresh = RefreshToken.for_user(user)

            action = "registered" if created else "logged in"
            logger.info(f"User {user.id} {action} via Google OAuth")

            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'display_name': user.get_display_name(),
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'is_new_user': created,
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            logger.error(f"Google auth token validation failed: {str(e)}")
            raise GoogleAuthError("トークンが無効です。")
        except Exception as e:
            logger.error(
                f"Google authentication error: {str(e)}",
                exc_info=True
            )
            raise GoogleAuthError()


class LogoutView(APIView):
    """
    ログアウトビュー

    リフレッシュトークンをブラックリストに追加してログアウトします。

    Endpoints:
        POST /api/auth/logout/ - ログアウト
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request) -> Response:
        """
        ログアウト処理

        Args:
            request: HTTPリクエスト

        Returns:
            Response: ログアウト成功メッセージ
        """
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                logger.warning("Logout attempted without refresh token")
                return Response(
                    {"error": "リフレッシュトークンが必要です。"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            logger.info(f"User {request.user.id} logged out successfully")

            return Response(
                {"message": "ログアウトしました。"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            logger.error(f"Logout error: {str(e)}", exc_info=True)
            raise InvalidTokenError("無効なトークンです。")


class VerifyTokenView(APIView):
    """
    トークン検証ビュー

    JWTトークンの有効性を検証し、ユーザー情報を返します。

    Endpoints:
        GET /api/auth/verify/ - トークン検証
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request) -> Response:
        """
        トークン検証処理

        Args:
            request: HTTPリクエスト

        Returns:
            Response: トークンの有効性とユーザー情報
        """
        user = request.user
        logger.info(f"Token verified for user {user.id}")

        return Response({
            'valid': True,
            'user': {
                'id': user.id,
                'email': user.email,
                'display_name': user.get_display_name(),
            }
        })


class TwitterAuthView(APIView):
    """
    Twitter OAuth2認証ビュー

    TwitterのOAuthトークンを検証し、ユーザーを認証します。

    Endpoints:
        POST /api/auth/twitter/ - Twitter OAuth認証
    """
    permission_classes = (AllowAny,)
    serializer_class = SocialAuthSerializer

    def post(self, request: Request) -> Response:
        """
        Twitter OAuth認証処理

        Args:
            request: HTTPリクエスト

        Returns:
            Response: ユーザー情報とトークン

        Raises:
            TwitterAuthError: Twitter認証に失敗した場合
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            import requests as http_requests

            access_token = serializer.validated_data['access_token']

            # Twitter API v2からユーザー情報を取得
            headers = {
                'Authorization': f'Bearer {access_token}'
            }

            response = http_requests.get(
                'https://api.twitter.com/2/users/me'
                '?user.fields=profile_image_url',
                headers=headers,
                timeout=10  # タイムアウトを設定
            )

            if response.status_code != 200:
                logger.error(f"Twitter API error: {response.status_code}")
                raise TwitterAuthError("Twitter認証に失敗しました。")

            twitter_user = response.json().get('data', {})

            # ユーザー情報を取得
            twitter_id = twitter_user.get('id')
            username = twitter_user.get('username')
            name = twitter_user.get('name')

            if not twitter_id:
                raise TwitterAuthError("Twitterユーザー情報が取得できませんでした。")

            # Twitterはメールアドレスを提供しないことがあるため、
            # twitter_idをベースにメールアドレスを生成
            email = f'{twitter_id}@twitter.temp'

            # ユーザーを取得または作成
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'display_name': name or username,
                    'is_active': True,
                }
            )

            # トークンを生成
            refresh = RefreshToken.for_user(user)

            action = "registered" if created else "logged in"
            logger.info(f"User {user.id} {action} via Twitter OAuth")

            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'display_name': user.get_display_name(),
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'is_new_user': created,
            }, status=status.HTTP_200_OK)

        except http_requests.Timeout:
            logger.error("Twitter API timeout")
            raise TwitterAuthError(
                "Twitter APIのリクエストがタイムアウトしました。"
            )
        except Exception as e:
            logger.error(
                f"Twitter authentication error: {str(e)}",
                exc_info=True
            )
            raise TwitterAuthError()


class DiscordAuthView(APIView):
    """
    Discord OAuth認証ビュー

    DiscordのOAuthトークンを検証し、ユーザーを認証します。

    Endpoints:
        POST /api/auth/discord/ - Discord OAuth認証
    """
    permission_classes = (AllowAny,)
    serializer_class = SocialAuthSerializer

    def post(self, request: Request) -> Response:
        """
        Discord OAuth認証処理

        Args:
            request: HTTPリクエスト

        Returns:
            Response: ユーザー情報とトークン

        Raises:
            DiscordAuthError: Discord認証に失敗した場合
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            import requests as http_requests

            access_token = serializer.validated_data['access_token']

            # Discord APIからユーザー情報を取得
            headers = {
                'Authorization': f'Bearer {access_token}'
            }

            response = http_requests.get(
                'https://discord.com/api/users/@me',
                headers=headers,
                timeout=10  # タイムアウトを設定
            )

            if response.status_code != 200:
                logger.error(f"Discord API error: {response.status_code}")
                raise DiscordAuthError("Discord認証に失敗しました。")

            discord_user = response.json()

            # ユーザー情報を取得
            email = discord_user.get('email')
            username = discord_user.get('username')

            if not email:
                raise DiscordAuthError("メールアドレスが取得できませんでした。")

            # ユーザーを取得または作成
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'display_name': username,
                    'is_active': True,
                }
            )

            # トークンを生成
            refresh = RefreshToken.for_user(user)

            action = "registered" if created else "logged in"
            logger.info(f"User {user.id} {action} via Discord OAuth")

            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'display_name': user.get_display_name(),
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'is_new_user': created,
            }, status=status.HTTP_200_OK)

        except http_requests.Timeout:
            logger.error("Discord API timeout")
            raise DiscordAuthError("Discord APIのリクエストがタイムアウトしました。")
        except Exception as e:
            logger.error(
                f"Discord authentication error: {str(e)}",
                exc_info=True
            )
            raise DiscordAuthError()
