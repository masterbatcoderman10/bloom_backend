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

       
    