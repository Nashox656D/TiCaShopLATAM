

from rest_framework import viewsets
from .models import Factura, Comision
from .serializers import FacturaSerializer, ComisionSerializer

class FacturaViewSet(viewsets.ModelViewSet):
	queryset = Factura.objects.all()
	serializer_class = FacturaSerializer

class ComisionViewSet(viewsets.ModelViewSet):
	queryset = Comision.objects.all()
	serializer_class = ComisionSerializer
