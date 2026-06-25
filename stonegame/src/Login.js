import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from './auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await apiFetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('아이디 또는 비밀번호를 확인하세요.');
        return;
      }

      const data = await res.json();
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('username', username);

      window.location.href = '/start';
    } catch (err) {
      setError('서버에 연결할 수 없습니다.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: '16px',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#16161f',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 0 30px rgba(120, 80, 255, 0.2)',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px', letterSpacing: '2px' }}>
          로그인
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0f', color: '#fff', outline: 'none', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0f', color: '#fff', outline: 'none', fontSize: '14px' }}
          />
        </div>

        {error && (
          <p style={{ color: '#ff6b6b', fontSize: '13px', margin: 0, textAlign: 'center' }}>
            {error}
          </p>
        )}

        <button type="submit" style={{
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(135deg, #7b5cff, #5c3fff)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '15px',
          cursor: 'pointer',
          marginTop: '8px',
        }}>
          로그인
        </button>
      </form>

      <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: 0 }}>
        계정이 없나요? <Link to="/signup" style={{ color: '#9b8cff' }}>회원가입</Link>
      </p>
    </div>
  );
}

export default Login;
