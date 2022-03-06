from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.utils import timezone
from .serializers import UserSerializer
import datetime
# Create your tests here.

class LoginTests(APITestCase):

    

    def setUp(self):
        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')

    def test_successful_login(self):
        
        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {'email' : "first@first.com", 'password': "Pa$5word"}
        response = self.client.post(url, object_to_send)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_email_missing(self):

        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {'password': "Pa$5word"}
        response = self.client.post(url, object_to_send)
        self.assertEqual(response.json()["message"], "email not received")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_password_missing(self):

        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {"email": 'first@first.com'}
        response = self.client.post(url, object_to_send)
        self.assertEqual(response.json()["message"], "password not received")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_incorrect_email(self):

        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {'email' : "FFirst@first.com", 'password': "Pa$5word"}
        response = self.client.post(url, object_to_send)
        self.assertEqual(response.json()["message"], "this email does not exist")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_incorrect_password(self):

        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {'email' : "first@first.com", 'password': "Pa$$word"}
        response = self.client.post(url, object_to_send)
        self.assertEqual(response.json()["message"], "login failed - incorrect password")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class RegistrationTestCases(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')
        self.user = User.objects.create_user(email='second@second.com', password='Pa$5word', username='secondUser')

    
    def test_successful_registration(self):
        
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "thirdUser", 'email': 'third@third.com', 'password': 'Pa$5word'}
        response = self.client.post(url, objToSend)
        token = Token.objects.get_or_create(user__username=objToSend["username"])
        res_token = response.json()["token"]
        self.assertEquals(res_token, str(token[0]))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
    
    def test_registration_with_existing_email(self):
        
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "thirdUser", 'email': 'first@first.com', 'password': 'Pa$5word'}
        response = self.client.post(url, objToSend)
        self.assertEquals(response.json()["message"], "email already exists")
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_registration_with_existing_username(self):
        
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "firstUser", 'email': 'third@third.com', 'password': 'Pa$5word'}
        response = self.client.post(url, objToSend)
        self.assertEquals(response.json()["message"], "username already exists")
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_with_short_password(self):
        
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "thirdUser", 'email': 'third@third.com', 'password': 'Pa$5wo'}
        response = self.client.post(url, objToSend)
        self.assertEquals(response.json()["message"], "password too short")
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_incorrect_email(self):
        
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "thirdUser", 'email': 'third', 'password': 'Pa$5word'}
        response = self.client.post(url, objToSend)
        self.assertEquals(response.json()["message"], "some other detail is incorrect - either the email, or the username")
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    
class IntegrationTestLoginRegistration(APITestCase):

    def test_login_after_registration(self):
        
        #Successful registration
        url = 'http://127.0.0.1:8000/authentication/register/'
        objToSend = {'username': "thirdUser", 'email': 'third@third.com', 'password': 'Pa$5word'}
        response = self.client.post(url, objToSend)
        token = Token.objects.get_or_create(user__username=objToSend["username"])
        res_token_reg = response.json()["token"]
        self.assertEquals(res_token_reg, str(token[0]))
        self.assertEquals(response.status_code, status.HTTP_200_OK)

        #Login after registration
        url = "http://127.0.0.1:8000/authentication/login/"
        object_to_send = {'email' : "third@third.com", 'password': "Pa$5word"}
        response = self.client.post(url, object_to_send)
        res_token_log = response.json()["token"]
        #Test to see if the token obtained from loggin in is the same as the token obtained from registration.
        self.assertEquals(res_token_reg, res_token_log)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

