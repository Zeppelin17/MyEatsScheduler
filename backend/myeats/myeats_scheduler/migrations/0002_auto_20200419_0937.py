# Generated by Django 3.0.3 on 2020-04-19 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myeats_scheduler', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='week',
            name='from_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='week',
            name='to_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
