import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from './';
import AuthShell, {
  authButtonStyle,
  authErrorStyle,
  authFieldGroupStyle,
  authInputStyle,
  authLabelStyle,
  authLinkStyle,
} from './AuthShell';

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
    <AuthShell
      subtitle=""
      footer={(
        <>
          계정이 없나요?{" "}
          <Link to="/signup" style={authLinkStyle}>회원가입</Link>
        </>
      )}
    >
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={authFieldGroupStyle}>
          <label style={authLabelStyle}>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={authInputStyle}
          />
        </div>

        <div style={authFieldGroupStyle}>
          <label style={authLabelStyle}>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={authInputStyle}
          />
        </div>

        {error && <p style={authErrorStyle}>{error}</p>}

        <button type="submit" style={authButtonStyle}>
          로그인
        </button>
      </form>
    </AuthShell>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

export default Login;
