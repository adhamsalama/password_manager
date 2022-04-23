from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

# Create your views here.


@api_view()
def index(request):
    if request.user.is_authenticated == False:
        return redirect(reverse('frontend:landing'))
    return render(request, 'frontend/vault.html')


def settings(request):
    if request.user.is_authenticated == False:
        return redirect(reverse('frontend:landing'))
    return render(request, 'frontend/settings.html')


def landing(request):
    if request.user.is_authenticated:
        return redirect(reverse('frontend:vault'))
    return render(request, 'frontend/landing.html')
