from django.http import JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework import status
from decimal import Decimal
from my_django_app.models import FoodTags


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
        foodmenu_id = self.request.query_params.get('foodmenu_id') # Endpoint``

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu_id'
            
        if foodmenu_id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(foodmenu_id=foodmenu_id) # Only filter instances inside FoodCategories with 'foodmenu_id'
        return queryset


    def create(self, request, *args, **kwargs):
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
        

class FoodItemsView(viewsets.ModelViewSet):
    queryset = FoodItems.objects.all()
    serializer_class = FoodItemsSerializer

    def get_queryset(self):
        queryset = FoodItems.objects.all()  # Make a copy of the initial queryset

        id = self.request.query_params.get('id') # Endpoint
        foodcategory_id = self.request.query_params.get('foodcategory_id')

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu_id'
        
        if foodcategory_id is not None:
            queryset = queryset.filter(foodcategory_id=foodcategory_id)  # Apply the filter
        return queryset  # Return the filtered or unfiltered queryset

    def create(self, request, *args, **kwargs):
            name = request.data['name']
            price_str = request.data['price']
            description = request.data['description']
            tag_names = request.data.getlist("tag") 
            image = request.data['image']
            published = request.data['published']
            foodcategory_id = request.data['foodcategory_id']
            
            errors = {}
            print("tag_names:", tag_names)


            if published.lower() == 'true':
                published = True
            elif published.lower() == 'false':
                published = False

            if not name:
                errors["name"] = ["Name field must not be empty."]

            if price_str is None or price_str == "":
                errors["price"] = ["Price field must not be empty."]
            else:
                try:
                    price = Decimal(price_str)
                except ValueError:
                    errors["price"] = ["Invalid price format."]

            if errors:
                # If there are errors, return them in a single response
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)

            tags = FoodTags.objects.filter(id__in=tag_names)

            if image is None or image == "":
                image = None  # Set it to 'null' in the database


            item = FoodItems.objects.create(
                name=name, 
                price=price,
                description=description, 
                image=image, 
                published=published, 
                foodcategory_id = foodcategory_id,
                )

            item.tag.set(tags)

            print("tag_names:", tags)
            
            serializer = FoodItemsSerializer(item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            print("request.data:", request.data)

            if len(request.data) == 1 and 'published' in request.data:
                serializer.save()

            else:
                if 'tag' not in request.data:
                    instance.tag.clear()
                    print("Instance tag:", instance.tag)
                else:
                    serializer.save()

            

            return Response(serializer.data)
    

class OrderTablesView(viewsets.ModelViewSet):
    serializer_class = OrderTablesSerializer
    queryset = OrderTables.objects.all()

    def get_queryset(self):
        queryset = OrderTables.objects.all()  # Make a copy of the initial queryset

        id = self.request.query_params.get('id') # Endpoint

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu_id'
        return queryset  # Return the filtered or unfiltered queryset

    def create(self, request, *args, **kwargs):
        if request.method == 'POST':
            name = request.data['name']
            status = request.data['status']
            published = request.data.get('published', False) 
            
            # Check if published is a string representing a boolean
            if isinstance(published, str):
                if published.lower() == 'true':
                    published = True
                elif published.lower() == 'false':
                    published = False
                else:
                    return Response({"error": "'published' must be 'true' or 'false'."}, status=400)

            # Handle the case where 'published' is a boolean
            elif isinstance(published, bool):
                pass  # No conversion needed for booleans

            if not name:
                return Response({"name": ["URL field must not be empty."]}, status=status.HTTP_400_BAD_REQUEST)

            item = OrderTables.objects.create(
                name=name, 
                status=status, 
                published=published, 
                )

            serializer = OrderTablesSerializer(item)
            return Response(serializer.data, status=201)

class FoodTagsView(viewsets.ModelViewSet):
    serializer_class = FoodTagsSerializer
    queryset = FoodTags.objects.all()