from typing import TYPE_CHECKING

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from appartments.serializers import AppartmentSerializer, PhotoSerializer
from appartments.models import Appartment, Photo

if TYPE_CHECKING:
    from rest_framework.request import Request

# Create your views here.


class AppartmentViewSet(viewsets.ModelViewSet):
    queryset = Appartment.objects.all()
    serializer_class = AppartmentSerializer

    @action(detail=False, methods=["get"])
    def search(self, request: "Request"):
        ...

    @action(detail=False, methods=["post", "get"])
    def wishlist(self, request: "Request"):
        if request.method == "POST":
            # adding to wishlist
            pk = request.data.get("pk")
            appartment = Appartment.objects.get(pk=pk)
            request.user.appartment_set.add(appartment)

        # returning wishlist
        wishlist = self.queryset.filter(users__id=request.user.id)
        serializer = self.get_serializer(wishlist, many=True)
        return Response(serializer.data)
    

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
