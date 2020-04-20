"""
/**
 * myeats_scheduler views
 *
 * @summary myeats_scheduler views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 09:09:52 
 * Last modified  : 2020-04-19 10:33:39
 */

"""

from myeats_scheduler.models import Week, Day, Split
from myeats_scheduler.serializers import WeekSerializer, DaySerializer, SplitSerializer
from rest_framework import generics

class WeekList(generics.ListAPIView):
    serializer_class = WeekSerializer

    def get_queryset(self):
        """
        Get weeks filtered by userId
        """
        queryset = Week.objects.none()
        userId = self.request.query_params.get('userid', None)
        if userId is not None:
            queryset = Week.objects.filter(myeats_user=userId)
        return queryset

class WeekCreate(generics.CreateAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer

class WeekDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer

class DayList(generics.ListAPIView):
    serializer_class = DaySerializer

    def get_queryset(self):
        """
        Get days filtered by weekId
        """
        queryset = Day.objects.none()
        weekId = self.request.query_params.get('weekid', None)
        if weekId is not None:
            queryset = Day.objects.filter(week=weekId)
        return queryset

class DayCreate(generics.CreateAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer

class DayDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer

class SplitList(generics.ListAPIView):
    serializer_class = SplitSerializer

    def get_queryset(self):
        """
        Get splits filtered by dayId
        """
        queryset = Split.objects.none()
        dayId = self.request.query_params.get('dayid', None)
        if dayId is not None:
            queryset = Split.objects.filter(day=dayId)
        return queryset

class SplitCreate(generics.CreateAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer

class SplitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer