"""
/**
 * myeats_scheduler views
 *
 * @summary myeats_scheduler views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 09:09:52 
 * Last modified  : 2020-04-21 18:53:34
 */

"""

from myeats_scheduler.models import Week, Day, Split
from myeats_scheduler.serializers import WeekSerializer, DaySerializer, SplitSerializer
from rest_framework import generics, permissions
from myeats_scheduler.permissions import isOwnerOfWeek, isOwnerOfDay, isOwnerOfSplit

class WeekList(generics.ListAPIView):
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfWeek]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfWeek]

class WeekDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfWeek]

class DayList(generics.ListAPIView):
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfDay]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfDay]

class DayDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfDay]

class SplitList(generics.ListAPIView):
    serializer_class = SplitSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfSplit]

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
    permission_classes = [permissions.IsAuthenticated, isOwnerOfSplit]

class SplitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer
    permission_classes = [permissions.IsAuthenticated, isOwnerOfSplit]
