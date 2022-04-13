from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from ..models import Vendor
from ..serializers import VendorSerializer

class VendorList(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request):

        data = {}
        #get all vendors
        try:

            vendor = Vendor.objects.all()

            serializer = VendorSerializer(vendor, many=True)

            return Response(serializer.data, status.HTTP_200_OK)

        except Vendor.DoesNotExist:

            data ["message"] = "No Vendors Found"

            return Response(data, status.HTTP_400_BAD_REQUEST)