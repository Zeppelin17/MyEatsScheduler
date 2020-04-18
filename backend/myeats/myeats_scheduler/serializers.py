"""
/**
 * Serializer for myeats_scheduler models
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-18 11:44:05 
 * Last modified  : 2020-04-18 11:44:34
 */
"""

from rest_framework import serializers
from myeats_scheduler.models import Week, Day, Split

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = ['name', 'first_day', 'from_date', 'to_date', 'myeats_user']
    


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ['name', 'week']



class SplitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Split
        fields = ['name', 'order', 'name', 'recipes']