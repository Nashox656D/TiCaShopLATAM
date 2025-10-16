import React, { useEffect, useState } from 'react';
import { fetchProductos, crearProducto } from './api';


function ProductosPage({ usuario, ...props }) {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ sku: '', nombre: '', precio: '', categoria: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProductos()
      .then(setProductos)
      .catch(() => setError('No se pudieron cargar los productos.'));
  }, []);

  const handleChange = e => setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const prod = await crearProducto({
        sku: nuevo.sku,
        nombre: nuevo.nombre,
        precio: nuevo.precio,
        categoria: nuevo.categoria,
        descripcion: '',
        activo: true
      });
      setProductos([...productos, prod]);
      setNuevo({ sku: '', nombre: '', precio: '', categoria: '' });
    } catch {
      setError('Error al crear producto');
    }
  };

  return (
    <section>
      <h2>Productos</h2>
      {usuario?.cargo !== 'Empleado' && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
          <input name="sku" placeholder="SKU" value={nuevo.sku} onChange={handleChange} />{' '}
          <input name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={handleChange} />{' '}
          <input name="precio" placeholder="Precio" value={nuevo.precio} onChange={handleChange} />{' '}
          <input name="categoria" placeholder="Categoría" value={nuevo.categoria} onChange={handleChange} />{' '}
          <button type="submit">Agregar</button>
        </form>
      )}
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>SKU</th><th>Nombre</th><th>Precio</th></tr></thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}><td>{p.id}</td><td>{p.sku}</td><td>{p.nombre}</td><td>${p.precio}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ProductosPage;