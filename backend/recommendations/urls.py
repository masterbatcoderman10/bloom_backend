
from django.urls import path
from . import views

urlpatterns = [
    
    path("<int:stID>/<str:catName>/<int:option>/generateRecommendations", view=views.RecommendationView.as_view())
]
