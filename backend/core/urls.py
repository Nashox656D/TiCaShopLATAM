"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from inventario.views import ProductoViewSet, StockViewSet
from ventas.views import ClienteViewSet, CotizacionViewSet
from compras.views import ProveedorViewSet, OrdenCompraViewSet
from finanzas.views import FacturaViewSet, ComisionViewSet
from rrhh.views import EmpleadoViewSet, VacacionesViewSet
from soporte.views import TicketViewSet, InstalacionViewSet
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'stock', StockViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'cotizaciones', CotizacionViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'ordenes-compra', OrdenCompraViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'comisiones', ComisionViewSet)
router.register(r'empleados', EmpleadoViewSet)
router.register(r'vacaciones', VacacionesViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'instalaciones', InstalacionViewSet)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        tipo = getattr(user, 'tipo', None)
        return Response({
            'username': user.username,
            'is_superuser': user.is_superuser,
            'is_staff': user.is_staff,
            'email': user.email,
            'tipo': tipo,
        })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', obtain_auth_token),
    path('api/user/', UserInfoView.as_view()),

]
