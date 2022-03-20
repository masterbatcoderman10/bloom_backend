import email
import imp
from unicodedata import name
from .models import Business
from .views import BusinessListView
from .views import BusinessDetailView
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from datetime import datetime
from rest_framework import status

# Create your tests here.
class BusinessPutTests(APITestCase):

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

        Business.objects.create(
            user=self.user,
            name="Recycle",
            founders="team50",
            description="Recycle is a platform for recycling",
            date_founded= datetime.strptime("2022-02-25", "%Y-%m-%d"),
            num_employees=6,
            industry="SR",
            email="re@re.com"
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


    
    def test_successful_edit_title(self):
        
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")
        print(response.json())
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom Inc")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
    
    def test_successful_edit_email(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "email" : "bloom2@bloom.com",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom2@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
        
    def test_successful_edit_description(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "description" : "This is our team project",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "This is our team project")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
        
    def test_successful_edit_founders(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "founders" : "Abdullah, Ali, ...",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "Abdullah, Ali, ...")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
        
    def test_successful_edit_industry(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "industry" : "OT",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "OT")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
        
    def test_successful_edit_employees(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "num_employees": 5
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 5)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
    
    def test_unsuccessful_edit_employees_negative(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "num_employees": -5
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
        
    def test_successful_edit_date(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "date_founded": "2022-01-20"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-20", "%Y-%m-%d").date())
    
    def test_unsuccessful_edit_date_from_future(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "date_founded": "2023-01-20"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
    
    def test_successful_edit_multiple_1(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "date_founded": "2022-01-20",
            "email": "bloom2@bloom.com"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom2@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-20", "%Y-%m-%d").date())
        
    def test_successful_edit_multiple_2(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "date_founded": "2022-01-20",
            "email": "bloom2@bloom.com",
            "name" :"Bloom Inc"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom Inc")
        self.assertEquals(bloom.email, "bloom2@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-20", "%Y-%m-%d").date())
        
    def test_successful_edit_all(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name":"Bloom LLC",
            "founders":"Ali, Abdullah, Anissha, Isra, Mohammed Ali",
            "description":"Bloom is a platform for start-ups and innovators",
            "date_founded": "2022-01-31",
            "num_employees":5,
            "industry":"TR",
            "email":"bloom2@bloom.com"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom LLC")
        self.assertEquals(bloom.email, "bloom2@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups and innovators")
        self.assertEquals(bloom.founders, "Ali, Abdullah, Anissha, Isra, Mohammed Ali")
        self.assertEquals(bloom.industry, "TR")
        self.assertEquals(bloom.num_employees, 5)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-31", "%Y-%m-%d").date())

        
    def test_unsuccessful_email_already_exists(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "email" : "re@re.com",
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())
    
    def test_unsuccessful_incorrect_account(self):
        

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "email" : "new@new.com",
        }
        id = self.b3.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "TestBusiness")
        self.assertEquals(bloom.email, "test@test.com")
        self.assertEquals(bloom.description, "This is a test startup")
        self.assertEquals(bloom.founders, "team500")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 10)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-20", "%Y-%m-%d").date())
    
    def test_unsuccessful_not_authorized(self):
        
        objToSend = {
            "email" : "new@new.com",
        }
        id = self.b3.pk
        url = f"http://127.0.0.1:8000/startups/{id}/"

        response = self.client.put(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        bloom = Business.objects.get(pk=id)
        self.assertEquals(bloom.name, "TestBusiness")
        self.assertEquals(bloom.email, "test@test.com")
        self.assertEquals(bloom.description, "This is a test startup")
        self.assertEquals(bloom.founders, "team500")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 10)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-01-20", "%Y-%m-%d").date())

        
class BusinessPosyTests(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')
        Token.objects.create(user=self.user)
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
        
        Business.objects.create(
            user=self.user,
            name="Recycle",
            founders="team50",
            description="Recycle is a platform for recycling",
            date_founded= datetime.strptime("2022-02-25", "%Y-%m-%d"),
            num_employees=6,
            industry="SR",
            email="re@re.com"
        )

        
    
    def test_successful_registration(self):    
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : "2022-02-20",
            "num_employees" :6,
            "industry": "SR",
            "email" : "bloom2@bloom.com"
        }
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.post(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(email="bloom@bloom.com")
        self.assertEquals(bloom.name, "Bloom")
        self.assertEquals(bloom.email, "bloom@bloom.com")
        self.assertEquals(bloom.description, "Bloom is a platform for start-ups")
        self.assertEquals(bloom.founders, "team50")
        self.assertEquals(bloom.industry, "SR")
        self.assertEquals(bloom.num_employees, 6)
        self.assertEquals(bloom.date_founded, datetime.strptime("2022-02-20", "%Y-%m-%d").date())

    def test_unsuccessful_reg_email_already_exists(self):    
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : datetime.strptime("2022-02-20", "%Y-%m-%d"),
            "num_employees" :6,
            "industry": "SR",
            "email" : "re@re.com",
        }
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.post(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        #How do I assert that no business object was created
    
    def test_unsuccessful_reg_negative_num_employees(self):    
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : datetime.strptime("2022-02-20", "%Y-%m-%d"),
            "num_employees" : -6,
            "industry": "SR",
            "email" : "re@re.com",
        }
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.post(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        #How do I assert that no business object was created

    def test_unsuccessful_reg_negative_num_employees(self):    
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : datetime.strptime("2022-02-20", "%Y-%m-%d"),
            "num_employees" : -6,
            "industry": "SR",
            "email" : "re@re.com",
        }
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.post(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    #Not sure how useful this test is since it is already checked by,existing email test
    def test_unsuccessful_business_already_exists(self):    
        
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Recycle",
            "founders" : "team50",
            "description" : "Recycle is a platform for recycling",
            "date_founded" : datetime.strptime("2022-02-25", "%Y-%m-%d"),
            "num_employees" : 6,
            "industry" : "SR",
            "email" : "re@re.com"
        }
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.post(url, objToSend, format="json")

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)