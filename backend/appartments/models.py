from django.db import models
from django.db.models import CheckConstraint, Q
from django.contrib.auth.models import User

# Create your models here.


class Appartment(models.Model):
    number = models.PositiveSmallIntegerField(verbose_name="номер", db_column="номер")
    address = models.CharField(verbose_name="адрес", max_length=255, db_column="адрес")
    area = models.FloatField(verbose_name="площадь в м2", db_column="площадь")
    price = models.PositiveIntegerField(verbose_name="стоимость", db_column="стоимость")
    description = models.TextField(verbose_name="описание", db_column="описание")
    users = models.ManyToManyField(User, verbose_name="пользователи, добавившие в список понравившихся", db_column="понравилось пользователям")

    class Meta:
        db_table = "квартиры"
        verbose_name = "квартира"
        verbose_name_plural = "квартиры"
        constraints = (
            CheckConstraint(
                check=Q(area__gte=0.0), 
                name="area__positive_constraint"
            ),
        )


class Photo(models.Model):
    appartment = models.ForeignKey(Appartment, on_delete=models.CASCADE, db_column="квартира")
    file = models.FileField(verbose_name="фото", upload_to="photos", db_column="файл")
    description = models.CharField(verbose_name="описание", max_length=255, db_column="описание")

    class Meta:
        db_table = "фото"
