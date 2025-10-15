

from rest_framework import viewsets
from .models import Ticket, Instalacion
from .serializers import TicketSerializer, InstalacionSerializer

class TicketViewSet(viewsets.ModelViewSet):
	queryset = Ticket.objects.all()
	serializer_class = TicketSerializer

class InstalacionViewSet(viewsets.ModelViewSet):
	queryset = Instalacion.objects.all()
	serializer_class = InstalacionSerializer
