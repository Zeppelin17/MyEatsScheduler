"""/**
 * Admin settings for app myeats_scheduler
 *
 * @summary Admin settings for app myeats_scheduler
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-14 06:26:18 
 * Last modified  : 2020-04-16 06:31:06
 */"""

from django.contrib import admin
from .models import Week, Day, Split

# Register your models here.
admin.site.register(Week)
admin.site.register(Day)
admin.site.register(Split)