import React, { useEffect, useState } from 'react';

function OrdenesPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [nuevaOrden, setNuevaOrden] = useState({ proveedor: '', total: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ordenes-compra/')
      .then(r => r.json()).then(setOrdenes)
      .catch(() => setError('No se pudieron cargar las órdenes.'));
  }, []);

  const handleOrdenChange = e => setNuevaOrden({ ...nuevaOrden, [e.target.name]: e.target.value });
  const handleOrdenSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/ordenes-compra/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOrden)
      });
      if (!res.ok) throw new Error();
      const ord = await res.json();
      setOrdenes([...ordenes, ord]);
      setNuevaOrden({ proveedor: '', total: '' });
    } catch {
      setError('Error al crear orden de compra');
    }
  };

  return (
    <section>
      <h2>Órdenes de Compra</h2>
      <form onSubmit={handleOrdenSubmit} style={{ marginBottom: 16 }}>
        <input name="proveedor" placeholder="Proveedor ID" value={nuevaOrden.proveedor} onChange={handleOrdenChange} />{' '}
        <input name="total" placeholder="Total" value={nuevaOrden.total} onChange={handleOrdenChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Proveedor</th><th>Total</th></tr></thead>
        <tbody>
          {ordenes.map(o => (
            <tr key={o.id}><td>{o.id}</td><td>{o.proveedor}</td><td>${o.total}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default OrdenesPage;