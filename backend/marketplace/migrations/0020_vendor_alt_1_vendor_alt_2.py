# Generated by Django 4.0.3 on 2022-04-17 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0019_category_background_category_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='alt_1',
            field=models.TextField(default='Logo'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='alt_2',
            field=models.TextField(default='Screen of App'),
        ),
    ]
