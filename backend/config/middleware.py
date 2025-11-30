"""
カスタムミドルウェア

このモジュールはリクエストログ、パフォーマンス監視、
セキュリティチェックなどのカスタムミドルウェアを提供します。
"""
import logging
import time

from django.http import HttpRequest, HttpResponse
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    リクエストロギングミドルウェア

    すべてのHTTPリクエストの詳細（メソッド、パス、ユーザー、レスポンスタイム等）を
    ログに記録します。
    """

    def process_request(self, request: HttpRequest) -> None:
        """
        リクエスト処理の開始時に呼ばれる

        Args:
            request: HTTPリクエストオブジェクト
        """
        # リクエスト開始時刻を記録
        request._start_time = time.time()

        # リクエスト情報をログに記録
        user = getattr(request, 'user', None)
        user_id = (
            user.id if user and user.is_authenticated
            else 'anonymous'
        )
        user_str = f"user={user_id}"

        logger.info(
            f"Request started: {request.method} {request.path} "
            f"from {self._get_client_ip(request)} {user_str}"
        )

    def process_response(
        self,
        request: HttpRequest,
        response: HttpResponse
    ) -> HttpResponse:
        """
        レスポンス返却時に呼ばれる

        Args:
            request: HTTPリクエストオブジェクト
            response: HTTPレスポンスオブジェクト

        Returns:
            HttpResponse: レスポンスオブジェクト
        """
        # レスポンスタイムを計算
        if hasattr(request, '_start_time'):
            duration = time.time() - request._start_time
            duration_ms = round(duration * 1000, 2)

            # レスポンス情報をログに記録
            user = getattr(request, 'user', None)
            user_id = (
                user.id if user and user.is_authenticated
                else 'anonymous'
            )
            user_str = f"user={user_id}"

            log_level = logging.INFO
            if response.status_code >= 500:
                log_level = logging.ERROR
            elif response.status_code >= 400:
                log_level = logging.WARNING

            logger.log(
                log_level,
                f"Request finished: {request.method} {request.path} "
                f"status={response.status_code} "
                f"duration={duration_ms}ms {user_str}"
            )

            # レスポンスヘッダーに処理時間を追加
            response['X-Response-Time'] = f"{duration_ms}ms"

        return response

    def process_exception(
        self,
        request: HttpRequest,
        exception: Exception
    ) -> None:
        """
        例外発生時に呼ばれる

        Args:
            request: HTTPリクエストオブジェクト
            exception: 発生した例外
        """
        user = getattr(request, 'user', None)
        user_id = (
            user.id if user and user.is_authenticated
            else 'anonymous'
        )
        user_str = f"user={user_id}"

        logger.error(
            f"Request exception: {request.method} {request.path} "
            f"{user_str} error={str(exception)}",
            exc_info=True
        )

    @staticmethod
    def _get_client_ip(request: HttpRequest) -> str:
        """
        クライアントのIPアドレスを取得

        Args:
            request: HTTPリクエストオブジェクト

        Returns:
            str: クライアントのIPアドレス
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR', 'unknown')
        return ip


class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    セキュリティヘッダーミドルウェア

    セキュリティ関連のHTTPヘッダーを追加します。
    """

    def process_response(
        self,
        request: HttpRequest,
        response: HttpResponse
    ) -> HttpResponse:
        """
        レスポンスにセキュリティヘッダーを追加

        Args:
            request: HTTPリクエストオブジェクト
            response: HTTPレスポンスオブジェクト

        Returns:
            HttpResponse: セキュリティヘッダーが追加されたレスポンス
        """
        # XSS保護
        response['X-XSS-Protection'] = '1; mode=block'

        # コンテンツタイプスニッフィング防止
        response['X-Content-Type-Options'] = 'nosniff'

        # クリックジャッキング防止（既に設定されていない場合）
        if 'X-Frame-Options' not in response:
            response['X-Frame-Options'] = 'DENY'

        # Referrerポリシー
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Permissions Policy（旧Feature Policy）
        response['Permissions-Policy'] = (
            'geolocation=(), microphone=(), camera=()'
        )

        return response


class PerformanceMonitoringMiddleware(MiddlewareMixin):
    """
    パフォーマンス監視ミドルウェア

    レスポンスタイムが閾値を超えた場合に警告を出します。
    """

    # 警告を出すレスポンスタイムの閾値（秒）
    SLOW_REQUEST_THRESHOLD = 1.0

    def process_request(self, request: HttpRequest) -> None:
        """
        リクエスト処理の開始時に呼ばれる

        Args:
            request: HTTPリクエストオブジェクト
        """
        request._perf_start_time = time.time()

    def process_response(
        self,
        request: HttpRequest,
        response: HttpResponse
    ) -> HttpResponse:
        """
        レスポンス返却時にパフォーマンスをチェック

        Args:
            request: HTTPリクエストオブジェクト
            response: HTTPレスポンスオブジェクト

        Returns:
            HttpResponse: レスポンスオブジェクト
        """
        if hasattr(request, '_perf_start_time'):
            duration = time.time() - request._perf_start_time

            # 閾値を超えた場合に警告
            if duration > self.SLOW_REQUEST_THRESHOLD:
                threshold_ms = self.SLOW_REQUEST_THRESHOLD * 1000
                logger.warning(
                    f"Slow request detected: "
                    f"{request.method} {request.path} "
                    f"duration={round(duration * 1000, 2)}ms "
                    f"(threshold={threshold_ms}ms)"
                )

        return response
