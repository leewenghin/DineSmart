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
        fields = ['id', 'name', 'description', 'image', 'published', 'foodmenus']
        image = serializers.FileField()  # Use FileField for file uploads

class FoodItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItems
        fields = ['id', 'name', 'description', "price", "image", "published", "tag", 'foodcategory']


class OrderTablesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderTables
        fields = ['id', 'name','status','image', 'published', "link"]

class FoodTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTags
        fields = ['id', 'name']

class VariantGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantGroups
        fields = ['id', 'name', 'published']

class VariantValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantValues
        fields = ['id', 'title', 'name', 'published']

class VariantPricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantPrices
        fields = ['id', 'variants', 'fooditems', 'price', 'sku']