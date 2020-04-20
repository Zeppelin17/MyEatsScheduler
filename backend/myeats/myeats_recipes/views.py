"""
/**
 * myeats_recipes views
 *
 * @summary myeats_recipes views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 10:32:54 
 * Last modified  : 2020-04-19 10:53:11
 */
"""

from myeats_recipes.models import Recipe, Ingredient, Category
from myeats_recipes.serializers import RecipeSerializer, IngredientSerializer, CategorySerializer
from rest_framework import generics

class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        """
        Get recipes filtered by user
        """
        queryset = Recipe.objects.none()
        userId = self.request.query_params.get('userid', None)
        if userId is not None:
            queryset = Recipe.objects.filter(myeats_user=userId)
        return queryset

class RecipeCreate(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class IngredientList(generics.ListAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        """
        Get ingredients filtered by recipe
        """
        queryset = Ingredient.objects.none()
        recipeId = self.request.query_params.get('recipeid', None)
        if recipeId is not None:
            queryset = Ingredient.objects.filter(recipe=recipeId)
        return queryset

class IngredientCreate(generics.CreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        """
        Get user's categories
        """
        queryset = Category.objects.none()
        userId = self.request.query_params.get('userid', None)
        if userId is not None:
            queryset = Category.objects.filter(myeats_user=userId)
        return queryset

class CategoryCreate(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer