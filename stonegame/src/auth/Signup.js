import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from './';
import AuthShell, {
  authButtonStyle,
  authErrorStyle,
  authFieldGroupStyle,
  authInputStyle,
  authLabelStyle,
} from './AuthShell';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await apiFetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.username ? data.username[0] : '회원가입 실패');
        return;
      }

      alert('회원가입 성공! 로그인 해주세요.');
      navigate('/');
    } catch (err) {
      setError('서버에 연결할 수 없습니다.');
    }
  };

  return (
    <AuthShell
      subtitle=""
      leftAction={(
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="로그인 화면으로 돌아가기"
          style={exitButtonStyle}
        >
          <img src="backTologin.png" alt="" style={exitImageStyle} />
        </button>
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
          회원가입
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

const exitButtonStyle = {
  width: 36,
  height: 36,
  padding: 0,
  border: 'none',
  background: 'transparent',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.82,
  transform: 'translate(-5px, 3px)',
};

const exitImageStyle = {
  width: 22,
  height: 22,
  objectFit: 'contain',
};

export default Signup;
