"""
/**
 * Serializer for myeats_recipes models
 *
 * @summary Serializer for myeats_recipes models
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-18 11:43:22 
 * Last modified  : 2020-04-18 11:43:57
 */
 """

from rest_framework import serializers
from myeats_recipes.models import Category, Recipe, Ingredient

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']



class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['name', 'description', 'steps', 'categories']



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'quantity', 'unit_of_measure', 'recipe']