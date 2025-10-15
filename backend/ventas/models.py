

from django.db import models

class Cliente(models.Model):
	nombre = models.CharField(max_length=200)
	rut = models.CharField(max_length=20, unique=True)
	email = models.EmailField()
	telefono = models.CharField(max_length=20, blank=True)
	direccion = models.CharField(max_length=255, blank=True)
	def __str__(self):
		return self.nombre

class Cotizacion(models.Model):
	cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
	fecha = models.DateField(auto_now_add=True)
	total = models.DecimalField(max_digits=12, decimal_places=2)
	estado = models.CharField(max_length=50, default="pendiente")
	observaciones = models.TextField(blank=True)
	def __str__(self):
		return f"Cotización {self.id} - {self.cliente.nombre}"
