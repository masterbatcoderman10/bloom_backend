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


class SystemTest(APITestCase):

    def test_full_system_test(self):

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

        #Getting list of businesses - should be 0 since it's a new account
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
        url = f"http://127.0.0.1:8000/startups/"
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(len(response.json()), 0)

        #First add a new business
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
        objToSend = {
            "name" : "Bloom",
            "founders" : "team50",
            "description" : "Bloom is a platform for start-ups",
            "date_founded" : "2022-02-20",
            "num_employees" :6,
            "industry": "SR",
            "email" : "bloom@bloom.com"
        }
        
        url = f"http://127.0.0.1:8000/startups/"
        
        response = self.client.post(url, objToSend, format="json")
        self.assertEquals(response.status_code, status.HTTP_200_OK)
      
        

        #Test getting the business after posting
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
        url = f"http://127.0.0.1:8000/startups/"
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(len(response.json()), 1)

        #Test getting the specific business to see if the details are correct

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)

        id = response.json()[0]["id"]
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


        #Editting the business 
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
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

        #Viewing the changes
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)

        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEquals(response.json()["name"], "Bloom LLC")
        self.assertEquals(response.json()["email"], "bloom2@bloom.com")
        self.assertEquals(response.json()["description"], "Bloom is a platform for start-ups and innovators")
        self.assertEquals(response.json()["founders"], "Ali, Abdullah, Anissha, Isra, Mohammed Ali")
        self.assertEquals(response.json()["industry"], "TR")
        self.assertEquals(response.json()["num_employees"], 5)
        self.assertEquals(response.json()["date_founded"], "2022-02-20")


        
        
        #Deleting the business
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
        id = response.json()[0]["id"]

        url = f"http://127.0.0.1:8000/startups/{id}/"

        self.client.delete(url, format="json")

        #Trying to get deleted business
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_token_log)
        response = self.client.get(url)

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response.json()["message"], "Business does not exist")
