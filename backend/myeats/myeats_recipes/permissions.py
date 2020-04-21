"""
/**
 * Permissions file for app myeats_recipes
 *
 * @summary Permissions file for app myeats_recipes
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-21 06:24:37 
 * Last modified  : 2020-04-21 06:45:06
 */
"""

from rest_framework import permissions


class isOwnerOfRecipeCategory(permissions.BasePermission):
    """
    Custom permission to allow users manage only their own recipes and categories
    """
    def has_object_permission(self, request, view, obj):
        return obj.myeats_user == request.user


class isOwnerOfIngredient(permissions.BasePermission):
    """
    Custom permission to allow users manage only their own recipe's ingredients
    """
    def has_object_permission(self, request, view, obj):
        return obj.recipe.myeats_user == request.user