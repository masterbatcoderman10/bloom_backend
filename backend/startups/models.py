from django.db import models

# Create your models here.
#This model is for the start-ups that sign up with us
class Business(models.Model):
    name = models.CharField(max_length=200) #Name type in business table is varChar
    founders = models.CharField(max_length=200)
    dateFounded = models.DateField(required=False, null=True)
    description = models.TextField()
    email = models.EmailField()
    num_Employees = models.IntegerField()
    slug = models.SlugField()
    logo = models.ImageField(required=False, null=True)
    INDUSTRY_CHOICES = [
        ('RE', 'Real Estate'),
         ('TR', 'Trading'),
         ('SR', 'Services'),
         ('TT', 'Travel and Tourism'),
         ('HS', 'Hospitality'),
         ('OT', 'Others')
    ]
    industry = models.CharField(max_length=2, choices=INDUSTRY_CHOICES, null=True)
    size = models.IntegerField()
