from rest_framework import serializers
from .models import Proveedor, OrdenCompra

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class OrdenCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenCompra
        fields = '__all__'
