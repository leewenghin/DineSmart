from rest_framework import serializers
from .models import *
# from .models import Item

class FoodMenusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodMenus
        fields = ['id', 'name', 'description', 'published']

class FoodCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategories
        fields = ['id', 'name', 'description', 'published', 'foodmenu_id']

class FoodItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItems
        fields = ['id', 'name', 'description', "price", "image", "tag", 'foodcategory_id']