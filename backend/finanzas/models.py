

from django.db import models

class Factura(models.Model):
	numero = models.CharField(max_length=50, unique=True)
	fecha = models.DateField()
	cliente = models.CharField(max_length=200)
	monto = models.DecimalField(max_digits=12, decimal_places=2)
	pagada = models.BooleanField(default=False)
	def __str__(self):
		return f"Factura {self.numero}"

class Comision(models.Model):
	vendedor = models.CharField(max_length=200)
	monto = models.DecimalField(max_digits=10, decimal_places=2)
	fecha = models.DateField()
	pagada = models.BooleanField(default=False)
	def __str__(self):
		return f"Comisión {self.vendedor} - {self.monto}"
