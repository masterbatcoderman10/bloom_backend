from django.contrib import admin
from django.urls import path
from django.urls import  include
from dashboard.views import vendor_profile_view
from . import views


urlpatterns = [
    path('connectedbusinesses/', vendor_profile_view, name="profile_view"),
]
