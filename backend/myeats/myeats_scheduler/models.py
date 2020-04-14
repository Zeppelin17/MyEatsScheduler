"""/**
 * myeats_scheduler models for week, day and splits
 *
 * @summary myeats_scheduler models for week, day and splits
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-14 06:24:56 
 * Last modified  : 2020-04-14 06:53:15
 */"""

from django.db import models

FIRST_DAY_CHOICES = [
    ("mon", "mon"),
    ("sun", "sun"),
]

class Week(models.Model):
    name = models.CharField(max_length=150)
    first_day = models.CharField(max_length=3, choices=FIRST_DAY_CHOICES)
    from_date = models.DateField(blank=True)
    to_date = models.DateField(blank=True)

    myeats_user = models.ForeignKey('myeats_user.MyEatsUser', on_delete=models.CASCADE)