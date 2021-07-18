from django.urls import path
from . import views

app_name = "frontend"

urlpatterns = [
    path('', views.index, name='index'),
    path('accounts', views.login_register, name='accounts'),
]