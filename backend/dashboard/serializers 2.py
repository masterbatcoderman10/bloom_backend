from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import Vendors

#Serializer: Takes data that exists on the server and serializers and outputs into a format that can be read by other technologies
#On the server side: when data is sent to the server it packages it up so that it can be rewad by the data models

class BusinessSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Vendors
        fields = [
            'id',
            'name',
            'description',
            'price',
            'sector',
            'logo',
        ]