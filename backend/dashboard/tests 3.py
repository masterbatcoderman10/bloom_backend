from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User



# Create your tests here.

class ModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='first@first.com', password='Pa$5word', username='firstUser')
