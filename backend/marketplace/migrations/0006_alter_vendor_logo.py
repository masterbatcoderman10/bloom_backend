# Generated by Django 4.0.3 on 2022-04-08 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0005_alter_vendor_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='logo',
            field=models.ImageField(null=True, upload_to='live-static/media-root'),
        ),
    ]
