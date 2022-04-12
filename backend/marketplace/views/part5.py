from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from marketplace.models import Vendor
from marketplace.serializers import VendorSerializer

class VendorDetailView(APIView):

    permission_classes = [permissions.AllowAny]

    # Function to handle sending data about one selected business to the user, the pk argument stands for primary key
    def get(self, request, vendorid):
        data = {}

        try: 
            vendor = Vendor.objects.get(id=vendorid)
        except Vendor.DoesNotExist:

            data["message"] = "Vendor does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
            
        serializer = VendorSerializer(vendor)
        return Response(serializer.data, status.HTTP_200_OK)
