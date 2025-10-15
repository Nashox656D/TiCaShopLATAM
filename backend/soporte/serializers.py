from rest_framework import serializers
from .models import Ticket, Instalacion

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class InstalacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instalacion
        fields = '__all__'
