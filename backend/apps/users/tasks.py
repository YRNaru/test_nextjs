"""
ユーザー関連のCeleryタスク
"""
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task
def send_welcome_email(user_email, user_name):
    """
    新規ユーザーにウェルカムメールを送信
    """
    subject = 'ようこそ！'
    message = f'{user_name}さん、ご登録ありがとうございます。'
    from_email = settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'noreply@example.com'
    
    send_mail(
        subject,
        message,
        from_email,
        [user_email],
        fail_silently=False,
    )
    
    return f'Welcome email sent to {user_email}'


@shared_task
def cleanup_inactive_users():
    """
    非アクティブユーザーのクリーンアップ（定期実行タスクの例）
    """
    from django.utils import timezone
    from datetime import timedelta
    from .models import User
    
    # 30日以上非アクティブなユーザーを取得
    thirty_days_ago = timezone.now() - timedelta(days=30)
    inactive_users = User.objects.filter(
        is_active=False,
        created_at__lt=thirty_days_ago
    )
    
    count = inactive_users.count()
    inactive_users.delete()
    
    return f'Deleted {count} inactive users'

