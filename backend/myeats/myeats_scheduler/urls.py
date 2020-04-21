"""
/**
 * myeats_scheduler app custom URL's
 *
 * @summary myeats_scheduler app custom URL's
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 09:29:49 
 * Last modified  : 2020-04-19 10:26:23
 */
"""

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from myeats_scheduler import views

urlpatterns = [
    path('api/week/create/', views.WeekCreate.as_view()),
    path('api/week/list/', views.WeekList.as_view()),
    path('api/week/<int:pk>', views.WeekDetail.as_view()),
    path('api/day/create/', views.DayCreate.as_view()),
    path('api/day/list/', views.DayList.as_view()),
    path('api/day/<int:pk>', views.DayDetail.as_view()),
    path('api/split/create/', views.SplitCreate.as_view()),
    path('api/split/list/', views.SplitList.as_view()),
    path('api/split/<int:pk>', views.SplitDetail.as_view())
]