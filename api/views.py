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
        #print(request.data)
        #username = request.data.get('username', None)
        #if username is not None:
        #    user.username = username
        #password = request.data.get('password', None)
        #if password is not None:
        #    user.set_password(password)
        #    print("set user password to", password)
        #user.save()
        #login(request, user)
        #return Response({"detail": "Updated user data"}, status=200)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            # turn validated data of type OrderedDict to a list
            data = list(serializer.validated_data.items())

            username = data[0][1]
            password = data[1][1]
            if password is not None:
                serializer.save(password=make_password(password))
            else:
                serializer.save()
            login(request, user)
            return Response({"Master Password changed."}, status=200)
        return Response({"errors from update user": serializer.errors}, status=400)


class PasswordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

#class StoreEncryptedPasswords(generics.UpdateAPIView):
    


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
