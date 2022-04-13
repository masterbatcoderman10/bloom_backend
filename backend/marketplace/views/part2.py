from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework import permissions
from marketplace.models import Category
from marketplace.serializers import CategorySerializer

class CategoryListView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request):

        data = {}
            
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
        