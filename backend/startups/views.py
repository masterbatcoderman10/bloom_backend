import datetime
from turtle import st
from django.http import QueryDict
from django.shortcuts import render
from html5lib import serialize
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from .permissions import IsOwner
from startups.models import Business
from startups.serializers import BusinessSerializer

# Create your views here.

def validate(date_text):
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
        print("Date is alright")
        return True
    except ValueError:
        print("Incorrect data format, should be YYYY-MM-DD")
        return False

def from_future(date_text):

    comp_date = datetime.datetime.strptime(date_text, '%Y-%m-%d')
    now = datetime.datetime.now()

    if comp_date > now:
        return True
    else:
        return False


class BusinessListView(APIView):
    # anyone should be permitted to login
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
        req_date_founded = request.data["date_founded"]
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
        #Checking if the number of employees is zero or less
        try:
            bus = Business.objects.get(num_employees=request.data["num_employees"])
            if bus <= 0:
                data["message"] = "Number of employees is invalid"
                return Response(data, status.HTTP_400_BAD_REQUEST)
            else:
                data["message"] = "Number of employees is valid"
                return Response(data, status=status.HTTP_200_OK)
        except Business.DoesNotExist:
                #Checking if thedate-founded is in the future
            try:
                bus = Business.objects.get(date_founded=request.data["date_founded"])
                if (validate(bus) and (from_future(bus)==False)):
                    data["message"] = "Date founded is in the future"
                    return Response(data, status.HTTP_400_BAD_REQUEST)
                else:
                    data["message"] = "Valid founded date"
                    return Response(data, status=status.HTTP_200_OK)
            except Business.DoesNotExist:
                print('Everything is valid')

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

    # Function to handle sending data about one selected business to the user, the pk argument stands for primary key
    def get(self, request, pk):
        data = {}
        business = Business.objects.get(pk=pk)
        
        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)
        serializer = BusinessSerializer(business)
        return Response(serializer.data, status.HTTP_200_OK)

    # Function to handle modifying data about one selected business to the user, the pk argument stands for primary key
    def put(self, request, pk):

        
        data = dict(request.data)
        
        #Selecting the business to modify
        try:
            business = Business.objects.get(pk=pk)
        except Business.DoesNotExist:
            # data["message"] = "business does not exist"
            # return Response(data, status.HTTP_400_BAD_REQUEST)
            pass

        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)
        #Check to see if number of employees provided is non-negative
        try:
            req_emp = request.data["num_employees"]

            if int(req_emp) < 0:
                data["message"] = "Employees can not be a negative number"
                return Response(data, status.HTTP_400_BAD_REQUEST)
        except KeyError:
            
            #Since the employees weren't set this means it's not intended to be modified
            #we don't want the program to set the default value to one so we retrieve it and 
            #change the request.data value
            req_emp = business.num_employees
            data["num_employees"] = req_emp

            

        #This is a check to see whether the required fields aren't present in the request,
        #this means the user does not wish to modify these fiels.
        #Django throws a required error for this behavior, to counter this, I am retrieving
        #the required fields from the seleted business since these will not be changed and,
        #then I'm adding these to the request.data dictionary
        try:
            req_founders = request.data["founders"]
        except KeyError:
            req_founders = business.founders
            data["founders"] = req_founders
        
        try:
            req_name = request.data["name"]
        except KeyError:
            req_name = business.name
            data["name"] = req_name
        
        try:
            req_email = request.data["email"]
            #check if email alredy exists
            try:
                Business.objects.get(email=req_email)
                data["message"] = "Business email already exists"

                return Response(data, status.HTTP_400_BAD_REQUEST)
            except Business.DoesNotExist:
                print("All good")

        except KeyError:
            req_email = business.email
            data["email"] = req_email

        try:
            req_description = request.data["description"]
        except KeyError:
            req_description = business.description
            data["description"] = req_description
        

        
        #checks on date
        try:
            req_date = request.data["date_founded"]
            
            date_correct = validate(req_date)
            #check to see if date is in correct format Y-m-d
            if not date_correct:
                data["message"] = "Date is in an invalid format"
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            
            #Check to see if date is from the future
            ff = from_future(req_date)
            if ff:
                data["message"] = "Date is from the future"
                return Response(data, status.HTTP_400_BAD_REQUEST)
        except KeyError:

            print("\n")

        #This loads the serializer with the selected business and the request data.
        #Note this looks different from the serializer for post since this function is
        #trying to modify an existing business.
        serializer = BusinessSerializer(business, data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            data["message"] = "Edit successful"
            return Response(data=data, status=status.HTTP_200_OK)
        
        print(serializer.errors)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


    # Function to delete a selected business, the pk argument stands for primary key.
    def delete(self, request, pk):

        pass
