import React, { useEffect, useState } from 'react';

function FacturasPage() {
  const [facturas, setFacturas] = useState([]);
  const [nuevaFactura, setNuevaFactura] = useState({ cliente: '', total: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/facturas/')
      .then(r => r.json()).then(setFacturas)
      .catch(() => setError('No se pudieron cargar las facturas.'));
  }, []);

  const handleFacturaChange = e => setNuevaFactura({ ...nuevaFactura, [e.target.name]: e.target.value });
  const handleFacturaSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/facturas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaFactura)
      });
      if (!res.ok) throw new Error();
      const fac = await res.json();
      setFacturas([...facturas, fac]);
      setNuevaFactura({ cliente: '', total: '' });
    } catch {
      setError('Error al crear factura');
    }
  };

  return (
    <section>
      <h2>Facturas</h2>
      <form onSubmit={handleFacturaSubmit} style={{ marginBottom: 16 }}>
        <input name="cliente" placeholder="Cliente ID" value={nuevaFactura.cliente} onChange={handleFacturaChange} />{' '}
        <input name="total" placeholder="Total" value={nuevaFactura.total} onChange={handleFacturaChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Cliente</th><th>Total</th></tr></thead>
        <tbody>
          {facturas.map(f => (
            <tr key={f.id}><td>{f.id}</td><td>{f.cliente}</td><td>${f.total}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default FacturasPage;