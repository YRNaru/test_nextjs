"""
認証関連のビュー
"""
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings

from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    GoogleAuthSerializer,
)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """カスタムトークン取得ビュー"""
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """ユーザー登録ビュー"""
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # トークンを生成
        refresh = RefreshToken.for_user(user)
        
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


class GoogleAuthView(APIView):
    """Google OAuth認証ビュー"""
    permission_classes = (AllowAny,)
    serializer_class = GoogleAuthSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            # Googleトークンを検証
            idinfo = id_token.verify_oauth2_token(
                serializer.validated_data['access_token'],
                requests.Request(),
                settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id']
            )
            
            # ユーザー情報を取得
            email = idinfo.get('email')
            google_id = idinfo.get('sub')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            
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
                user.save()
            
            # トークンを生成
            refresh = RefreshToken.for_user(user)
            
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
            return Response(
                {'error': 'トークンが無効です。'},
                status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    """ログアウトビュー"""
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"message": "ログアウトしました。"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class VerifyTokenView(APIView):
    """トークン検証ビュー"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        user = request.user
        return Response({
            'valid': True,
            'user': {
                'id': user.id,
                'email': user.email,
                'display_name': user.get_display_name(),
            }
        })

