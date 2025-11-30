"""
ユーザー関連のカスタム例外

このモジュールはユーザー関連の操作で発生する
カスタム例外を定義します。
"""
from rest_framework.exceptions import APIException
from rest_framework import status


class UserNotFoundError(APIException):
    """
    ユーザーが見つからない場合の例外
    """
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = 'ユーザーが見つかりません。'
    default_code = 'user_not_found'


class InvalidUserDataError(APIException):
    """
    無効なユーザーデータの例外
    """
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = '無効なユーザーデータです。'
    default_code = 'invalid_user_data'


class UserAlreadyExistsError(APIException):
    """
    ユーザーが既に存在する場合の例外
    """
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'このメールアドレスは既に使用されています。'
    default_code = 'user_already_exists'


class PermissionDeniedError(APIException):
    """
    権限がない場合の例外
    """
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = 'この操作を実行する権限がありません。'
    default_code = 'permission_denied'

