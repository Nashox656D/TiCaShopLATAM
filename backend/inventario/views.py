

from rest_framework import viewsets
from .models import Producto, Stock
from .serializers import ProductoSerializer, StockSerializer
from rest_framework.response import Response
from rest_framework import status

def _user_is_empleado(user):
	# returns True when user is linked to an Empleado with cargo 'Empleado'
	try:
		from rrhh.models import Empleado
		emp = Empleado.objects.filter(user=user).first()
		return emp is not None and emp.cargo == 'Empleado'
	except Exception:
		return False

class ProductoViewSet(viewsets.ModelViewSet):
	queryset = Producto.objects.all()
	serializer_class = ProductoSerializer

	def create(self, request, *args, **kwargs):
		if _user_is_empleado(request.user) and not request.user.is_superuser:
			return Response({'detail': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)
		return super().create(request, *args, **kwargs)

	def update(self, request, *args, **kwargs):
		if _user_is_empleado(request.user) and not request.user.is_superuser:
			return Response({'detail': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)
		return super().update(request, *args, **kwargs)

	def destroy(self, request, *args, **kwargs):
		if _user_is_empleado(request.user) and not request.user.is_superuser:
			return Response({'detail': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)
		return super().destroy(request, *args, **kwargs)

class StockViewSet(viewsets.ModelViewSet):
	queryset = Stock.objects.all()
	serializer_class = StockSerializer

	def create(self, request, *args, **kwargs):
		# block creation for plain 'Empleado' cargo
		if _user_is_empleado(request.user) and not request.user.is_superuser:
			return Response({'detail': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)
		producto_sku = request.data.get('producto')
		cantidad = int(request.data.get('cantidad', 0))
		if not producto_sku or cantidad <= 0:
			from rest_framework.response import Response
			from rest_framework import status
			return Response({'error': 'Datos inválidos'}, status=status.HTTP_400_BAD_REQUEST)
		
		try:
			producto = Producto.objects.get(sku=producto_sku)
		except Producto.DoesNotExist:
			from rest_framework.response import Response
			from rest_framework import status
			return Response({'error': f'No existe un producto con SKU: {producto_sku}'}, status=status.HTTP_404_NOT_FOUND)

		stock_qs = Stock.objects.filter(producto=producto)
		if stock_qs.exists():
			stock = stock_qs.first()
			stock.cantidad += cantidad
			stock.save()
			serializer = self.get_serializer(stock)
			from rest_framework.response import Response
			return Response(serializer.data)
		else:
			request.data['producto'] = producto.id
			return super().create(request, *args, **kwargs)