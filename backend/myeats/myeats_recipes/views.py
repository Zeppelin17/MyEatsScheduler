"""
/**
 * myeats_recipes views
 *
 * @summary myeats_recipes views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 10:32:54 
 * Last modified  : 2020-04-21 06:45:51
 */
"""

from myeats_recipes.models import Recipe, Ingredient, Category
from myeats_recipes.serializers import RecipeSerializer, IngredientSerializer, CategorySerializer
from rest_framework import generics, permissions
from myeats_recipes.permissions import isOwnerOfRecipeCategory, isOwnerOfIngredient

class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class IngredientList(generics.ListAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfIngredient]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfIngredient]

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfIngredient]

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]
