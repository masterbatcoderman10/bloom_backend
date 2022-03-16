from re import T
from django.db import models

# Create your models here.
 
class Sector(models.Model):
    sector_name = models.CharField(max_length=100)
    number_of_businesses = models.IntegerField
    

#This model is for the vendors that will be available on our site
#Put in the models.py file of startup section
class Vendors(models.Model):
    name = models.CharField(max_length=200, unique=True) #Name type in business table is varChar
    description = models.TextField()
    phone = models.CharField(max_length = 15)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    #This class just assigns the different budget categories a numeric value
    BUDGET_CHOICES = [
        ('B', 'Budget'),
        ('M', 'Medium'),
        ('H', 'High-end')]
    budget_category = models.CharField(max_length=1, choices=BUDGET_CHOICES, null=True)
    
    #This sector field is a one-to-many relationship with sectors, as in each sector can have many businesses but not the other way around
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    website = models.URLField()
    reviews = models.URLField()
    avg_review = models.IntegerField()
    logo = models.ImageField(null=True)
    slug = models.SlugField(blank=True, unique=True)
    #This entity is to monitor when the last time this element has been edited
    # last_update = models.DateTimeField(auto_now = True)

    # sector = models.ForeignKey(Sector, on_delete=models.RESTRICT)

        # class Meta:
        #     db_table = 'dashboard_businesses'
        #     indexes = [
        #         models.index(fields=[])
        #     ]



#This model is for the connected businesses that 