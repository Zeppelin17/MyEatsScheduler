"""
/**
 * Serializer for myeats_user models
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-18 11:44:43 
 * Last modified  : 2020-04-19 09:08:56
 */
 """

from rest_framework import serializers
from myeats_user.models import MyEatsUser

class MyEatsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyEatsUser
        fields = ['email', 'first_name', 'last_name', 'password', 'is_active', 'is_staff', 'date_joined']