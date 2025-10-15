// api.js - funciones para conectar con el backend Django

const API_URL = 'http://127.0.0.1:8000/api/';

export async function fetchProductos() {
  const res = await fetch(API_URL + 'productos/');
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function crearProducto(data) {
  const res = await fetch(API_URL + 'productos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

// Puedes agregar más funciones para otros endpoints (clientes, stock, etc.)