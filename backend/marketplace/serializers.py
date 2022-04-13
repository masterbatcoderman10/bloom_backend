from dataclasses import fields
from rest_framework import serializers
from .models import Vendor
from .models import Category

class VendorSerializer(serializers.ModelSerializer):

    logo = serializers.ImageField(required=True)
    class Meta:
        model = Vendor
        fields = (
            'id', 
            'name',
            'description',
            'pricing',
            'category',
            'logo',
            'screen_image',
            'main_link',
            'account_link',
            'features',
            'rating',
            'descriptor'
        )


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'category',
            'description',
            'background'
        )