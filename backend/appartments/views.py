from typing import TYPE_CHECKING

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

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
        # извлекаем фильтры из query-параметров запроса
        q = request.query_params.get("q")
        area_from = request.query_params.get("area_from")
        area_to = request.query_params.get("area_to")
        price_from = request.query_params.get("price_from")
        price_to = request.query_params.get("price_to")

        queryset = Appartment.objects.all()

        # добавляем фильтр поискового запроса
        if q:
            queryset = queryset.filter(Q(address__icontains=q) | Q(description__icontains=q))

        # добавляем фильтр ограничения площади
        if area_from is not None:
            # area__gte - area greater than or equal (площадь больше чем или равна)
            queryset = queryset.filter(area__gte=float(area_from))
        if area_to is not None:
            # area__lte - area lesser than or equal (площадь меньше чем или равна)
            queryset = queryset.filter(area__lte=float(area_to))
        # те же фильтры, только для ограничения цены
        if price_from is not None:
            queryset = queryset.filter(price__gte=int(price_from))
        if price_to is not None:
            queryset = queryset.filter(price__lte=int(price_to))

        # собираем кверисет в сериализатор и в ответ
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post", "get"])
    def wishlist(self, request: "Request"):
        if request.method == "POST":
            # добавляем в избранное
            pk = request.query_params.get("pk")
            appartment = Appartment.objects.get(pk=pk)
            request.user.appartment_set.add(appartment)

        # возвращаем избранное
        wishlist = self.queryset.filter(users__id=request.user.id)
        serializer = self.get_serializer(wishlist, many=True)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == 'wishlist':
            return [IsAuthenticated()]
        return super().get_permissions()
    

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
