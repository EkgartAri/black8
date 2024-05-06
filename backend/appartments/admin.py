from django.contrib import admin

from appartments.models import Appartment, Photo


# Register your models here.


class AppartmentAdmin(admin.ModelAdmin):
    ...


class PhotoAdmin(admin.ModelAdmin):
    ...


admin.site.register(Appartment, AppartmentAdmin)
admin.site.register(Photo, PhotoAdmin)
