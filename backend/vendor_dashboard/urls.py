from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('<int:startupID>/exists/', view=views.DashboardConfirmView.as_view()),
    path('<int:dashID>/members/', view=views.MembersListView.as_view()),
    path('<int:startupID>/<int:vendorID>/details/', view=views.MemberDetailView.as_view())
]
