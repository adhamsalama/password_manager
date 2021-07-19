from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('passwords', views.PasswordList.as_view(), name='password-list'),
    path('passwords/<int:pk>', views.PasswordDetail.as_view(), name='password-detail'),
    path('login', views.LoginUser.as_view(), name='login-user'),
    path('logout', views.LogoutUser.as_view(), name='logout-user'),
    path('register', views.RegisterUser.as_view(), name='register-user'),
    path('verify-master-password', views.VerifyMasterPassword.as_view(), name='verify-master-password')
]
