from rest_framework import serializers
from myeats_user.models import MyEatsUser

class MyEatsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyEatsUser
        fields = ['email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined']