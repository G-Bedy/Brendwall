from django.urls import path

from products.views import ProductAPIList

app_name = 'products'

urlpatterns = [
    path('products/', ProductAPIList.as_view(), name='product-list'),
    ]
