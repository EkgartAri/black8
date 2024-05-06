# Generated by Django 5.0.5 on 2024-05-06 20:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appartment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveSmallIntegerField(verbose_name='номер')),
                ('address', models.CharField(max_length=255, verbose_name='адрес')),
                ('area', models.FloatField(verbose_name='площадь в м2')),
                ('price', models.PositiveIntegerField(verbose_name='стоимость')),
                ('description', models.TextField(verbose_name='описание')),
            ],
            options={
                'verbose_name': 'квартира',
                'verbose_name_plural': 'квартиры',
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='photos', verbose_name='фото')),
                ('description', models.CharField(max_length=255, verbose_name='описание')),
            ],
        ),
        migrations.AddConstraint(
            model_name='appartment',
            constraint=models.CheckConstraint(check=models.Q(('area__gte', 0.0)), name='area__positive_constraint'),
        ),
        migrations.AddField(
            model_name='photo',
            name='appartment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appartments.appartment'),
        ),
    ]
