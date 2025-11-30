from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from .serializers import RegisterSerializer

User = get_user_model()

class RegisterSerializerTestCase(TestCase):
    def test_validate_email_duplicate(self):
        User.objects.create_user(email='existing@example.com', password='Pass123')
        
        serializer = RegisterSerializer(data={
            'email': 'existing@example.com',
            'password': 'Pass123',
            'password_confirm': 'Pass123',
        })
        
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)
    
    def test_validate_weak_password(self):
        serializer = RegisterSerializer(data={
            'email': 'test@example.com',
            'password': 'weak',
            'password_confirm': 'weak',
        })
        
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)
