from django.test import TestCase, Client
from api.models import User, Password
from django.contrib.auth import login
from rest_framework.test import APIRequestFactory, APIClient

# Create your tests here.

class PasswordTestCase(TestCase):
    def setUp(self):
        
        # Create users
        user1 = User.objects.create_user(username='user1', password='password1')
        user2 = User.objects.create_user(username='user2', password='password2')

        # Create passwords

        Password.objects.create(email='email1@a.com',
                                username='username1',
                                url='https://url1.com',
                                encrypted_password='encrypted_password1',
                                user=user1)
        Password.objects.create(email='email11@a.com',
                                username='username11',
                                url='https://url11.com',
                                encrypted_password='encrypted_password11',
                                user=user1)
        
    def test_passwords_count(self):
        u = User.objects.get(username='user1')
        self.assertEqual(u.passwords.count(), 2)
    
    def test_api_passwords(self):
        """
            Test getting user passwords.
        """
        f = APIClient()
        user = User.objects.get(username='user1')
        res = f.post('/api/login', {'username': 'user1', 'password': 'password1'})
        api_pws = f.get('/api/passwords')
        self.assertEqual(user.passwords.count(), len(api_pws.data))

    def test_mpw_change(self):
        """
            Test changing the master password.
        """
        f = APIClient()
        user = User.objects.get(username='user1')
        res = f.post('/api/login', {'username': 'user1', 'password': 'password1'})
        new_pw = 'new_password'
        f.patch('/api/update-user-data', {'password': 'password1', 'new_password': new_pw})
        b = f.post('/api/verify-master-password', {'master_password': new_pw})
        self.assertEqual(b.data, True)