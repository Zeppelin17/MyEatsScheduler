"""
/**
 * myeats URL Configuration
 *
 * @summary myeats URL Configuration
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-18 11:08:59 
 * Last modified  : 2020-04-25 11:49:26
 */
 """
 
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework.authtoken import views
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="MyEats Scheduler API",
      default_version='v1',
      description="API Documentation",
      #terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="elzeppelin17@gmail.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    url(r'^api/docs(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^api/docs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    path('admin-myeats/', admin.site.urls),
    url('api/auth/', views.obtain_auth_token),
    path('', include('myeats_user.urls')),
    path('', include('myeats_scheduler.urls')),
    path('', include('myeats_recipes.urls'))
]
