

from rest_framework import viewsets
from .models import Cliente, Cotizacion
from .serializers import ClienteSerializer, CotizacionSerializer

class ClienteViewSet(viewsets.ModelViewSet):
	queryset = Cliente.objects.all()
	serializer_class = ClienteSerializer

class CotizacionViewSet(viewsets.ModelViewSet):
	queryset = Cotizacion.objects.all()
	serializer_class = CotizacionSerializer
