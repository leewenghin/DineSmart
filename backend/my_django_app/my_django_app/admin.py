from django.contrib import admin
from .models import *

class FoodMenusAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "published")
    
# Register model
admin.site.register(FoodMenus, FoodMenusAdmin)

class FoodCategoriesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "image", "published", "foodmenus")
    
# Register model
admin.site.register(FoodCategories, FoodCategoriesAdmin)

class FoodItemsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "description", "price", "image", "get_tag", "published", "foodcategory")

    def get_tag(self, obj):
        return ", ".join([tag.name for tag in obj.tag.all()])

    get_tag.short_description = "tag"
    
# Register model
admin.site.register(FoodItems, FoodItemsAdmin)

class OrderTablesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "image", "published","status", "link")
    
admin.site.register(OrderTables, OrderTablesAdmin)

class FoodTagsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name")
    
admin.site.register(FoodTags, FoodTagsAdmin)

class VariantGroupsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "name", "published")
    
admin.site.register(VariantGroups, VariantGroupsAdmin)

class VariantValuesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "title","name", "published")
    
admin.site.register(VariantValues, VariantValuesAdmin)

class VariantPricesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id', 'get_variants', 'fooditems', 'price', 'sku')

    def get_variants(self, obj):
        return ", ".join([str(variants.id) for variants in obj.variants.all()])

    get_variants.short_description = "variants"

admin.site.register(VariantPrices, VariantPricesAdmin)