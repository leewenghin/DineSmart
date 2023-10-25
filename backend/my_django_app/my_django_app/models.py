from django.db import models

class FoodMenus(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Menus'

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + str(self.published)
        # return f"{self.name} {self.description} {self.foodmenu} {self.published}"


class FoodCategories(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    published = models.BooleanField(default=True)
    foodmenu = models.ForeignKey(FoodMenus, on_delete=models.CASCADE)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + str(self.foodmenu) + ' ' + str(self.published)

class FoodItems(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', null=True)
    price = models.FloatField()
    tag = models.CharField(max_length=128)
    published = models.BooleanField(default=True)
    foodcategory = models.ForeignKey(FoodCategories, on_delete=models.CASCADE)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Items'

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + self.image + self.foodcategory + self.price + self.tag + str(self.published)
