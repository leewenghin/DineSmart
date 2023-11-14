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
    list_display = ("id", "name", "description", "price", "image", "get_tag", "published", "foodcategory_id")

    def get_tag(self, obj):
        return ", ".join([tag.name for tag in obj.tag.all()])

    get_tag.short_description = "tag"
    
# Register model
admin.site.register(FoodItems, FoodItemsAdmin)

class OrderTablesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "image", "published","status")
    
admin.site.register(OrderTables, OrderTablesAdmin)

class FoodTagsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name")
    
admin.site.register(FoodTags, FoodTagsAdmin)

class VariantGroupsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name")
    
admin.site.register(VariantGroups, VariantGroupsAdmin)

class VariantValuesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "get_title","name")

    def get_title(self, obj):
        return ", ".join([title.name for title in obj.title.all()])

    get_title.short_description = "title"
    
admin.site.register(VariantValues, VariantValuesAdmin)
