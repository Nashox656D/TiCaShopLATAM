import React, { useEffect, useState } from 'react';

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [nuevoTicket, setNuevoTicket] = useState({ asunto: '', descripcion: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tickets/')
      .then(r => r.json()).then(setTickets)
      .catch(() => setError('No se pudieron cargar los tickets.'));
  }, []);

  const handleTicketChange = e => setNuevoTicket({ ...nuevoTicket, [e.target.name]: e.target.value });
  const handleTicketSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoTicket)
      });
      if (!res.ok) throw new Error();
      const t = await res.json();
      setTickets([...tickets, t]);
      setNuevoTicket({ asunto: '', descripcion: '' });
    } catch {
      setError('Error al crear ticket');
    }
  };

  return (
    <section>
      <h2>Tickets de Soporte</h2>
      <form onSubmit={handleTicketSubmit} style={{ marginBottom: 16 }}>
        <input name="asunto" placeholder="Asunto" value={nuevoTicket.asunto} onChange={handleTicketChange} />{' '}
        <input name="descripcion" placeholder="Descripción" value={nuevoTicket.descripcion} onChange={handleTicketChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Asunto</th><th>Descripción</th></tr></thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}><td>{t.id}</td><td>{t.asunto}</td><td>{t.descripcion}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TicketsPage;