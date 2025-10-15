

from django.db import models

class Producto(models.Model):
	sku = models.CharField(max_length=50, unique=True)
	nombre = models.CharField(max_length=200)
	descripcion = models.TextField(blank=True)
	categoria = models.CharField(max_length=100)
	precio = models.DecimalField(max_digits=10, decimal_places=2)
	activo = models.BooleanField(default=True)
	def __str__(self):
		return f"{self.sku} - {self.nombre}"

class Stock(models.Model):
	producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
	cantidad = models.PositiveIntegerField(default=0)
	ubicacion = models.CharField(max_length=100, blank=True)
	def __str__(self):
		return f"{self.producto.sku} ({self.cantidad})"
