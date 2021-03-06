"""/**
 * myeats_recipes models for recipe, ingredient and category
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-15 06:47:49 
 * Last modified  : 2020-04-19 10:53:32
 */"""

from django.db import models



class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, blank=True)
    myeats_user = models.ForeignKey('myeats_user.MyEatsUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class Recipe(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    steps = models.TextField(blank=True)
    categories = models.ManyToManyField(Category, blank=True)
    myeats_user = models.ForeignKey('myeats_user.MyEatsUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.name




class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    unit_of_measure = models.CharField(max_length=50)

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return self.name