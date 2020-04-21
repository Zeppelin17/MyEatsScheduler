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
    password = serializers.CharField(min_length=6, write_only=True, required=True)
    class Meta:
        model = MyEatsUser
        fields = ['email', 'first_name', 'last_name', 'password']
    
    def create(self, validated_data):
        return MyEatsUser.objects.create_user(**validated_data)