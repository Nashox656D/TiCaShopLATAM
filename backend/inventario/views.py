

from rest_framework import viewsets
from .models import Producto, Stock
from .serializers import ProductoSerializer, StockSerializer

class ProductoViewSet(viewsets.ModelViewSet):
	queryset = Producto.objects.all()
	serializer_class = ProductoSerializer

class StockViewSet(viewsets.ModelViewSet):
	queryset = Stock.objects.all()
	serializer_class = StockSerializer

	def create(self, request, *args, **kwargs):
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