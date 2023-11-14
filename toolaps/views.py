from django.shortcuts import render ,HttpResponse
from django.shortcuts import render,redirect,HttpResponseRedirect,HttpResponse
from django.urls import reverse
from urllib.parse import urljoin
from .models import Link


def home(request):

    return HttpResponseRedirect(reverse("YoutubeDownloader"))

def youtube(request):
    return render(request, 'youtube.html', {})
    
    

#linkshortener
def safhe1(request):
    r = request.POST.get("adres")
    if r is not None:
        if not r.startswith('http://') and not r.startswith('https://'):
            r = 'https://' + r
        l = Link(url=r)
        l.save()
        
        return render(request,"kutahkonandeh.html",{"r":request.get_host()+reverse("r_link",kwargs={"r":l.code}),"l":l.code})

    internal_url = request.build_absolute_uri('/')
    context = {"internal_url": internal_url}
    return render(request, "kutahkonandeh.html", context)
def safhe2(request,r):
    l = Link.objects.filter(code=r).first()
    oip=request.META.get('REMOTE_ADDR')
    pi=Link.objects.filter(ip=oip)
    if pi==None:
        Link()
        coun=Link.objects.filter(ip=oip).first().count
        coun

    url = l.url
    print(url)
    return HttpResponseRedirect(url)
def safhe3(request,st):
    AL=Link.objects.filter(code=st).first().url
    return redirect(AL)