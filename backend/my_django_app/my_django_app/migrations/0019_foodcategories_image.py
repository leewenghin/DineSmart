# Generated by Django 4.2.6 on 2023-10-26 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0018_remove_foodcategories_image_alter_fooditems_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='foodcategories',
            name='image',
            field=models.ImageField(null=True, upload_to='img/admin/categories'),
        ),
    ]
