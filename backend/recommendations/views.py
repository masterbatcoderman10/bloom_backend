import re
from django.shortcuts import render
from html5lib import serialize
from joblib import load
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
from rest_framework import permissions
from marketplace.models import Vendor
from marketplace.serializers import VendorSerializer
from startups.models import Business
import pandas as pd

#Auxiliary Functions

#For data fetching
def forward(name):

    if name == "AVG":
        return "AVG Antivirus Business Edition"
    elif name == "G-Suite":
        return "Google Workspace"
    elif name == "Netsuite":
        return "NetSuite"
    elif name == "MailChimp":
        return "Mailchimp"
    elif name == "MS BI":
        return "Microsoft Power BI"
    elif name == "Qualtrics":
        return "Qualtrics CoreXM"
    else:
        return name

#For predictions
def backward(name):

    if name == "AVG Antivirus Business Edition":
        return "AVG"
    elif name == "NetSuite":
        return "Netsuite"
    elif name == "Mailchimp":
        return "MailChimp"
    elif name == "Microsoft Power BI":
        return "MS BI"
    elif name == "Qualtrics CoreXM":
        return "Qualtrics"
    else:
        return name

#Determines which AI model to use
def modelChecker(catName):

    c = catName.lower()
    return f"recommendations/ai_models/{c}_model.sav"

#Loads the ai model
def load_model(filename):

    m = load(filename)
    return m

#Creates a single pandas df row to be used in a prediction
def create_row(l_names, v_name, data):
    
    r_dict = {
        "employees_num" : data[0],
        "time_of_use": data[1],        
    }

    for n in l_names:
        if n == v_name:
            
            r_dict[n] = 1
        else:
            r_dict[n] = 0
    
    df = pd.DataFrame(r_dict, index=[0])

    return df

def employee_to_code(val):

    e = ""
    if 2 <= val <= 10:
        e = e + "2-10"
    elif 11 <= val <= 50:
        e = e + "11-50"
    elif 51 <= val <= 200:
        e = e + "51-200"
    elif 201 <= val <= 500:
        e = e + "201-500"
    elif 501 <= val <= 1000:
        e = e + "501-1,000"
    elif 1001 <= val <= 5000:
        e = e + "1,001-5,000"
    elif 5001 <= val <= 10000:
        e = e + "5,001-10,000"
    else:
        e = e + "10,000+"
    
    #Conversion dictionary
    c_dict = {
        "2-10" : 3,
        "11-50": 2,
        "51-200": 7,
        "201-500": 4,
        "501-1,000": 6,
        "1,001-5,000": 0,
        "5,001-10,000": 5,
        "10,000+": 1
    }

    return c_dict[e]

def duration_to_code(d):

    c_dict = {
        "Free Trial" : 4,
        "1-5 months": 1,
        "6-12 months": 3,
        "1+ year": 0,
        "2+ years": 2
    }

    return c_dict[d]

def predict_value(vendor_names, employee_range, duration, category):

    new_vendor_names = [forward(v) for v in vendor_names]
   
    e_code = employee_to_code(employee_range)

    data_to_send = [e_code, duration_to_code(duration)]

    model_file = modelChecker(category)
    model = load_model(model_file)

    s = {}

    for vendor in new_vendor_names:
        
        row = create_row(new_vendor_names, vendor, data_to_send)
        print("making prediction")
        s[backward(vendor)] = model.predict(row)[0]
    
    k = dict(sorted(s.items(),key=lambda x:x[1],reverse = True))
    
    return k
        
        




# Create your views here.
class RecommendationView(APIView):

    def get(self, request, stID, catName, option):

        data = {}

        try: 
            business = Business.objects.get(pk=stID)
        except Business.DoesNotExist:

            data["message"] = "Business does not exist"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        if request.user != business.user:
            data["message"] = "Not authorized"
            return Response(data, status.HTTP_401_UNAUTHORIZED)

        vs = Vendor.objects.filter(category=catName)

        v_names = []
        e_num = employee_to_code(business.num_employees)

        for v in vs:
            v_names.append(v.name)


        try:
        
            predictions = predict_value(v_names, e_num, option, catName)
        
        except KeyError:
            data["message"] = "Invalid option value"
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        n_to_take = 2
        predicted_vendors = []
        start = 0

        
        for key in predictions:
            predicted_vendors.append(key)
            start += 1

            if start == 2:
                break
            print(start)
        
        vendors_to_return = Vendor.objects.filter(name__in=predicted_vendors)
        serializer = VendorSerializer(vendors_to_return, many=True)

        return Response(serializer.data, status.HTTP_200_OK)



