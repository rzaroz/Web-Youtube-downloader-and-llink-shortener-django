from channels.generic.websocket import WebsocketConsumer
from pytube import YouTube, request
import json

class YoutubeDownloader(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.Stream = None
        self.size = None
        self.Title = None

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        if text_data:
            data = None
            try:
                data = json.loads(text_data)
            except:
                data = text_data

            if type(data) == dict:
                if "url" in data.keys():
                    if not self.Stream:
                        stream = self.createStream(url=data["url"], res=data["res"], filetype=data["type"])
                        if stream == "err":
                            self.send("err")
                        elif stream == "created":
                            readydata = {
                                "ready": "done",
                                "size": self.size
                            }
                            self.send(json.dumps(readydata))


            if data == "file":
                if self.Stream:
                    try:
                        chunk = next(self.Stream)
                        self.send(bytes_data=chunk)
                    except:
                        done = {
                            "filedone": "done",
                            "title": self.Title
                        }
                        self.Stream = None
                        self.size = None
                        self.Title = None
                        self.send(text_data= json.dumps(done))


    def createStream(self, url, res, filetype):
        try:
            videoStream = None
            videoUrl = url
            resolatin = res
            types = filetype
            video = YouTube(videoUrl)

            if types == "audio":
                videoStream = video.streams.filter(only_audio=True).first()
            elif types == "video":
                videoStream = video.streams.filter(res=resolatin).first()

            chunks = request.stream(videoStream.url)
            self.Stream = chunks
            self.size = videoStream.filesize
            self.Title = videoStream.title

            return "created"

        except:
            return "err"


# Convertor