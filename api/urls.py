from django.urls import path
from . import views


urlpatterns = [
    path('passwords', views.PasswordList.as_view(), name='password-list'),
    path('passwords/<int:pk>', views.PasswordDetail.as_view(), name='password-detail'),
    path('users', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>', views.UserDetail.as_view(), name='user-detail')
]