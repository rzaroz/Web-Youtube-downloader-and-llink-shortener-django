from django.urls import path
from .views import youtube
from django.contrib import admin
from .views import safhe1,safhe2,safhe3
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('Youtube', youtube, name="YoutubeDownloader"),
    path('linkshortner',safhe1),
    path('linkshortner/<str:r>',safhe2, name="r_link"),
    path("linkshortner/1/<str:st>",safhe3,name="sait")
]
if settings.DEBUG:
    urlpatterns=urlpatterns+static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
    urlpatterns=urlpatterns+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)