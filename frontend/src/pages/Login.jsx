import { useState } from 'react';
import api from '../api/axios';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sistema de OS</h1>
        <p style={styles.subtitle}>Faça login para continuar</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="seu@email.com"
            />
          </div>

          <div style={styles.field}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="sua senha"
            />
          </div>

          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  box: {
    backgroundColor: '#fff', padding: '40px',
    borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%', maxWidth: '400px',
  },
  title: { margin: '0 0 8px', color: '#333' },
  subtitle: { margin: '0 0 24px', color: '#666' },
  error: { color: 'red', marginBottom: '16px' },
  field: { marginBottom: '16px' },
  input: {
    width: '100%', padding: '10px',
    border: '1px solid #ddd', borderRadius: '4px',
    fontSize: '14px', marginTop: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%', padding: '12px',
    backgroundColor: '#1890ff', color: '#fff',
    border: 'none', borderRadius: '4px',
    fontSize: '16px', cursor: 'pointer',
  },
};

export default Login;