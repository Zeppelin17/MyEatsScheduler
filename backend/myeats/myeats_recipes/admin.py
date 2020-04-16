"""/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-16 06:26:17 
 * Last modified  : 2020-04-16 06:31:28
 */"""

from django.contrib import admin
from .models import Category, Recipe, Ingredient
# Register your models here.
admin.site.register(Category)
admin.site.register(Recipe)
admin.site.register(Ingredient)