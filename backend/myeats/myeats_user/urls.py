"""
/**
 * myeats_user app custom URL's
 *
 * @summary myeats_user app custom URL's
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 06:47:27 
 * Last modified  : 2020-04-19 08:50:44
 */
"""

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from myeats_user import views

urlpatterns = [
    path('user/create/', views.MyEatsUserCreate.as_view()),
    path('user/<int:pk>', views.MyEatsUserDetail.as_view())
]