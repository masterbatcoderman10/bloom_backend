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

class PostGetTests(APITestCase):

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

        self.b2 = Business.objects.create(
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
            name= "TestBusiness",
            founders="testers",
            description="This is a test business",
            date_founded=datetime.strptime("2022-02-25", "%Y-%m-%d"),
            num_employees=5,
            industry="SR",
            email="tester@testre.com"
        )
    
    def test_post_then_get(self):
        
        #First add a new business
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : "2022-02-20",
            "num_employees" :6,
            "industry": "SR",
            "email" : "bloom2@bloom.com"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/"
        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 2)
        response = self.client.post(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        #test that the number of businesses in the db for the user has increased by one.
        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 3)

        #Test getting the business after posting
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(len(response.json()), 3)

    
    def test_get_then_post_then_get_again(self):

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])

        #Getting the currcnt number of initial businesses
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(len(response.json()), 2)

        #Testing the addition of businesses
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : "2022-02-20",
            "num_employees" :6,
            "industry": "SR",
            "email" : "bloom2@bloom.com"
        }
        id = self.b1.pk
        url = f"http://127.0.0.1:8000/startups/"
        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 2)
        response = self.client.post(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        bloom = Business.objects.get(pk=id)
        #test that the number of businesses in the db for the user has increased by one.
        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 3)

        #Test getting the business after posting
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(len(response.json()), 3)


class DeleteGetTests(APITestCase):

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

        self.b2 = Business.objects.create(
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
            name= "TestBusiness",
            founders="testers",
            description="This is a test business",
            date_founded=datetime.strptime("2022-02-25", "%Y-%m-%d"),
            num_employees=5,
            industry="SR",
            email="tester@testre.com"
        )


    def test_get_then_delete(self):


        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])

        #Getting the currcnt number of initial businesses
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

                    
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
                    
        self.assertEquals(len(response.json()), 2)

        #Deleting the business using id retrieved from get
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        id = response.json()[0]["id"]

        url = f"http://127.0.0.1:8000/startups/{id}/"

        self.client.delete(url, format="json")

        businesses = Business.objects.filter(user=self.user)

        self.assertEquals(len(businesses), 1)

    def test_get_then_delete_then_get(self):

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])

        #Getting the currcnt number of initial businesses
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

                    
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
                    
        self.assertEquals(len(response.json()), 2)

        #Deleting one business
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        id = response.json()[0]["id"]

        url = f"http://127.0.0.1:8000/startups/{id}/"

        self.client.delete(url, format="json")


        #Get to see if business is deleted
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

                    
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
                    
        self.assertEquals(len(response.json()), 1)
    
    def test_getting_deleted_business_fails(self):

        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])

        #Getting the currcnt number of initial businesses
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

                    
        url = f"http://127.0.0.1:8000/startups/"

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
                    
        self.assertEquals(len(response.json()), 2)

        #Deleting one business
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        id = response.json()[0]["id"]

        url = f"http://127.0.0.1:8000/startups/{id}/"

        self.client.delete(url, format="json")

        #Trying to get specific deleted business
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        response = self.client.get(url)

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response.json()["message"], "Business does not exist")


class PostDeleteTest(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')
        Token.objects.create(user=self.user)

    def test_post_then_delete(self):
        
        #First add a new business
        token = Token.objects.get_or_create(user=self.user)
        token2 = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)
        objToSend = {
            "name" : "Bloom Inc",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : "2022-02-20",
            "num_employees" :6,
            "industry": "SR",
            "email" : "bloom2@bloom.com"
        }
        
        url = f"http://127.0.0.1:8000/startups/"
        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 0)
        response = self.client.post(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)

        id = response.json()["id"]

        url = f"http://127.0.0.1:8000/startups/{id}/"

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        response = self.client.delete(url)

        all_businesses = Business.objects.filter(user=self.user)
        self.assertEquals(len(all_businesses), 0)


    
class PutGetTest(APITestCase):

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

        self.b2 = Business.objects.create(
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
            name= "TestBusiness",
            founders="testers",
            description="This is a test business",
            date_founded=datetime.strptime("2022-02-25", "%Y-%m-%d"),
            num_employees=5,
            industry="SR",
            email="tester@testre.com"
        )
    
    def test_get_then_put_then_get_again(self):

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

        #Editting business details
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
        
        url = f"http://127.0.0.1:8000/startups/{id}/"
        response = self.client.put(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)

        #Getting to see if edits were made
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token2)

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(response.json()["name"], "Bloom LLC")
        self.assertEquals(response.json()["email"], "bloom2@bloom.com")
        self.assertEquals(response.json()["description"], "Bloom is a platform for start-ups and innovators")
        self.assertEquals(response.json()["founders"], "Ali, Abdullah, Anissha, Isra, Mohammed Ali")
        self.assertEquals(response.json()["industry"], "TR")
        self.assertEquals(response.json()["num_employees"], 5)
        self.assertEquals(response.json()["date_founded"], "2022-01-31")

    




    


        






        













