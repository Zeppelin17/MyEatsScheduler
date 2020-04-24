"""
/**
 * myeats_scheduler views
 *
 * @summary myeats_scheduler views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 09:09:52 
 * Last modified  : 2020-04-24 16:12:00
 */

"""

from myeats_scheduler.models import Week, Day, Split
from myeats_scheduler.serializers import WeekSerializer, DaySerializer, SplitSerializer
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from myeats_scheduler.permissions import isOwnerOfWeek, isOwnerOfDay, isOwnerOfSplit


class WeekList(generics.ListAPIView):
    serializer_class = WeekSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get weeks filtered by userId
        """
        queryset = Week.objects.filter(myeats_user=self.request.user)
        return queryset

class WeekCreate(generics.CreateAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfWeek]

class WeekDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfWeek]

class DayList(generics.ListAPIView):
    serializer_class = DaySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get days filtered by weekId
        """
        queryset = Day.objects.none()
        weekId = self.request.query_params.get('weekid', None)
        week = Week.objects.get(pk=weekId)
        if weekId is not None and self.request.user == week.myeats_user:
            queryset = Day.objects.filter(week=weekId)
        return queryset

class DayCreate(generics.CreateAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfDay]

class DayDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfDay]

class SplitList(generics.ListAPIView):
    serializer_class = SplitSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get splits filtered by dayId
        """
        queryset = Split.objects.none()
        dayId = self.request.query_params.get('dayid', None)
        day = Day.objects.get(pk=dayId)
        if dayId is not None and self.request.user == day.week.myeats_user:
            queryset = Split.objects.filter(day=dayId)
        return queryset

class SplitCreate(generics.CreateAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfSplit]

class SplitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, isOwnerOfSplit]
