import React, { useEffect, useState } from 'react';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', rut: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientes/')
      .then(r => r.json()).then(setClientes)
      .catch(() => setError('No se pudieron cargar los clientes.'));
  }, []);

  const handleClienteChange = e => setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  const handleClienteSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/clientes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente)
      });
      if (!res.ok) throw new Error();
      const cli = await res.json();
      setClientes([...clientes, cli]);
      setNuevoCliente({ nombre: '', rut: '', email: '' });
    } catch {
      setError('Error al crear cliente');
    }
  };

  return (
    <section>
      <h2>Clientes</h2>
      <form onSubmit={handleClienteSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre" placeholder="Nombre" value={nuevoCliente.nombre} onChange={handleClienteChange} />{' '}
        <input name="rut" placeholder="RUT" value={nuevoCliente.rut} onChange={handleClienteChange} />{' '}
        <input name="email" placeholder="Email" value={nuevoCliente.email} onChange={handleClienteChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Nombre</th><th>RUT</th><th>Email</th></tr></thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id}><td>{c.id}</td><td>{c.nombre}</td><td>{c.rut}</td><td>{c.email}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ClientesPage;