"""
/**
 * myeats_user views
 *
 * @summary myeats_user views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 06:36:02 
 * Last modified  : 2020-04-19 08:34:37
 */
"""

from myeats_user.models import MyEatsUser
from myeats_user.serializers import MyEatsUserSerializer
from rest_framework import generics

class MyEatsUserCreate(generics.CreateAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer

class MyEatsUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer