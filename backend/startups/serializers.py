from attr import field
from rest_framework import serializers
from .models import Business

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = (
            'id', 
            'user', 
            'name', 
            'founders', 
            'date_founded', 
            'description',
            'email',
            'num_employees',
            'logo',
            'industry')