# Generated by Django 4.0.3 on 2022-04-09 17:31

from django.db import migrations, models
import marketplace.models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0016_alter_vendor_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='screen_image',
            field=models.ImageField(null=True, upload_to=marketplace.models.upload_to),
        ),
    ]
