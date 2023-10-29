from django.http import JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework import status

class FoodMenusView(viewsets.ModelViewSet):
    serializer_class = FoodMenusSerializer
    queryset = FoodMenus.objects.all()

    def get_queryset(self):
        queryset = FoodMenus.objects.all()  # Make a copy of the initial queryset

        id = self.request.query_params.get('id')
        if id is not None:
            queryset = queryset.filter(id=id)  # Apply the filter
        return queryset  # Return the filtered or unfiltered queryset

class FoodCategoriesView(viewsets.ModelViewSet): # ModelViewSet provide CRUD operations for a django model
    serializer_class = FoodCategoriesSerializer # Serializers are use to convert complex data type (E.g django model)
    queryset = FoodCategories.objects.all() # Include all FoodCategories instances
    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = FoodCategories.objects.all()

        id = self.request.query_params.get('id') # Endpoint
        foodmenu_id = self.request.query_params.get('foodmenu_id') # Endpoint

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu_id'
            
        if foodmenu_id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(foodmenu_id=foodmenu_id) # Only filter instances inside FoodCategories with 'foodmenu_id'
        return queryset


    def create(self, request, *args, **kwargs):
        if request.method == 'POST':
            name = request.data['name']
            description = request.data['description']
            published = request.data['published']
            image = request.data['image']
            foodmenu_id = request.data['foodmenu_id']
            
            if published.lower() == 'true':
                published = True
            elif published.lower() == 'false':
                published = False

            if not name:
                return Response({"name": ["Name field must not be empty."]}, status=status.HTTP_400_BAD_REQUEST)

            if image is None or image == "":
                image = None  # Set it to 'null' in the database

            category = FoodCategories.objects.create(
                name=name, 
                description=description, 
                published=published, 
                image=image, 
                foodmenu_id = foodmenu_id
                )

            serializer = FoodCategoriesSerializer(category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # data = request.data
        # # Extract foodmenu_id from data
        # foodmenu_id = data.get('foodmenu_id') # Retrives foodmenu_id value from the data
        # image = data.get('image') # Handle image file upload
        
        # if image:
        #     # You can handle the uploaded image here
        #     # For example, you can save it to a specific directory
        #     category = FoodCategories.objects.create(
        #         name=data['name'],
        #         description=data['description'],
        #         image=image,  # Assign the image file to the model field
        #         published=data['published'],
        #         foodmenu_id=foodmenu_id
        #     )
        # else:
        #     # Handle cases where no image is provided
        #     category = FoodCategories.objects.create(
        #         name=data['name'],
        #         description=data['description'],
        #         published=data['published'],
        #         foodmenu_id=foodmenu_id
        #     )
        
        # # Serialize and return the new instance in the response
        # serializer = FoodCategoriesSerializer(category)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

        

class FoodItemsView(viewsets.ModelViewSet):
    serializer_class = FoodItemsSerializer
    queryset = FoodItems.objects.all()


# @api_view(['GET', 'POST'])
# def drink_list(request, format=None):

#     #get all the drinks
#     #serialize them
#     #return json


#     if request.method == 'GET':
#         drinks = Drink.objects.all()
#         serializer = DrinkSerializer(drinks, many=True)
#         return render(request, '/frontend/src/pages/admin/admin_item.tsx'), {
#         'Name': drinks
#     }
#         # return Response(serializer.data)
#         # return Response({"drinks": serializer.data})

#     if request.method == 'POST':
#         serializer = DrinkSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        
# @api_view(['GET', 'PUT', 'DELETE'])
# def drink_detail(request, id, format=None):

#     try:
#         drink = Drink.objects.get(pk=id)
#     except Drink.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = DrinkSerializer(drink)
#         return Response(serializer.data)
    
#         DrinkSerializer
#     elif request.method == 'PUT':
#         serializer = DrinkSerializer(drink, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         drink.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)