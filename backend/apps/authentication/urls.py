"""
認証関連のURL設定
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CustomTokenObtainPairView,
    RegisterView,
    GoogleAuthView,
    LogoutView,
    VerifyTokenView,
)

app_name = 'authentication'

urlpatterns = [
    # JWT認証
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/', VerifyTokenView.as_view(), name='verify'),
    
    # Google OAuth
    path('google/', GoogleAuthView.as_view(), name='google_auth'),
]

