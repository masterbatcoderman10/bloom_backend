from html5lib import serialize
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


class DashboardConfirmView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, startupID):

        data = {}

        try: 
            business = Business.objects.get(pk=startupID)
        except Business.DoesNotExist:

            data["message"] = "Business does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)
        
        
        Dashboard.objects.get_or_create(startup_id=startupID)
        dashboard = Dashboard.objects.get(startup_id=startupID)
        
        serializer = DashboardSerializer(dashboard)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class MembersListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, dashID):

        data = {}

        #Using dashboard id to get business id, to check whether the user is authorized
        d = Dashboard.objects.get(id= dashID)
        b = Business.objects.get(id=d.startup_id)

        if request.user != b.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)

        

        members = Membership.objects.filter(dashboard_id = dashID)

        vendor_ids = []

        for member in members:
            vendor_ids.append(member.vendor_id)
        
        print(vendor_ids)

        vendors = Vendor.objects.filter(id__in=vendor_ids)

        serializer = VendorSerializer(vendors, many=True)

        return Response(serializer.data, status.HTTP_200_OK)
       
    