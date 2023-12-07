from django.db import models
from django.core.exceptions import ValidationError
from PIL import Image, ImageDraw
import hashlib
import re
import qrcode
import uuid
from io import BytesIO
from django.core.files import File 
from datetime import datetime, timedelta
from urllib.parse import quote
import requests
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
    foodmenu_id = models.ForeignKey(FoodMenus, on_delete=models.CASCADE)
    
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
    tag = models.ManyToManyField('FoodTags', blank=True)
    published = models.BooleanField(default=True)
    foodcategory_id = models.ForeignKey(FoodCategories, on_delete=models.CASCADE)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Items'

    def __str__(self):
        return self.name
        # return self.name + ' ' + self.description + ' ' + self.image + self.foodcategory + self.price + self.tag + str(self.published)


class OrderTables(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False) # URL
    link = models.CharField(max_length=128, null=True, blank=True) # URL
    image = models.ImageField(upload_to='table/qrcode', null=True, blank=True)
    status = models.CharField(max_length=128, null=False, blank=False)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'QRtable'

    def save(self, *args, **kwargs):
        # other_table_data = FoodItems.objects.first() 
        # if other_table_data:
        # Remove existing QR code before saving the new one


        api_url = 'http://127.0.0.1:8000/local/'
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            # Process the data from the API
            if 'local_ip' in data:
                local_ip = data['local_ip']
                print (f"Ip address:{local_ip}") 
            else:
                print("Error: 'local_ip' key not found in the response data")
        else:
            print(f"Error: {response.status_code}")
        # Generate a unique identifier for the QR code (UUID)
        unique_identifier = str(uuid.uuid4())
        # Calculate expiration time (e.g., 1 day from now)
        expiration_time = datetime.now() + timedelta(minutes=1)

        # Create QR code with expiration time encoded in the URL
        url = f'http://{local_ip}:5173/table/{quote(self.name)}-{unique_identifier}?expires={expiration_time.isoformat()}'
        qrcode_img = qrcode.make(url)

        qr_width, qr_height = qrcode_img.size

        # Create a new image with padding
        canvas = Image.new('RGB', (qr_width + 20, qr_height + 20), 'orange')
        canvas.paste(qrcode_img, (10, 10))

        # Use a timestamp as a unique identifier for the file name
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        sanitized_name = re.sub(r'[^\w\s.-]', '', self.name)
        fname = f'qr_code-{sanitized_name}.png'

        # Save the image to the model
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        self.link = url
        self.image.save(fname, File(buffer), save=False)
        buffer.close()

        super().save(*args, **kwargs)
        # else:
        #     print("error")

    def __str__(self):
        return self.name
        # return self.name + ' ' + self.description + ' ' + self.image + self.foodcategory + self.price + self.tag + str(self.published)

class FoodTags(models.Model):
    name = models.CharField(max_length=50)
    
    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Tags'

    def __str__(self):
        return self.name

class VariantGroups(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Variant Group'

    def __str__(self):
        return self.name

class VariantValues(models.Model):
    title = models.ForeignKey(VariantGroups, on_delete=models.CASCADE, null=False,blank=False)
    name = models.CharField(max_length=128, null=False, blank=False)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Variant Value'

    def __str__(self):
        return self.name