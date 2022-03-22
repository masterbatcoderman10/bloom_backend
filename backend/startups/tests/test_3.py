import email
import imp
from unicodedata import name

from django import views
from ..models import Business
from ..views import BusinessListView
from ..views import BusinessDetailView
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from datetime import datetime
from rest_framework import status

# Test for get functions for specific businesses (BusinessDetailView)

class BusinessGetTestsSpecific(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')
        Token.objects.create(user=self.user)
        self.user2 = User.objects.create_user(email='second@second.com', password='Pa$5word', username='secondUser')
        Token.objects.create(user=self.user2)

        self.b1 = Business.objects.create(
            user=self.user,
            name="Bloom",
            founders="team50",
            description="Bloom is a platform for start-ups",
            date_founded= datetime.strptime("2022-02-20", "%Y-%m-%d"),
            num_employees=6,
            industry="SR",
            email="bloom@bloom.com"
        )

        self.b3 = Business.objects.create(
            user = self.user2,
            name="TestBusiness",
            founders="team500",
            description="This is a test startup",
            date_founded= datetime.strptime("2022-01-20", "%Y-%m-%d"),
            num_employees=10,
            industry="SR",
            email="test@test.com"
        )

    def test_successful_authorization(self):

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(response.json()["name"], "Bloom")
        self.assertEquals(response.json()["email"], "bloom@bloom.com")
        self.assertEquals(response.json()["description"], "Bloom is a platform for start-ups")
        self.assertEquals(response.json()["founders"], "team50")
        self.assertEquals(response.json()["industry"], "SR")
        self.assertEquals(response.json()["num_employees"], 6)
        self.assertEquals(response.json()["date_founded"], "2022-02-20")

    def test_unsuccessful_not_authorized(self):

        id = self.b3.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.get(url, format="json")

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        

    def test_unsuccessful_incorrect_account(self):

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
       
        id = self.b3.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.get(url, format="json")

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEquals(response.json()["message"], "Not authorized")
    