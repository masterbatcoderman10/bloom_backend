

from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from django.contrib.auth.hashers import check_password

# Create your views here.
# This is the API endpoint for the login functionality


class LoginView(APIView):

    #anyone should be permitted to login
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        #This is the data json object that will be passed to the user
        data = {}
        #Test to see if email has been received
        try:
            #If email has been received then match with database
            try:
                user_to_match = User.objects.get(email=request.data["email"])
            #If email doesn't exist then report error
            except User.DoesNotExist:
                data["message"] = "this email does not exist"
                return Response(data, status.HTTP_400_BAD_REQUEST)
        except KeyError:
            #If email hasn't been received then send error message.
            data["message"] = "email not received"
            return Response(data, status.HTTP_400_BAD_REQUEST)
            
        #Check is password has been received
        try:
            #Compare password hash
            if check_password(request.data["password"], user_to_match.password):
                data["message"] = "login successful"
                #Generate unique token or fetch token from database
                token = Token.objects.get_or_create(user=user_to_match)[0].key
                data["token"] = token
                
                return Response(data, status=status.HTTP_200_OK)
            else:
                data["message"] = "login failed - incorrect password"

                return Response(data, status=status.HTTP_400_BAD_REQUEST)
        #catching no password sent.
        except KeyError:

            data["message"] = "password not received"

            return Response(data, status=status.HTTP_400_BAD_REQUEST)


#This view will handle user registration.
class RegistrationView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        data = {}
        
        serializer = UserSerializer(data=request.data)

        #Check to see if all required fields are received from the client
        try:
            req_email = request.data["email"]
            req_username = request.data["username"]
            req_password = request.data["password"]
        except KeyError:
            data["message"] = "missing field"

            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        #Check if username exists
        try:
            User.objects.get(username=req_username)

            data["message"] = "username already exists"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        #Check if email exists
        except User.DoesNotExist:
            try:
                User.objects.get(email=req_email)

                data["message"] = "email already exists"
                return Response(data, status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                print('all good')


        #Checking if the data sent is valid
        if serializer.is_valid():
            #Code that follows valid registration.
            account = serializer.save()
            token = Token.objects.get_or_create(user=account)[0].key
            data["message"] = "registration successful"
            #Sending a new token after successful registration
            data["token"] = token
            
            return Response(data, status.HTTP_200_OK)
        
        #If the data isn't valid, is it for short password.
        elif len(req_password) < 8:

            data["message"] = "password too short"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        else:

            data["message"] = "some other detail is incorrect - either the email, or the username"
            return Response(data, status.HTTP_400_BAD_REQUEST)

        
       
