# Generated by Django 4.2.6 on 2023-11-08 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0030_rename_foodcategory_fooditems_foodcategory_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fooditems',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='my_django_app.foodtags'),
        ),
    ]
