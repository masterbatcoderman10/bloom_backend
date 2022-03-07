from django.db import models
<<<<<<< HEAD

#This model is for the start-ups that sign up with us
class Business(models.Model):
=======
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

#This model is for the start-ups that sign up with us
class Business(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
>>>>>>> startupFunctionality
    name = models.CharField(max_length=200) #Name type in business table is varChar
    founders = models.CharField(max_length=200)
    dateFounded = models.DateField(null=True)
    description = models.TextField()
    email = models.EmailField()
    num_Employees = models.IntegerField()
    slug = models.SlugField()
    logo = models.ImageField(null=True)
    INDUSTRY_CHOICES = [
        ('RE', 'Real Estate'),
         ('TR', 'Trading'),
         ('SR', 'Services'),
         ('TT', 'Travel and Tourism'),
         ('HS', 'Hospitality'),
         ('OT', 'Others')
    ]
<<<<<<< HEAD
    industry = models.CharField(max_length=2, choices=INDUSTRY_CHOICES, null=True)
    size = models.IntegerField()
=======
    industry = models.CharField(max_length=2, choices=INDUSTRY_CHOICES, null=False)

>>>>>>> startupFunctionality
