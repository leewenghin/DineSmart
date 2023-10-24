from django.db import models

class FoodMenus(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Menus'

    def __str__(self):
        return self.name + ' ' + self.description + self.published

class FoodCategories(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    foodmenu = models.ForeignKey(FoodMenus, null=True, on_delete = models.SET_NULL)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + self.foodmenu + self.published

class FoodItems(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', null=True)
    price = models.FloatField()
    tag = models.CharField(max_length=128)
    published = models.BooleanField(default=True)
    foodcategory = models.ForeignKey(FoodCategories, null=True, on_delete = models.SET_NULL)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Items'

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + self.image + self.foodcategory + self.price + self.tag + self.published
