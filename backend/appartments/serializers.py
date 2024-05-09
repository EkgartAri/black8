from rest_framework import serializers

from appartments.models import Appartment, Photo


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class AppartmentSerializer(serializers.HyperlinkedModelSerializer):
    photos = PhotoSerializer(source="photo_set", many=True)

    class Meta:
        model = Appartment
        fields = ["id", "url", "number", "address", "area", "price", "description", 'photos']
