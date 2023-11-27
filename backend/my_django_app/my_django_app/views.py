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
import socket   
from django.views import View


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
            serializer = self.get_serializer(data=request.data)

            image = request.data['image']
            if image == "":
                image = None

            if "tag" in request.data and request.data.getlist("tag") == []:
                food_item.tag.clear()


            # serializer = FoodItemsSerializer(data={
            #     'image': image,
            #     'name': request.data['name'],
            #     'price': request.data['price'],
            #     'tag': request.data.getlist('tag'),
            #     'description': request.data['description'],
            #     'published': request.data['published'],
            #     'foodcategory_id': request.data['foodcategory_id'],  # Use the converted integer value
            # })

            print("request.data:", request.data)      

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
                print("Request serializer:", serializer.data['tag'])
                
                return Response(serializer.errors, status=400)  # HTTP 400 Bad Request

            # Method 2 =========================================
            # name = request.data['name']
            # price_str = request.data['price']
            # description = request.data['description']
            # tag_names = request.data.getlist("tag") 
            # image = request.data['image']
            # published = request.data['published']
            # foodcategory_id = request.data['foodcategory_id']
            
            # errors = {}
            # print("tag_names:", tag_names)
            # print("Requested data: ", request.data)


            # if published.lower() == 'true':
            #     published = True
            # elif published.lower() == 'false':
            #     published = False

            # if not name:
            #     errors["name"] = ["Name field must not be empty."]

            # if price_str is None or price_str == "":
            #     errors["price"] = ["Price field must not be empty."]
            # else:
            #     try:
            #         price = Decimal(price_str)
            #     except ValueError:
            #         errors["price"] = ["Invalid price format."]

            # if errors:
            #     # If there are errors, return them in a single response
            #     return Response(errors, status=status.HTTP_400_BAD_REQUEST)

            # tags = FoodTags.objects.filter(id__in=tag_names)

            # if image is None or image == "":
            #     image = None  # Set it to 'null' in the database


            # item = FoodItems.objects.create(
            #     name=name, 
            #     price=price,
            #     description=description, 
            #     image=image, 
            #     published=published, 
            #     foodcategory_id = foodcategory_id,
            #     )

            # item.tag.set(tags)

            # print("tag_names:", tags)
            
            # serializer = FoodItemsSerializer(item)
            # return Response(serializer.data, status=status.HTTP_201_CREATED)

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
            return queryset.filter(id=id) # Only filter instances inside FoodCategories with 'foodmenu_id'
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


class LocalView(View):
    def get_local_ip(self):
        try:
            # Get the hostname
            hostname = socket.gethostname()
            # Get the local IP address using the hostname
            local_ip = socket.gethostbyname(hostname)
            return local_ip
        except Exception as e:
            return str(e)

    def get(self, request, *args, **kwargs):
        local_ip = self.get_local_ip()
        return JsonResponse({'local_ip': local_ip}) 


    # # Call the function and print the local IP
    # print(get_local_ip())

