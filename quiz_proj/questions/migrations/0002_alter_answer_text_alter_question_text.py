# Generated by Django 5.1.2 on 2024-10-23 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='text',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.CharField(max_length=1000),
        ),
    ]
