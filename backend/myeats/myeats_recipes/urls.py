"""
/**
 * myeats_recipes app custom URL's
 *
 * @summary myeats_recipes app custom URL's
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 10:31:39 
 * Last modified  : 2020-04-19 10:52:46
 */
"""

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from myeats_recipes import views

urlpatterns = [
    path('recipe/create/', views.RecipeCreate.as_view()),
    path('recipe/list/', views.RecipeList.as_view()),
    path('recipe/<int:pk>', views.RecipeDetail.as_view()),
    path('ingredient/create/', views.IngredientCreate.as_view()),
    path('ingredient/list/', views.IngredientList.as_view()),
    path('ingredient/<int:pk>', views.IngredientDetail.as_view()),
    path('category/create/', views.CategoryCreate.as_view()),
    path('category/list/', views.CategoryList.as_view()),
    path('category/<int:pk>', views.CategoryDetail.as_view()),
]