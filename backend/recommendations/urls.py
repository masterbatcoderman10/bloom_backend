
from django.urls import path
from . import views

urlpatterns = [
    
    path("<int:stID>/<str:catName>/<str:option>/recommendations", view=views.RecommendationView.as_view())
]
