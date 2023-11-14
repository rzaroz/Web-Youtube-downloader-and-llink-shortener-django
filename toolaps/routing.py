from django.urls import path
from toolaps import consumers

websocket_urlpatterns = [
    path('YoutubeWS/', consumers.YoutubeDownloader)
]