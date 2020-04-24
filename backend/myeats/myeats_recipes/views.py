"""
/**
 * myeats_recipes views
 *
 * @summary myeats_recipes views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 10:32:54 
 * Last modified  : 2020-04-24 06:21:51
 */
"""

from myeats_recipes.models import Recipe, Ingredient, Category
from myeats_recipes.serializers import RecipeSerializer, IngredientSerializer, CategorySerializer
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from myeats_recipes.permissions import isOwnerOfRecipeCategory, isOwnerOfIngredient

class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get recipes filtered by user
        """
        queryset = Recipe.objects.filter(myeats_user=self.request.user)
        return queryset

class RecipeCreate(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class IngredientList(generics.ListAPIView):
    serializer_class = IngredientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get ingredients filtered by recipe
        """
        queryset = Ingredient.objects.none()
        recipeId = self.request.query_params.get('recipeid', None)
        recipe = Recipe.objects.get(pk=recipeId)
        if recipeId is not None and self.request.user == recipe.myeats_user:
            queryset = Ingredient.objects.filter(recipe=recipeId)
        return queryset

class IngredientCreate(generics.CreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfIngredient]

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfIngredient]

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get user's categories
        """
        queryset = Category.objects.filter(myeats_user=self.request.user)
        return queryset

class CategoryCreate(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfRecipeCategory]
