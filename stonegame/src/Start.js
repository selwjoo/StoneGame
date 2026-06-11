import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Explain from "./Explain";

const crystals = [
  {
    name: "일반",
    price: 0,
    style: {
      background: "radial-gradient(circle at 35% 30%, #d0d0d0, #a0a0a0 40%, #6b6b6b 70%, #3a3a3a)",
      boxShadow: "0 8px 40px rgba(100,100,100,0.4), 0 0 0 2px rgba(255,255,255,0.1) inset",
    },
  },
  {
    name: "오션",
    price: 6000000,
    style: {
      background: "radial-gradient(circle at 35% 30%, #a8edea, #4d96ff 45%, #0d47a1 80%)",
      boxShadow: "0 8px 40px rgba(77,150,255,0.45)",
    },
  },
  {
    name: "파이어",
    price: 90000000000,
    style: {
      background: "radial-gradient(circle at 35% 30%, #fff176, #ffd93d 30%, #ff6b35 60%, #c0392b)",
      boxShadow: "0 8px 40px rgba(255,107,53,0.5)",
    },
  },
  {
    name: "갤럭시",
    price: 100000000000000000000,
    style: {
      background: "radial-gradient(circle at 35% 30%, #e0c3fc, #c77dff 35%, #6a0dad 65%, #1a003d)",
      boxShadow: "0 8px 40px rgba(199,125,255,0.5)",
    },
  },
];

export default function Start({ money, setMoney, selectedCrystal, setSelectedCrystal }) {
  const navigate = useNavigate();
  const [explainHover, setExplainHover] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
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
      minHeight: "100dvh",
      gap: "clamp(18px, 4vw, 28px)",
      padding: "calc(env(safe-area-inset-top, 0px) + 20px) clamp(16px, 5vw, 28px) calc(env(safe-area-inset-bottom, 0px) + 24px)",
      boxSizing: "border-box",
    }}>

      {/* 현재 보유 돈 */}
      <div style={{
        background: "rgba(255,249,160,0.12)",
        border: "1px solid rgba(255,249,160,0.3)",
        color: "#fffaaa",
        fontSize: "clamp(16px, 4.2vw, 20px)",
        fontWeight: 700,
        padding: "clamp(9px, 2.3vw, 10px) clamp(18px, 6vw, 32px)",
        borderRadius: 14,
        maxWidth: "100%",
        textAlign: "center",
      }}>
        💰 {money.toLocaleString()}원
      </div>

      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(11px, 2.8vw, 13px)", letterSpacing: "0.18em", margin: 0, textAlign: "center" }}>
        크리스탈을 선택하세요
      </p>

      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px, 4vw, 32px)", width: "100%" }}>
        <button onClick={prev} style={arrowBtn}>‹</button>

        <div style={{ position: "relative", width: "min(62vw, 260px)", aspectRatio: "1 / 1", flex: "0 1 auto" }}>
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
      <p style={{ color: "#fff", fontSize: "clamp(18px, 4.8vw, 22px)", fontWeight: 700, margin: 0, textAlign: "center" }}>
        {crystal.name} 돌멩이
      </p>

      {/* 가격 */}
      <p style={{
        color: canBuy ? "#6bcb77" : "#ff6b6b",
        fontSize: "clamp(14px, 3.8vw, 16px)",
        fontWeight: 600,
        margin: 0,
        textAlign: "center",
        maxWidth: "min(100%, 320px)",
        lineHeight: 1.4,
      }}>
        {crystal.price === 0 ? "무료" : `${crystal.price.toLocaleString()}원`}
        {!canBuy && "  (돈이 부족해요)"}
      </p>

      
       {/* 설명 버튼 */}
       <button
          onClick={() => setShowExplain(true)}
        onMouseEnter={() => setExplainHover(true)}
        onMouseLeave={() => setExplainHover(false)}
        style={{
          position: "absolute",
          top: "calc(env(safe-area-inset-top, 0px) + 4px)",
          right: "clamp(10px, 3vw, 16px)",
          width: "clamp(40px, 11vw, 44px)",
          height: "clamp(40px, 11vw, 44px)",
          padding: 0,
          border: "none",
          background: explainHover
            ? "rgba(255, 255, 255, 0.50)"
            : "rgba(255, 255, 255, 0.30)",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.18s ease, transform 0.15s ease",
          transform: explainHover ? "scale(1.1)" : "scale(1)",
        }}
      >
        <img
          src="explain.png"
          alt="설명하기"
          style={{
            width: 26,
            height: 26,
            objectFit: "contain",
            opacity: explainHover ? 1 : 0.7,
            transition: "opacity 0.18s ease",
          }}
        />
      </button>

      <Explain showExplain={showExplain} setShowExplain = {setShowExplain} />

      {/* 구매 & 플레이 버튼 */}
      <button
        onClick={handleBuy}
        disabled={!canBuy}
        style={{
          padding: "14px 24px",
          borderRadius: 40,
          background: canBuy
            ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${canBuy ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
          color: canBuy ? "#fff" : "rgba(255,255,255,0.3)",
          fontSize: "clamp(16px, 4.2vw, 18px)",
          fontWeight: 700,
          cursor: canBuy ? "pointer" : "not-allowed",
          letterSpacing: "0.05em",
          marginTop: 8,
          width: "min(100%, 320px)",
        }}
      >
        {crystal.price === 0 ? "플레이하기 ▶" : `구매 후 플레이 ▶`}
      </button>
    </div>
  );
}

const arrowBtn = {
  width: "clamp(42px, 11vw, 48px)", height: "clamp(42px, 11vw, 48px)", borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.7)",
  fontSize: "clamp(18px, 5vw, 20px)", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};
