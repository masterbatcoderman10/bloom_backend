from django.db import models
from startups.models import Business
from marketplace.models import Vendor
# Create your models here.

class Dashboard(models.Model):

    startup = models.OneToOneField(
        Business,
        on_delete=models.CASCADE,
        primary_key=False
    )
    
class Membership(models.Model):

    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
