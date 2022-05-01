from django import views
from django.urls import path
from . import views


urlpatterns = [
    path("<str:cat>/vendors/", view=views.VendorListView.as_view()),
    path("<int:vendorid>/details/", view=views.VendorDetailView.as_view()),
    path("allVendors/", view=views.VendorList.as_view()),
    path("categories/", view=views.CategoryListView.as_view())

]