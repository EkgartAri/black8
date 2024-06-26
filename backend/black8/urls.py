"""
URL configuration for black8 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from rest_framework import routers

from authsystem import views as auth_views
from appartments import views as appartments_views


router = routers.DefaultRouter()
router.register(r'appartments', appartments_views.AppartmentViewSet)
router.register(r'photos', appartments_views.PhotoViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('login/', auth_views.Login.as_view()),
    path('register/', auth_views.register),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
