from django.contrib import admin
from .models import *

class FoodMenusAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "published")
    
# Register model
admin.site.register(FoodMenus, FoodMenusAdmin)

class FoodCategoriesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "image", "published", "foodmenu_id")
    
# Register model
admin.site.register(FoodCategories, FoodCategoriesAdmin)

class FoodItemsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "price", "image", "tag", "foodcategory_id")
    
# Register model
admin.site.register(FoodItems, FoodItemsAdmin)