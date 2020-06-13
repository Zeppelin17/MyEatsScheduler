"""
/**
 * myeats_user views
 *
 * @summary myeats_user views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 06:36:02 
 * Last modified  : 2020-06-13 06:53:46
 */
"""

from myeats_user.models import MyEatsUser
from myeats_user.serializers import MyEatsUserSerializer
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from myeats_user.permissions import IAmThisUser

class MyEatsUserCreate(generics.CreateAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.AllowAny]

class MyEatsUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyEatsUser.objects.all()
    serializer_class = MyEatsUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IAmThisUser]