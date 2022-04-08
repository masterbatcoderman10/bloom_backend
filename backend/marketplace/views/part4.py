from unicodedata import category
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from ..models import Vendor
from ..models import Category
from ..serializers import VendorSerializer


class VendorListView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request, cat):

        data = {}
        #filtering the vendors based on category
        try:
            category = Category.objects.get(category=cat)
            vendors = Vendor.objects.filter(category_id=category.id)
            serializer = VendorSerializer(vendors, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Vendor.DoesNotExist:

            data["message"] = "This category is incorrect"
            return Response(data, status.HTTP_400_BAD_REQUEST)