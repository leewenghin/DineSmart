# Generated by Django 4.2.6 on 2023-10-26 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0020_alter_foodcategories_image_alter_fooditems_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodcategories',
            name='foodmenu',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='my_django_app.foodmenus'),
        ),
    ]
