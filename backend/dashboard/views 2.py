from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from dashboard.models import Vendors
from dashboard.serializers import BusinessSerializer


# Create your views here.


def vendor_profile_view(request):

    try:
        vendor_profile = Vendors.objects.get()
    except Vendors.DoesNotExit:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = BusinessSerializer(vendor_profile)
    return Response(serializer.data)