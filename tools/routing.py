from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from toolaps import routing as toolrouting

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            toolrouting.websocket_urlpatterns
        )
    )
})