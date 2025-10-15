from rest_framework import serializers
from .models import Empleado, Vacaciones


from django.contrib.auth.models import User

class EmpleadoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Empleado
        fields = '__all__'
        extra_fields = ['username', 'password']

    def create(self, validated_data):
        username = validated_data.pop('username', None)
        password = validated_data.pop('password', None)
        empleado = Empleado(**validated_data)
        if username and password:
            user = User.objects.create_user(username=username, password=password)
            empleado.user = user
        empleado.save()
        return empleado

class VacacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacaciones
        fields = '__all__'
