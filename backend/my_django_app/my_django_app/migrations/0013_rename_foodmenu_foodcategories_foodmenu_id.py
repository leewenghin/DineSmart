# Generated by Django 4.2.6 on 2023-10-24 09:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0012_alter_fooditems_image_alter_fooditems_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='foodcategories',
            old_name='foodmenu',
            new_name='foodmenu_id',
        ),
    ]