from re import U
from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

#This model is for the start-ups that sign up with us
class Business(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=False) #Name type in business table is varChar
    founders = models.TextField(max_length=200, blank=False)
    date_founded = models.DateField(null=True)
    description = models.TextField(blank=False)
    email = models.EmailField(unique=True)
    num_employees = models.IntegerField(default=1)
    
    logo = models.ImageField(null=True)
    INDUSTRY_CHOICES = [
        ('RE', 'Real Estate'),
         ('TR', 'Trading'),
         ('SR', 'Services'),
         ('TT', 'Travel and Tourism'),
         ('HS', 'Hospitality'),
         ('OT', 'Others')
    ]
    industry = models.CharField(max_length=2, choices=INDUSTRY_CHOICES, null=False)

