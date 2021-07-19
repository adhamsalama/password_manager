from .models import User, Password
from .serializers import UserSerializer, PasswordSerializer
from rest_framework import generics
from .permissions import IsOwner
from rest_framework import permissions
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.db.models import Q

# Create your views here.

class PasswordList(generics.ListCreateAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request):
        q = request.query_params.get('q', None)
        if q is None:
            return super().get(request)
        
        passwords = Password.objects.filter(user=request.user)
        passwords = passwords.filter(Q(url__contains=q)|
                                     Q(email__contains=q)|
                                     Q(username__contains=q))
        serializer = PasswordSerializer(passwords, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return Password.objects.filter(user=self.request.user).order_by('url')
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class PasswordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]


class VerifyMasterPassword(APIView):
    def post(self, request):
        return Response(request.user.check_password(request.data['master_password']))


class RegisterUser(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        user.save()
        login(request, user)
        return Response({"Registered successfully."}, status=200)


class LoginUser(APIView):
    def post(self, request):
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            return Response({"Logged in successfully."}, status=200)
        else:
            return Response({"Invalid credentials."}, status=400)


class LogoutUser(APIView):
    def get(self, request):
        logout(request)
        return Response({"Logged out successfully."},status=200)
