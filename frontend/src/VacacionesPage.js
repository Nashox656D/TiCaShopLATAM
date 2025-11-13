import React, { useEffect, useState } from 'react';

export default function VacacionesPage({ usuario }) {
  const [vacaciones, setVacaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({ empleado: '', fecha_inicio: '', fecha_fin: '' });
  const cargo = usuario && usuario.cargo ? usuario.cargo : null;

  useEffect(() => {
    const headers = {};
    if (usuario && usuario.token) headers['Authorization'] = `Token ${usuario.token}`;

    fetch('http://127.0.0.1:8000/api/vacaciones/', { headers })
      .then(r => {
        if (!r.ok) {
          setVacaciones([]);
          return r.json().then(data => { throw new Error(data.detail || `HTTP ${r.status}`); });
        }
        return r.json();
      })
      .then(setVacaciones)
      .catch(() => setVacaciones([]));

    if (cargo === 'Recursos Humanos') {
      fetch('http://127.0.0.1:8000/api/empleados/', { headers })
        .then(r => (r.ok ? r.json() : []))
        .then(setEmpleados)
        .catch(() => setEmpleados([]));
    }
  }, [cargo, usuario]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const body = { fecha_inicio: form.fecha_inicio, fecha_fin: form.fecha_fin };
    if (cargo === 'Recursos Humanos' && form.empleado) body.empleado = form.empleado;
    const headers = { 'Content-Type': 'application/json' };
    if (usuario && usuario.token) headers['Authorization'] = `Token ${usuario.token}`;

    const res = await fetch('http://127.0.0.1:8000/api/vacaciones/', {
      method: 'POST', headers, body: JSON.stringify(body)
    });
    if (res.ok) {
      const v = await res.json();
      setVacaciones([...vacaciones, v]);
      setForm({ empleado: '', fecha_inicio: '', fecha_fin: '' });
    } else {
      alert('Error al crear la solicitud de vacaciones');
    }
  };

  const handleAprobar = async (id, aprobada) => {
    const headers = { 'Content-Type': 'application/json' };
    if (usuario && usuario.token) headers['Authorization'] = `Token ${usuario.token}`;

    const res = await fetch(`http://127.0.0.1:8000/api/vacaciones/${id}/`, {
      method: 'PATCH', headers, body: JSON.stringify({ aprobada: !aprobada })
    });
    if (res.ok) {
      const updated = await res.json();
      setVacaciones(vacaciones.map(v => v.id === updated.id ? updated : v));
    } else {
      alert('Error al actualizar');
    }
  };

  return (
    <div>
      <h2>Vacaciones</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h3>Solicitudes</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Aprobada</th>
                {cargo === 'Recursos Humanos' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {vacaciones.map(v => (
                <tr key={v.id} style={{ borderTop: '1px solid #ddd' }}>
                  <td>{v.empleado && v.empleado.nombre ? v.empleado.nombre : (v.empleado || '—')}</td>
                  <td>{v.fecha_inicio}</td>
                  <td>{v.fecha_fin}</td>
                  <td>{v.aprobada ? 'Sí' : 'No'}</td>
                  {cargo === 'Recursos Humanos' && (
                    <td><button onClick={() => handleAprobar(v.id, v.aprobada)}>{v.aprobada ? 'Revertir' : 'Aprobar'}</button></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ width: 320 }}>
          <h3>Crear solicitud</h3>
          <form onSubmit={handleSubmit}>
            {cargo === 'Recursos Humanos' && (
              <div>
                <label>Empleado</label>
                <select name="empleado" value={form.empleado} onChange={handleChange}>
                  <option value="">-- seleccionar --</option>
                  {empleados.map(e => <option key={e.id} value={e.id}>{e.nombre} ({e.rut})</option>)}
                </select>
              </div>
            )}
            <div>
              <label>Fecha inicio</label>
              <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} required />
            </div>
            <div>
              <label>Fecha fin</label>
              <input type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} required />
            </div>
            <div style={{ marginTop: 8 }}>
              <button type="submit">Solicitar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
