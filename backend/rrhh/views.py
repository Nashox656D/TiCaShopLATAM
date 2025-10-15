

from rest_framework import viewsets
from .models import Empleado, Vacaciones
from .serializers import EmpleadoSerializer, VacacionesSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
	queryset = Empleado.objects.all()
	serializer_class = EmpleadoSerializer

class VacacionesViewSet(viewsets.ModelViewSet):
	queryset = Vacaciones.objects.all()
	serializer_class = VacacionesSerializer
