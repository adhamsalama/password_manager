from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Password(models.Model):
    email = models.EmailField(null=True, blank=True)
    username = models.CharField(max_length=64, null=True, blank=True)
    encrypted_password = models.CharField(max_length=256)
    url = models.URLField(max_length=256, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='passwords')
