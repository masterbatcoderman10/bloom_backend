from .models import Dashboard
from .models import Membership
from rest_framework import serializers

class DashboardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dashboard
        fields = ('id', 'startup_id')


class MembershipSerlializer(serializers.ModelSerializer):

    class Meta:
        model = Membership
        fields = ('id', 'dashboard_id', 'vendor_id')