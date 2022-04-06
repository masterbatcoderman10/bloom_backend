from pyexpat import features
from sre_constants import CATEGORY
from unicodedata import category
from django.db import models

# Create your models here.
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

class Vendor(models.Model):

    name = models.CharField(max_length=50, blank=False)
    description = models.TextField(blank=False)
    pricing = models.TextField(max_length=12, blank=True)
    category = models.OneToOneField(Category,on_delete=models.CASCADE, blank=False)
    logo = models.ImageField(null=True)
    main_link = models.TextField(blank=False)
    account_link = models.TextField(blank=False)
    features = models.TextField(blank=True)