import React, { useEffect, useState } from 'react';

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    rut: '',
    puesto: '',
    cargo: '',
    email: '',
    fecha_ingreso: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const cargos = [
    'Empleado',
    'Recursos Humanos',
    'Soporte',
    'Bodega'
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/empleados/')
      .then(r => r.json()).then(setEmpleados)
      .catch(() => setError('No se pudieron cargar los empleados.'));
  }, []);

  const handleEmpleadoChange = e => setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
  const handleEmpleadoSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/empleados/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado)
      });
      if (!res.ok) throw new Error();
      const emp = await res.json();
      setEmpleados([...empleados, emp]);
        setNuevoEmpleado({
          nombre: '',
          rut: '',
          puesto: '',
          cargo: '',
          email: '',
          fecha_ingreso: '',
          username: '',
          password: ''
        });
    } catch {
      setError('Error al crear empleado');
    }
  };

  return (
    <section>
      <h2>Empleados</h2>
      <form onSubmit={handleEmpleadoSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre" placeholder="Nombre" value={nuevoEmpleado.nombre} onChange={handleEmpleadoChange} />{' '}
        <input name="rut" placeholder="RUT" value={nuevoEmpleado.rut} onChange={handleEmpleadoChange} />{' '}
        <select name="cargo" value={nuevoEmpleado.cargo} onChange={handleEmpleadoChange}>
          <option value="">Seleccione cargo</option>
          {cargos.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>{' '}
        <input name="email" type="email" placeholder="Email" value={nuevoEmpleado.email} onChange={handleEmpleadoChange} />{' '}
        <input name="fecha_ingreso" type="date" placeholder="Fecha de ingreso" value={nuevoEmpleado.fecha_ingreso} onChange={handleEmpleadoChange} />{' '}
        <input name="username" placeholder="Usuario" value={nuevoEmpleado.username} onChange={handleEmpleadoChange} />{' '}
        <input name="password" type="password" placeholder="Contraseña" value={nuevoEmpleado.password} onChange={handleEmpleadoChange} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead><tr><th>ID</th><th>Nombre</th><th>Puesto</th></tr></thead>
        <tbody>
          {empleados.map(e => (
            <tr key={e.id}><td>{e.id}</td><td>{e.nombre}</td><td>{e.puesto}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EmpleadosPage;