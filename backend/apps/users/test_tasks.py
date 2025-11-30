"""
Celeryタスクのテスト

非同期タスクの動作をテストします。
"""
from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from .tasks import send_welcome_email, cleanup_inactive_users, send_password_reset_email

User = get_user_model()


class SendWelcomeEmailTestCase(TestCase):
    """ウェルカムメール送信タスクのテスト"""
    
    @patch('apps.users.tasks.send_mail')
    def test_send_welcome_email_success(self, mock_send_mail):
        """ウェルカムメール送信成功"""
        result = send_welcome_email('test@example.com', 'Test User')
        
        mock_send_mail.assert_called_once()
        self.assertIn('test@example.com', result)
    
    @patch('apps.users.tasks.send_mail')
    def test_send_welcome_email_failure(self, mock_send_mail):
        """ウェルカムメール送信失敗時のリトライ"""
        mock_send_mail.side_effect = Exception('SMTP Error')
        
        with self.assertRaises(Exception):
            send_welcome_email('test@example.com', 'Test User')


class CleanupInactiveUsersTestCase(TestCase):
    """非アクティブユーザークリーンアップタスクのテスト"""
    
    def test_cleanup_inactive_users(self):
        """非アクティブユーザーの削除"""
        # 古い非アクティブユーザーを作成
        old_user = User.objects.create_user(
            email='old@example.com',
            password='test123',
            is_active=False
        )
        old_user.created_at = timezone.now() - timedelta(days=31)
        old_user.save()
        
        # 新しい非アクティブユーザー（削除されないはず）
        new_user = User.objects.create_user(
            email='new@example.com',
            password='test123',
            is_active=False
        )
        
        # アクティブユーザー（削除されないはず）
        active_user = User.objects.create_user(
            email='active@example.com',
            password='test123',
            is_active=True
        )
        active_user.created_at = timezone.now() - timedelta(days=31)
        active_user.save()
        
        # タスク実行
        result = cleanup_inactive_users(days=30)
        
        # 検証
        self.assertIn('Deleted', result)
        self.assertFalse(User.objects.filter(email='old@example.com').exists())
        self.assertTrue(User.objects.filter(email='new@example.com').exists())
        self.assertTrue(User.objects.filter(email='active@example.com').exists())
    
    def test_cleanup_inactive_users_no_users(self):
        """削除対象がない場合"""
        result = cleanup_inactive_users(days=30)
        self.assertIn('Deleted 0', result)


class SendPasswordResetEmailTestCase(TestCase):
    """パスワードリセットメール送信タスクのテスト"""
    
    @patch('apps.users.tasks.send_mail')
    def test_send_password_reset_email_success(self, mock_send_mail):
        """パスワードリセットメール送信成功"""
        result = send_password_reset_email('test@example.com', 'reset-token-123')
        
        mock_send_mail.assert_called_once()
        self.assertIn('test@example.com', result)
        # トークンがメッセージに含まれているか確認
        call_args = mock_send_mail.call_args
        self.assertIn('reset-token-123', call_args[0][1])
    
    @patch('apps.users.tasks.send_mail')
    def test_send_password_reset_email_failure(self, mock_send_mail):
        """パスワードリセットメール送信失敗"""
        mock_send_mail.side_effect = Exception('SMTP Error')
        
        with self.assertRaises(Exception):
            send_password_reset_email('test@example.com', 'token')

