from django import views
from django.urls import path
from . import views


urlpatterns = [
    path("<str:cat>/", view=views.VendorListView.as_view())
]