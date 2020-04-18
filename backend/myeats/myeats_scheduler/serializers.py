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