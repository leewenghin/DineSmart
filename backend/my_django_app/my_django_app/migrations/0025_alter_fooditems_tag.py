# Generated by Django 4.2.6 on 2023-10-29 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0024_alter_foodcategories_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fooditems',
            name='tag',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
