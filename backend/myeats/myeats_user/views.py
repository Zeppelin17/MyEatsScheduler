"""
/**
 * myeats_user views
 *
 * @summary myeats_user views
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-19 06:36:02 
 * Last modified  : 2020-08-08 17:47:39
 */
"""

from myeats_user.models import MyEatsUser
from myeats_user.serializers import MyEatsUserSerializer
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from myeats_user.permissions import IAmThisUser

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk
        })

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