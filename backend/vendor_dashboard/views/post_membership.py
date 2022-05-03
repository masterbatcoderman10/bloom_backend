from html5lib import serialize
from numpy import delete
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from marketplace.models import Vendor
from marketplace.serializers import VendorSerializer
from ..serializers import DashboardSerializer
from ..serializers import MembershipSerlializer
from ..models import Dashboard
from ..models import Membership
from startups.models import Business

class MemberDetailView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupID, vendorID):

        data = {}

        try: 
            business = Business.objects.get(pk=startupID)
        except Business.DoesNotExist:

            data["message"] = "Business does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)

        try:
            Vendor.objects.get(pk=vendorID)
        except:
            Vendor.DoesNotExist
            data["message"] = "This vendor does not exist"
            return Response(data, status.HTTP_404_NOT_FOUND)

        Dashboard.objects.get_or_create(startup_id=startupID)
        dashboard = Dashboard.objects.get(startup_id=startupID)

        Membership.objects.get_or_create(dashboard_id=dashboard.id, vendor_id=vendorID)
        data["messages"] = "membership created"

        return Response(data, status.HTTP_200_OK)
    
    def delete(self, request, startupID, vendorID):

        data = {}

        try: 
            business = Business.objects.get(pk=startupID)
        except Business.DoesNotExist:

            data["message"] = "Business does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)

        try:
            Vendor.objects.get(pk=vendorID)
        except:
            Vendor.DoesNotExist
            data["message"] = "This vendor does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        Dashboard.objects.get_or_create(startup_id=startupID)
        dashboard = Dashboard.objects.get(startup_id=startupID)

        Membership.objects.get(dashboard_id=dashboard.id, vendor_id=vendorID).delete()
        data["messages"] = "membership deleted"

        return Response(data, status.HTTP_200_OK)

        