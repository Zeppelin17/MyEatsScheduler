"""
/**
 * Permissions file for app myeats_user
 *
 * @summary Permissions file for app myeats_user
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-21 18:50:30 
 * Last modified  : 2020-04-21 18:53:22
 */
"""

from rest_framework import permissions

class IAmThisUser(permissions.BasePermission):
    """
    Custom permission to allow users manage only their profile
    """
    def has_object_permission(self, request, view, obj):
        return obj == request.user