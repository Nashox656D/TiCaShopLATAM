from rest_framework import serializers
from .models import Factura, Comision

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'

class ComisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comision
        fields = '__all__'
