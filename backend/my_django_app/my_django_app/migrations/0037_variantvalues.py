# Generated by Django 4.2.6 on 2023-11-14 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_django_app', '0036_alter_variants_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='VariantValues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('variant', models.ManyToManyField(blank=True, to='my_django_app.variants')),
            ],
            options={
                'verbose_name_plural': 'Variants',
                'ordering': ('id',),
            },
        ),
    ]
