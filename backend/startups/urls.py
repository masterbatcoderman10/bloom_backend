from django.contrib import admin
from django.urls import path
from django.urls import  include


from . import views

urlpatterns = [

    path('businesses/', view=views.BusinessListView.as_view()),
    path('<int:pk>/details/', view=views.BusinessDetailView.as_view())
    
]
