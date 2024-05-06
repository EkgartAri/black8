from rest_framework import serializers

from appartments.models import Appartment, Photo


class AppartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Appartment
        fields = ["url", "number", "address", "area", "price", "description"]


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
