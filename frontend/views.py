from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

# Create your views here.

@api_view()
def index(request):
    if request.user.is_authenticated == False:
        return redirect(reverse('frontend:accounts'))
    return render(request, 'frontend/index.html')

def login_register(request):
    return render(request, 'frontend/login_register.html')

