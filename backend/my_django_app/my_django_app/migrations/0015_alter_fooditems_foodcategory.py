# Generated by Django 4.2.6 on 2023-10-24 12:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0014_rename_foodmenu_id_foodcategories_foodmenu'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fooditems',
            name='foodcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='my_django_app.foodcategories'),
        ),
    ]
