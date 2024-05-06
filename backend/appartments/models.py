from django.db import models
from django.db.models import CheckConstraint, Q
from django.contrib.auth.models import User

# Create your models here.


class Appartment(models.Model):
    number = models.PositiveSmallIntegerField(verbose_name="номер")
    address = models.CharField(verbose_name="адрес", max_length=255)
    area = models.FloatField(verbose_name="площадь в м2")
    price = models.PositiveIntegerField(verbose_name="стоимость")
    description = models.TextField(verbose_name="описание")
    users = models.ManyToManyField(User, verbose_name="пользователи, добавившие в список понравившихся")

    class Meta:
        verbose_name = "квартира"
        verbose_name_plural = "квартиры"
        constraints = (
            CheckConstraint(
                check=Q(area__gte=0.0), 
                name="area__positive_constraint"
            ),
        )


class Photo(models.Model):
    appartment = models.ForeignKey(Appartment, on_delete=models.CASCADE)
    file = models.FileField(verbose_name="фото", upload_to="photos")
    description = models.CharField(verbose_name="описание", max_length=255)
