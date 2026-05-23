import { useNavigate } from 'react-router-dom';

const crystals = [
  {
    name: "레인보우",
    price: 0, // 기본 무료
    style: {
      background: "radial-gradient(circle at 35% 30%, #ff9a9e, #ffd93d 30%, #6bcb77 55%, #4d96ff 75%, #c77dff)",
      boxShadow: "0 8px 40px rgba(180,107,255,0.45)",
    },
  },
  {
    name: "오션",
    price: 100,
    style: {
      background: "radial-gradient(circle at 35% 30%, #a8edea, #4d96ff 45%, #0d47a1 80%)",
      boxShadow: "0 8px 40px rgba(77,150,255,0.45)",
    },
  },
  {
    name: "파이어",
    price: 300,
    style: {
      background: "radial-gradient(circle at 35% 30%, #fff176, #ffd93d 30%, #ff6b35 60%, #c0392b)",
      boxShadow: "0 8px 40px rgba(255,107,53,0.5)",
    },
  },
  {
    name: "갤럭시",
    price: 500,
    style: {
      background: "radial-gradient(circle at 35% 30%, #e0c3fc, #c77dff 35%, #6a0dad 65%, #1a003d)",
      boxShadow: "0 8px 40px rgba(199,125,255,0.5)",
    },
  },
];

export default function Start({ money, setMoney, selectedCrystal, setSelectedCrystal }) {
  const navigate = useNavigate();

  function prev() {
    setSelectedCrystal(i => (i - 1 + crystals.length) % crystals.length);
  }
  function next() {
    setSelectedCrystal(i => (i + 1) % crystals.length);
  }

  const crystal = crystals[selectedCrystal];
  const canBuy = money >= crystal.price;

  function handleBuy() {
    if (!canBuy) return;
    if (crystal.price > 0) setMoney(prev => prev - crystal.price);
    navigate('/money');
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: 28,
    }}>

      {/* 현재 보유 돈 */}
      <div style={{
        background: "rgba(255,249,160,0.12)",
        border: "1px solid rgba(255,249,160,0.3)",
        color: "#fffaaa",
        fontSize: 20,
        fontWeight: 700,
        padding: "10px 32px",
        borderRadius: 14,
      }}>
        💰 {money.toLocaleString()}원
      </div>

      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.2em", margin: 0 }}>
        크리스탈을 선택하세요
      </p>

      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <button onClick={prev} style={arrowBtn}>‹</button>

        <div style={{ position: "relative", width: 200, height: 200 }}>
          <div style={{
            width: "100%", height: "100%",
            borderRadius: "50%",
            ...crystal.style,
            transition: "all 0.3s ease",
          }} />
          <div style={{
            position: "absolute", top: "14%", left: "20%",
            width: "35%", height: "22%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.28)",
            filter: "blur(6px)",
            pointerEvents: "none",
          }} />
        </div>

        <button onClick={next} style={arrowBtn}>›</button>
      </div>

      {/* 크리스탈 이름 */}
      <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
        {crystal.name} 크리스탈
      </p>

      {/* 가격 */}
      <p style={{
        color: canBuy ? "#6bcb77" : "#ff6b6b",
        fontSize: 16,
        fontWeight: 600,
        margin: 0,
      }}>
        {crystal.price === 0 ? "무료" : `${crystal.price.toLocaleString()}원`}
        {!canBuy && "  (돈이 부족해요)"}
      </p>

      {/* 구매 & 플레이 버튼 */}
      <button
        onClick={handleBuy}
        disabled={!canBuy}
        style={{
          padding: "14px 48px",
          borderRadius: 40,
          background: canBuy
            ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${canBuy ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
          color: canBuy ? "#fff" : "rgba(255,255,255,0.3)",
          fontSize: 18,
          fontWeight: 700,
          cursor: canBuy ? "pointer" : "not-allowed",
          letterSpacing: "0.05em",
          marginTop: 8,
        }}
      >
        {crystal.price === 0 ? "플레이하기 ▶" : `구매 후 플레이 ▶`}
      </button>
    </div>
  );
}

const arrowBtn = {
  width: 48, height: 48, borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.7)",
  fontSize: 20, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};