from distutils.command.upload import upload
from pyexpat import features
from sre_constants import CATEGORY
from unicodedata import category
from django.db import models
from django.conf import settings

# Create your models here.
def upload_to(instance, filename):

    return f'images/{filename}'
class Category(models.Model):

    CATEGORY_CHOICES = [
        ("DM", "Digital Marketing"),
        ("MA", "Market Analysis"),
        ("TM", "Team Management"),
        ("FA", "Financial Analysis"),
        ("HR", "Human Resoucres"),
        ("CS", "Cyber Security"),
        ("BI", "Business Intelligence"),
        ("CLD", "Cloud Services")
    ]

    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    description = models.TextField(null=True)
    background = models.ImageField(null=True, upload_to=upload_to)

    def __str__(self):
        return self.category

class Vendor(models.Model):
    CATEGORY_CHOICES = [
        ("DM", "Digital Marketing"),
        ("MA", "Market Analysis"),
        ("TM", "Team Management"),
        ("FA", "Financial Analysis"),
        ("HR", "Human Resoucres"),
        ("CS", "Cyber Security"),
        ("BI", "Business Intelligence"),
        ("CLD", "Cloud Services")
    ]

    name = models.CharField(max_length=50, blank=False, unique=True)
    description = models.TextField(blank=False)
    pricing = models.CharField(max_length=12, blank=True)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    logo = models.ImageField(null=True, upload_to=upload_to)
    screen_image = models.ImageField(null=True, upload_to=upload_to)
    main_link = models.TextField(blank=False)
    account_link = models.TextField(blank=False)
    features = models.TextField(blank=True)
    rating = models.DecimalField(default=0, max_digits=2, decimal_places=1)
    descriptor = models.CharField(max_length=40, blank=False)
    alt_1 = models.TextField(default="Logo")
    alt_2 = models.TextField(default="Screen of App")


    def __str__(self):
        return self.name