# This is the user serializer, 
# this serializer serves the purpose of converting between json data (or any other format)
# to python readable format for processing

from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    # I've left these fields commented because there is no need for them.
    # #This is the first name field, it's max length is 100 and it is a required field.
    # first_name = serializers.CharField(max_length=100, required=True)
    # #This is the last name field, it's max length is 100 and it is a required field.
    # last_name = serializers.CharField(max_length=100, required=True)
    # #This is the date of birth field, it's a required field.
    # dob = serializers.DateField(required=True)


    
    # #This is the email field, it's required and a check is done to see whether it's unique among users.
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    #This is the username field, it's required and a check is done to see whether it's unique among users.
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    #This is the password field, it's requied and should be atleast 8 characters long.
    password = serializers.CharField(min_length=8, required=True)


    #This is a create function it's used to create the user, this is only needed for a User model not others.
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], 
            validated_data['email'],
            validated_data['password'],
            # validated_data['first_name'],
            # validated_data['last_name'],
            # validated_data['dob'],
            )
        return user
    
    #Common syntaxt for serializers
    class Meta:
        model = User
        #these are the fields represented by the serializer
        fields = (
            'id', 
            'username', 
            'email', 
            'password', 
            # 'first_name', 
            # 'last_name', 
            # 'dob'
            )