"""
/**
 * Permissions file for app myeats_scheduler
 *
 * @summary Permissions file for app myeats_scheduler
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-21 06:50:53 
 * Last modified  : 2020-04-21 06:54:05
 */
"""

from rest_framework import permissions

class isOwnerOfWeek(permissions.BasePermission):
    """
    Custom permission to allow users manage only their own Weeks
    """
    def has_object_permission(self, request, view, obj):
        return obj.myeats_user == request.user


class isOwnerOfDay(permissions.BasePermission):
    """
    Custom permission to allow users manage only their own Days
    """
    def has_object_permission(self, request, view, obj):
        return obj.week.myeats_user == request.user


class isOwnerOfSplit(permissions.BasePermission):
    """
    Custom permission to allow users manage only their own Splits
    """
    def has_object_permission(self, request, view, obj):
        return obj.day.week.myeats_user == request.user