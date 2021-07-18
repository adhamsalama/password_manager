from rest_framework import serializers
from .models import User, Password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'passwords']


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ['email', 'username', 'encrypted_password', 'link']
