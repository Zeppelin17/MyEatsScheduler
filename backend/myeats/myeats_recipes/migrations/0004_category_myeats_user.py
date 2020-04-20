# Generated by Django 3.0.3 on 2020-04-20 04:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myeats_recipes', '0003_auto_20200420_0625'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='myeats_user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
