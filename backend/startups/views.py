from turtle import st
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions

from startups.models import Business
from startups.serializers import BusinessSerializer

# Create your views here.
class BusinessListView(APIView):
    #anyone should be permitted to login
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        pass

    def post(self, request):

        data = {}
        
        serializer = BusinessSerializer(data=request.data)

        #Check to see if all required fields are received from the client
        try:
            req_name = request.data["name"]
            req_founders = request.data["founders"]
            req_description = request.data["description"]
            req_email = request.data["email"]
            req_num_employees = request.data["num_employees"]
            req_industry = request.data["industry"]

        except KeyError:
            data["message"] = "missing field"

            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        #Check if business name already exists in our database
        try:
            Business.objects.get(email=req_email)
            data["message"] = "Business email already exists"

            return Response(data, status.HTTP_400_BAD_REQUEST)
        except Business.DoesNotExist:
            print('Everything is valid')
        #Check if email exists (Note: Can one user register multiple businesses?)
            #If Yes, then this try statement should be removed
        # except Business.DoesNotExist:
        #     try:
        #         Business.objects.get(req_email)
        #         data["message"] = "email already exists"
        #         return Response(data, status.HTTP_400_BAD_REQUEST)
        #     except Business.DoesNotExist:
        #         try:
        #             Business.objects.get(req_description)
        #             data["message"] = "No description provided"
        #             return Response(data, status.HTTP_400_BAD_REQUEST)
        #         except Business.DoesNotExist:
        #             try:
        #                 Business.objects.get(req_industry)
        #                 data["message"] = "No industry provided"
        #                 return Response(data, status.HTTP_400_BAD_REQUEST)
        #             except Business.DoesNotExist:
        #                 print('all good')


        #Checking if the data sent is valid
        if serializer.is_valid():
            #Code that follows valid registration.
            new_business = serializer.save(user=request.user)
            data["message"] = "registration successful"
            #Sending a new token after successful registration
            data["new_business"] = new_business
            
            return Response(data, status.HTTP_200_OK)
        
        else:

            data["message"] = "some other detail is incorrect - either the email, or the username"
            return Response(data, status.HTTP_400_BAD_REQUEST)


class BusinessDetailView(APIView):

    permissions = [permissions.IsAuthenticated]

    #Function to handle sending data about one selected business to the user, the pk argument stands for primary key
    def get(self, request, pk):

        pass

    #Function to handle modifying data about one selected business to the user, the pk argument stands for primary key
    def put(self, request, pk):

        pass
    
    #Function to delete a selected business, the pk argument stands for primary key.
    def delete(self, request, pk):

        pass