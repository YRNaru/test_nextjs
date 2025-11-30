"""
認証関連のカスタム例外

このモジュールは認証機能で発生する
カスタム例外を定義します。
"""
from rest_framework.exceptions import APIException
from rest_framework import status


class InvalidCredentialsError(APIException):
    """
    認証情報が無効な場合の例外
    """
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'メールアドレスまたはパスワードが正しくありません。'
    default_code = 'invalid_credentials'


class InvalidTokenError(APIException):
    """
    トークンが無効な場合の例外
    """
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'トークンが無効または期限切れです。'
    default_code = 'invalid_token'


class SocialAuthError(APIException):
    """
    ソーシャル認証エラーの例外
    """
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'ソーシャル認証に失敗しました。'
    default_code = 'social_auth_error'


class GoogleAuthError(SocialAuthError):
    """
    Google認証エラーの例外
    """
    default_detail = 'Google認証に失敗しました。'
    default_code = 'google_auth_error'


class TwitterAuthError(SocialAuthError):
    """
    Twitter認証エラーの例外
    """
    default_detail = 'Twitter認証に失敗しました。'
    default_code = 'twitter_auth_error'


class DiscordAuthError(SocialAuthError):
    """
    Discord認証エラーの例外
    """
    default_detail = 'Discord認証に失敗しました。'
    default_code = 'discord_auth_error'
