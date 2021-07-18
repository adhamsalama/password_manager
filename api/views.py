from .models import User, Password
from .serializers import UserSerializer, PasswordSerializer
from rest_framework import generics
from .permissions import IsOwner
from rest_framework import permissions

# Create your views here.

class PasswordList(generics.ListCreateAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    def get_queryset(self):
        return Password.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class PasswordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
