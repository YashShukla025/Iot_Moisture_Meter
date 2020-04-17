from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
    path('index/',views.index,name="index"),
    path('predict/',views.predict,name="predict")
]