"""
/**
 * myeats_user views
 *
 * @summary myeats_user views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 06:36:02 
 * Last modified  : 2020-04-21 18:54:17
 */
"""

from myeats_user.models import MyEatsUser
from myeats_user.serializers import MyEatsUserSerializer
from rest_framework import generics, permissions
from myeats_user.permissions import IAmThisUser

class MyEatsUserCreate(generics.CreateAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer
    permission_classes = [permissions.IsAdminUser]

class MyEatsUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer
    permission_classes = [permissions.IsAuthenticated, IAmThisUser]