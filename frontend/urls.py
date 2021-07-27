from django.urls import path
from . import views

app_name = "frontend"

urlpatterns = [
    path('', views.landing, name='landing'),
    path('vault', views.index, name='vault'),
    path('accounts', views.login_register, name='accounts'),
    path('settings', views.settings, name='settings')
]