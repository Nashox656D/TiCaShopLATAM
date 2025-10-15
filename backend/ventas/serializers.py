from rest_framework import serializers
from .models import Cliente, Cotizacion

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = '__all__'
