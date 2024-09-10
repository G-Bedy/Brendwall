from django.contrib import admin
from django.urls import include, path

from products.views import product_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('products.urls', namespace='products')),
    path('', product_page, name='product-page'),
]
