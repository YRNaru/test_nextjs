"""
ユーザー関連のURL設定
"""
from django.urls import path
from .views import (
    UserProfileView,
    UserListView,
    UserDetailView,
)

app_name = 'users'

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('list/', UserListView.as_view(), name='list'),
    path('<int:pk>/', UserDetailView.as_view(), name='detail'),
]

