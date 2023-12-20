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
from django.views import View
import socket   
import subprocess
import re
import os
from django.conf import settings

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
        foodmenus = self.request.query_params.get('foodmenu_id') # Endpoint``

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu'
            
        if foodmenus is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(foodmenus=foodmenus) # Only filter instances inside FoodCategories with 'foodmenu'
        return queryset     

class FoodItemsView(viewsets.ModelViewSet):
    queryset = FoodItems.objects.all()
    serializer_class = FoodItemsSerializer

    def get_queryset(self):
        queryset = FoodItems.objects.all()  # Make a copy of the initial queryset

        id = self.request.query_params.get('id') # Endpoint
        foodcategory = self.request.query_params.get('foodcategory_id')

        if id is not None:
            # Filter records based on the menu_id parameter
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu'
        
        if foodcategory is not None:
            queryset = queryset.filter(foodcategory=foodcategory)  # Apply the filter
        return queryset  # Return the filtered or unfiltered queryset

    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)

            image = request.data['image']
            if image == "":
                image = None

            if "tag" in request.data and request.data.getlist("tag") == []:
                food_item.tag.clear()

            print("Before:", request.data)      

            if serializer.is_valid():
                # Save the new instance
                serializer.save()
                print("Request data success:", request.data)

                # Return a success response with the serialized instance
                return Response(serializer.data, status=201)  # HTTP 201 Created
            else:
                # Return an error response with validation errors
                print("Request data fail:", request.data)
                print("Request serializer:", serializer.data)
                print("Request tag serializer:", serializer.data['tag'])
                
                return Response(serializer.errors, status=400)  # HTTP 400 Bad Request

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
                serializer.save()
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
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu'
        return queryset  # Return the filtered or unfiltered queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # name = request.data['name']
        # status = request.data['status']
        # published = request.data.get('published', False) 
        if 'name' in request.data and not request.data['name'].isdigit():
            return Response({'error': 'Name must contain only digits.'}, status=status.HTTP_400_BAD_REQUEST)

        if 'status'in request.data == "":
            status = "table"            

        if serializer.is_valid():
            serializer.save()
            print("Request data success:", request.data)
            # Return a success response with the serialized instance
            return Response(serializer.data, status=201)  # HTTP 201 Created

        else:
            print("Request data fail:", request.data)
            print("Request serializer:", serializer.data)
            return Response(serializer.errors, status=400)   # HTTP 201 Created


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if instance.image:
            image_path = os.path.join(settings.MEDIA_ROOT, str(instance.image))
            if os.path.exists(image_path):
                os.remove(image_path)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else: 
            serializer.save(image=None, link=None)
        return Response(serializer.data)

class FoodTagsView(viewsets.ModelViewSet):
    serializer_class = FoodTagsSerializer
    queryset = FoodTags.objects.all()

class VariantGroupsView(viewsets.ModelViewSet):
    serializer_class = VariantGroupsSerializer
    queryset = VariantGroups.objects.all()

class VariantValuesView(viewsets.ModelViewSet):
    serializer_class = VariantValuesSerializer
    queryset = VariantValues.objects.all()
    def get_queryset(self):
        queryset = VariantValues.objects.all()  # Make a copy of the initial queryset

        title = self.request.query_params.get('title_id')

        if title is not None:
            queryset = queryset.filter(title=title)  # Apply the filter
        return queryset  # Return the filtered or unfiltered queryset

class VariantPricesView(viewsets.ModelViewSet):
    serializer_class = VariantPricesSerializer
    queryset = VariantPrices.objects.all()           

    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data, many=True) # Many for list of dictionaries instead of single

            if serializer.is_valid():
                # Save the new instance
                serializer.save()
                print("Request data success:", request.data)

                # Return a success response with the serialized instance
                return Response(serializer.data, status=201)  # HTTP 201 Created
            else:
                # Return an error response with validation errors
                print("Request data fail:", request.data)
                # print("Request serializer:", serializer.data)
                
                return Response(serializer.errors, status=400)

class LocalView(View):
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get_local_ip(self, request):
        try:
            # Run the ipconfig command and capture the output
            result = subprocess.check_output(['ipconfig'], universal_newlines=True)

            # Split the output into lines
            lines = result.split('\n')

            # Find the index of the line containing "Wireless LAN adapter Wi-Fi"
            start_index = next((i for i, line in enumerate(lines) if 'Wireless LAN adapter Wi-Fi' in line), None)

            if start_index is not None:
                # Find the index of the line containing "Subnet Mask"
                end_index = next((i for i, line in enumerate(lines[start_index:], start=start_index) if '   Subnet Mask' in line), None)

                if end_index is not None:
                    # Extract and print the lines between the specified indices
                    for line in lines[start_index + 1:end_index]:
                        print(line)
                    
                    # Display the line containing the IPv4 Address
                    ipv4_address_line = next((line for line in lines[start_index + 1:end_index] if 'IPv4 Address' in line), None)
                    if ipv4_address_line:
                        return ipv4_address_line.split(':')[-1].strip()
                    else:
                        print("IPv4 Address not found in the specified range.")
                else:
                    print("Subnet Mask not found after 'Wireless LAN adapter Wi-Fi'")
            else:
                print("'Wireless LAN adapter Wi-Fi' not found in the output")

        except subprocess.CalledProcessError as e:
            return f"Error running ipconfig: {e}"


    def get(self, request, *args, **kwargs):
        local_ip = self.get_local_ip(request)
        client_ip = self.get_client_ip(request)
        return JsonResponse({'client_ip':client_ip,'local_ip': local_ip})


    # # Call the function and print the local IP
    # print(get_local_ip())

