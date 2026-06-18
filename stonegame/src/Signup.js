import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
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
      navigate('/login');
    } catch (err) {
      setError('서버에 연결할 수 없습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{
        background: '#16161f', padding: '40px', borderRadius: '12px',
        boxShadow: '0 0 30px rgba(120, 80, 255, 0.2)', width: '320px',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center', letterSpacing: '2px' }}>회원가입</h2>

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

        {error && <p style={{ color: '#ff6b6b', fontSize: '13px', margin: 0, textAlign: 'center' }}>{error}</p>}

        <button type="submit" style={{
          padding: '12px', borderRadius: '8px', border: 'none',
          background: 'linear-gradient(135deg, #7b5cff, #5c3fff)',
          color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '8px',
        }}>
          가입하기
        </button>

        <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          이미 계정이 있나요? <Link to="/login" style={{ color: '#9b8cff' }}>로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;