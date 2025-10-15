


from django.db import models
from django.contrib.auth.models import User


class Empleado(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
	nombre = models.CharField(max_length=200)
	rut = models.CharField(max_length=20, unique=True)
	cargo = models.CharField(max_length=100)
	email = models.EmailField()
	fecha_ingreso = models.DateField()
	activo = models.BooleanField(default=True)
	def __str__(self):
		return self.nombre

class Vacaciones(models.Model):
	empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
	fecha_inicio = models.DateField()
	fecha_fin = models.DateField()
	aprobada = models.BooleanField(default=False)
	def __str__(self):
		return f"Vacaciones {self.empleado.nombre} ({self.fecha_inicio} - {self.fecha_fin})"
