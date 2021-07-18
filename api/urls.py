from django.urls import path
from . import views


urlpatterns = [
    path('api/passwords', views.PasswordList.as_view(), name='password-list'),
    path('api/passwords/<int:pk>', views.PasswordDetail.as_view(), name='password-detail'),
]
