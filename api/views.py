from .models import User, Password
from .serializers import UserSerializer, PasswordSerializer
from rest_framework import generics
from .permissions import IsOwner
from rest_framework import permissions
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.hashers import make_password


# Create your views here.

class PasswordList(generics.ListCreateAPIView,
                    generics.UpdateAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request):
        q = request.query_params.get('q', None)
        if q is None:
            return super().get(request)
    
        passwords = Password.objects.filter(user=request.user)
        passwords = passwords.filter(Q(url__contains=q)
                                     |Q(email__contains=q)
                                     |Q(username__contains=q))
                                     #|Q(tags__tags__contains =q)) JSON filtering is not supported in SQLite
                                     # Will try to make it work when I change the database backend to PostgreSQL
        serializer = PasswordSerializer(passwords, many=True)
        return Response(serializer.data)

    def patch(self, request):
        passwords = Password.objects.filter(user=request.user)
        # serialize all passwords
        for i in range(len(passwords)):
            serializer = PasswordSerializer(passwords[i], data=request.data['passwords'][i])
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({"errors": serializer.errors}, status=400)
        return Response({"msg": "Saved all passwords successfully."}, status=200)


    def get_queryset(self):
        return Password.objects.filter(user=self.request.user).order_by('url')
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    

class UpdateUserData(APIView):
    def patch(self, request):
        user = User.objects.get(username=request.user.username)
        new_username = request.data.get('new_username', None)
        password = request.data.get('password', None)
        new_password = request.data.get('new_password', None)
        if password is None:
            return Response({"error": "Master password is required."}, status=400)

        if not user.check_password(password):
            return Response({"error": "Wrong master password."}, status=400)
            
        if new_username is not None and new_username != '':
            try:
                existing_user = User.objects.get(username=new_username)
                return Response({"error": "Username already taken."}, status=400)
            except User.DoesNotExist:
                user.username = new_username

        if new_password is not None and new_password != '':
            user.set_password(new_password)

        user.save()
        login(request, user)
        return Response({"User credentials updated successfully."}, status=200)    


class PasswordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    


class VerifyMasterPassword(APIView):
    def post(self, request):
        return Response(request.user.check_password(request.data['master_password']))


class RegisterUser(APIView):
    def post(self, request):
        try:
            existing_user = User.objects.get(username=request.data['username'])
            return Response({"error": "Username already taken."}, status=400)
        except User.DoesNotExist:
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
