import React, { useEffect, useState } from 'react';

function CotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [nuevaCot, setNuevaCot] = useState({ cliente: '', total: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cotizaciones/')
      .then(r => r.json()).then(setCotizaciones)
      .catch(() => setError('No se pudieron cargar las cotizaciones.'));
  }, []);

  const handleCotChange = e => setNuevaCot({ ...nuevaCot, [e.target.name]: e.target.value });
  const handleCotSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/cotizaciones/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCot)
      });
      if (!res.ok) throw new Error();
      const cot = await res.json();
      setCotizaciones([...cotizaciones, cot]);
      setNuevaCot({ cliente: '', total: '' });
    } catch {
      setError('Error al crear cotización');
    }
  };

  return (
    <section>
      <h2>Cotizaciones</h2>
      <form onSubmit={handleCotSubmit} style={{ marginBottom: 16 }}>
        <input name="cliente" placeholder="Cliente ID" value={nuevaCot.cliente} onChange={handleCotChange} />{' '}
        <input name="total" placeholder="Total" value={nuevaCot.total} onChange={handleCotChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Cliente</th><th>Total</th></tr></thead>
        <tbody>
          {cotizaciones.map(c => (
            <tr key={c.id}><td>{c.id}</td><td>{c.cliente}</td><td>${c.total}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CotizacionesPage;