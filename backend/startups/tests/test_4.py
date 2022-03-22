import email
import imp
from unicodedata import name
from urllib import response

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

# Test for delete function

class BusinessDeleteTest(APITestCase):

    def setUp(self):
        pass

    def test_unsuccessful_business_does_not_exist(self):
        pass

    def test_unsuccessful_not_authorized(self):
        pass

    def test_successful_business_deleted(self):
        pass