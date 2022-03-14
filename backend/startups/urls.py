from django.contrib import admin
from django.urls import path
from django.urls import  include
<<<<<<< HEAD

urlpatterns = [
=======
from . import views

urlpatterns = [

    path('', view=views.BusinessListView.as_view()),
    path('<int:pk>/', view=views.BusinessDetailView.as_view())
>>>>>>> 5452bc93792bde091a5a1be776b33cc4e0120005
    
]
