from .models import User, Password
from .serializers import UserSerializer, PasswordSerializer
from rest_framework import generics

# Create your views here.

class PasswordList(generics.ListCreateAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class PasswordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
