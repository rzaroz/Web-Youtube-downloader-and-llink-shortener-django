from django.urls import path
from .views import youtube

urlpatterns = [
    path('Youtube', youtube, name="YoutubeDownloader")
]