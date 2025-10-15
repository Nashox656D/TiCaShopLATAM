

from rest_framework import viewsets
from .models import Proveedor, OrdenCompra
from .serializers import ProveedorSerializer, OrdenCompraSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
	queryset = Proveedor.objects.all()
	serializer_class = ProveedorSerializer

class OrdenCompraViewSet(viewsets.ModelViewSet):
	queryset = OrdenCompra.objects.all()
	serializer_class = OrdenCompraSerializer
