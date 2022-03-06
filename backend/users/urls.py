from django.contrib import admin
from django.urls import path
from django.urls import  include
from . import views

urlpatterns = [
    path('login/', view=views.LoginView.as_view()),
    path('register/', view=views.RegistrationView.as_view())
]
