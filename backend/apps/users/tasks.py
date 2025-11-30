"""
ユーザー関連のCeleryタスク

このモジュールはユーザー関連の非同期タスクを定義します。
メール送信やクリーンアップ処理などのバックグラウンドジョブを提供します。
"""
import logging
from datetime import timedelta

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

logger = logging.getLogger(__name__)


@shared_task(
    bind=True,
    autoretry_for=(Exception,),
    retry_kwargs={'max_retries': 3, 'countdown': 60}
)
def send_welcome_email(self, user_email: str, user_name: str) -> str:
    """
    新規ユーザーにウェルカムメールを送信

    Args:
        self: Celeryタスクインスタンス（bind=Trueの場合）
        user_email: ユーザーのメールアドレス
        user_name: ユーザーの表示名

    Returns:
        str: 実行結果メッセージ

    Raises:
        Exception: メール送信に失敗した場合（自動リトライされる）
    """
    try:
        subject = 'ようこそ！'
        message = f'{user_name}さん、ご登録ありがとうございます。'
        from_email = getattr(
            settings,
            'DEFAULT_FROM_EMAIL',
            'noreply@example.com'
        )

        send_mail(
            subject,
            message,
            from_email,
            [user_email],
            fail_silently=False,
        )

        logger.info(f'Welcome email sent to {user_email}')
        return f'Welcome email sent to {user_email}'

    except Exception as e:
        logger.error(
            f'Failed to send welcome email to {user_email}: {str(e)}',
            exc_info=True
        )
        raise


@shared_task
def cleanup_inactive_users(days: int = 30) -> str:
    """
    非アクティブユーザーのクリーンアップ

    指定された日数以上非アクティブなユーザーを削除します。
    定期実行タスクとして使用されます。

    Args:
        days: 非アクティブとみなす日数（デフォルト: 30日）

    Returns:
        str: 実行結果メッセージ（削除されたユーザー数を含む）
    """
    try:
        from .models import User

        # 指定日数以上非アクティブなユーザーを取得
        threshold_date = timezone.now() - timedelta(days=days)
        inactive_users = User.objects.filter(
            is_active=False,
            created_at__lt=threshold_date
        )

        count = inactive_users.count()

        if count > 0:
            inactive_users.delete()
            logger.info(
                f'Deleted {count} inactive users '
                f'(inactive for {days}+ days)'
            )
        else:
            logger.info(
                f'No inactive users to delete (threshold: {days} days)'
            )

        return f'Deleted {count} inactive users'

    except Exception as e:
        logger.error(
            f'Failed to cleanup inactive users: {str(e)}',
            exc_info=True
        )
        return f'Error: {str(e)}'


@shared_task
def send_password_reset_email(user_email: str, reset_token: str) -> str:
    """
    パスワードリセットメールを送信

    Args:
        user_email: ユーザーのメールアドレス
        reset_token: パスワードリセット用のトークン

    Returns:
        str: 実行結果メッセージ
    """
    try:
        subject = 'パスワードリセットのリクエスト'
        message = f'パスワードをリセットするには、以下のトークンを使用してください: {reset_token}'
        from_email = getattr(
            settings,
            'DEFAULT_FROM_EMAIL',
            'noreply@example.com'
        )

        send_mail(
            subject,
            message,
            from_email,
            [user_email],
            fail_silently=False,
        )

        logger.info(f'Password reset email sent to {user_email}')
        return f'Password reset email sent to {user_email}'

    except Exception as e:
        logger.error(
            f'Failed to send password reset email to {user_email}: {str(e)}',
            exc_info=True
        )
        raise

