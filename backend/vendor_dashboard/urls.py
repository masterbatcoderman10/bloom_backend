from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('<int:startupID>/isPresent/', view=views.DashboardConfirmView.as_view()),
    path('<int:dashID>/vendorList/', view=views.MembersListView.as_view())
]
