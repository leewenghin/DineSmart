# Generated by Django 4.2.6 on 2023-10-22 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0003_todo_delete_drink'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=500)),
            ],
            options={
                'verbose_name_plural': 'Items',
                'ordering': ('name',),
            },
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]