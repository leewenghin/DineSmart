from django.db import models
from django.core.exceptions import ValidationError

# instance represent the file is attached to
# filename is the original name of the uploaded file
def upload_to(instance, filename): 
    if isinstance(instance, FoodCategories):
        subdirectory = 'category'
    elif isinstance(instance, FoodItems):
        subdirectory = 'item'
    else:
        subdirectory = 'unknown'

    return f'admin/{subdirectory}/{filename}'

class FoodMenus(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128, null=False, blank=False)
    description = models.CharField(max_length=255, null=True, blank=True)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Menus'

    def __str__(self):
        return self.name
        # return self.name + '\t' + self.description + ' ' + str(self.published)
        # return f"{self.name} {self.description} {self.foodmenu} {self.published}"


class FoodCategories(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False)
    description = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to=upload_to, null=True, blank=True)    
    published = models.BooleanField(default=False)
    foodmenu = models.ForeignKey(FoodMenus, on_delete=models.CASCADE)
    
    def clean(self):
        if not self.name:
            raise ValidationError("Name field must not be empty.")
            
    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
        # return self.name + ' ' + self.description + ' ' + str(self.foodmenu) + ' ' + str(self.published)

class FoodItems(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False)
    description = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='admin/item', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    tag = models.ManyToManyField('FoodTags')
    published = models.BooleanField(default=True)
    foodcategory = models.ForeignKey(FoodCategories, on_delete=models.CASCADE)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Items'

    def __str__(self):
        return self.name
        # return self.name + ' ' + self.description + ' ' + self.image + self.foodcategory + self.price + self.tag + str(self.published)

class FoodTags(models.Model):
    name = models.CharField(max_length=50)
    
    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Tags'

    def __str__(self):
        return self.name