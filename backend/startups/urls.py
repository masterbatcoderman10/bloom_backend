from django.contrib import admin
from django.urls import path
from django.urls import  include
from . import views

urlpatterns = [

    path('', view=views.BusinessListView.as_view()),
    path('<int:pk>/', view=views.BusinessDetailView.as_view())

]
