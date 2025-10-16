import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Credenciales incorrectas');
      const data = await res.json();
      // Obtener info de usuario y rol
      const userRes = await fetch('http://127.0.0.1:8000/api/user/', {
        headers: { 'Authorization': `Token ${data.token}` }
      });
      const user = await userRes.json();
      onLogin({ token: data.token, username: user.username, is_superuser: user.is_superuser, cargo: user.cargo });
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
