"""/**
 * myeats_scheduler models for week, day and splits
 *
 * @summary myeats_scheduler models for week, day and splits
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-14 06:24:56 
 * Last modified  : 2020-04-19 09:43:59
 */"""

from django.db import models

FIRST_DAY_CHOICES = [
    ("mon", "mon"),
    ("sun", "sun"),
]

class Week(models.Model):
    name = models.CharField(max_length=150)
    first_day = models.CharField(max_length=3, choices=FIRST_DAY_CHOICES)
    from_date = models.DateField(blank=True, null=True)
    to_date = models.DateField(blank=True, null=True)

    myeats_user = models.ForeignKey('myeats_user.MyEatsUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.name




class Day(models.Model):
    name = models.CharField(max_length=20)
    week = models.ForeignKey(Week, on_delete=models.CASCADE)

    def __str__(self):
        return self.name





class Split(models.Model):
    name = models.CharField(max_length=20)
    order = models.PositiveIntegerField()
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    recipes = models.ManyToManyField('myeats_recipes.Recipe', blank=True)

    def __str__(self):
        return self.name