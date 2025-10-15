

from django.db import models

class Ticket(models.Model):
	titulo = models.CharField(max_length=200)
	descripcion = models.TextField()
	fecha_creacion = models.DateTimeField(auto_now_add=True)
	estado = models.CharField(max_length=50, default="abierto")
	asignado_a = models.CharField(max_length=200, blank=True)
	def __str__(self):
		return f"Ticket {self.id} - {self.titulo}"

class Instalacion(models.Model):
	ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
	direccion = models.CharField(max_length=255)
	fecha_programada = models.DateField()
	realizada = models.BooleanField(default=False)
	def __str__(self):
		return f"Instalación {self.id} - {self.direccion}"
