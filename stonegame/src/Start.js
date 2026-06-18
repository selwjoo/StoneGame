import { useNavigate } from 'react-router-dom';
import { crystals } from './crystalList';
import BackgroundEffect from './BackgroundEffect';
import { formatPieces } from './formatPieces';
import MoneyHeader from './MoneyHeader';
import BenefitRecord from './BenefitRecord';

export default function Start({ money, setMoney, selectedCrystal, setSelectedCrystal }) {
  const navigate = useNavigate();

  function prev() { setSelectedCrystal(i => (i - 1 + crystals.length) % crystals.length); }
  function next() { setSelectedCrystal(i => (i + 1) % crystals.length); }

  const crystal = crystals[selectedCrystal];
  const canBuy  = money >= crystal.price;

  function handleBuy() {
    if (!canBuy) return;
    if (crystal.price > 0) setMoney(prev => prev - crystal.price);
    navigate('/money');
  }

  return (
    <>
    <BackgroundEffect crystalName={crystal.name} />
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
      minHeight: "100dvh",
      padding: "calc(env(safe-area-inset-top,0px) + 20px) clamp(16px,5vw,28px) calc(env(safe-area-inset-bottom,0px) + 24px)",
      boxSizing: "border-box",
      position: "relative", zIndex: 1, width: "100%", maxWidth: 520, margin: "0 auto",
    }}>
      <MoneyHeader money={money} titleOffset={4} moneyOffset={24} />

      <div style={contentColumnStyle}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(11px,2.8vw,13px)", letterSpacing: "0.18em", margin: "0 0 clamp(20px,5vw,28px)", textAlign: "center" }}>
          돌멩이를 선택하세요
        </p>


      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px,4vw,32px)", width: "100%", marginBottom: "clamp(22px,5vw,28px)" }}>
        <button type="button" onClick={prev} style={arrowBtn} aria-label="이전 크리스탈">
          <img src="/left.png" alt="" style={arrowImageStyle} />
        </button>

        <div style={{ position: "relative", width: "min(62vw,260px)", aspectRatio: "1/1", flex: "0 1 auto" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", ...crystal.style, transition: "all 0.3s ease" }} />
          <div style={{
            position: "absolute", top: "14%", left: "20%", width: "35%", height: "22%",
            borderRadius: "50%", background: "rgba(255,255,255,0.28)", filter: "blur(6px)", pointerEvents: "none",
          }} />
        </div>

        <button type="button" onClick={next} style={arrowBtn} aria-label="다음 크리스탈">
          <img src="/right.png" alt="" style={arrowImageStyle} />
        </button>
      </div>

      <div style={infoStackStyle}>
        <p style={nameStyle}>
          {crystal.name} 돌멩이
        </p>
        <p style={descriptionStyle}>
          {crystal.description}
        </p>
        <BenefitRecord benefit={crystal.benefit} />
      </div>

      <div style={actionStackStyle}>
        {/* 가격 */}
        <p style={{ ...priceStyle, color: canBuy ? "#7FD88A" : "#FF5C5C" }}>
          {crystal.price === 0 ? "보유 중" : formatPieces(crystal.price)}
        </p>

        {/* 구매 버튼 */}
        <button
          onClick={handleBuy} disabled={!canBuy}
          style={{
            padding: "14px 24px", borderRadius: 40,
            background: "transparent",
            border: "none",
            color: canBuy ? "#fff" : "rgba(255,255,255,0.3)",
            fontSize: "clamp(16px,4.2vw,18px)", fontWeight: 700,
            cursor: canBuy ? "pointer" : "not-allowed",
            letterSpacing: "0.05em", width: "min(100%,320px)",
          }}
        >
          {crystal.price === 0 ? "플레이하기 ▶" : "구매 후 플레이 ▶"}
        </button>
      </div>
      </div>
    </div>
    </>
  );
}

const contentColumnStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: "clamp(128px,31vw,152px)",
};

const infoStackStyle = {
  width: "min(100%, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 11,
  textAlign: "center",
  marginBottom: 10,
};

const nameStyle = {
  color: "#fff",
  fontSize: "clamp(18px,4.8vw,22px)",
  fontWeight: 700,
  margin: 0,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
};

const descriptionStyle = {
  color: "rgba(255,255,255,0.42)",
  fontSize: "clamp(12px,3vw,14px)",
  margin: 0,
  lineHeight: 1.52,
  maxWidth: "min(100%, 260px)",
};

const actionStackStyle = {
  width: "min(100%, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
};

const priceStyle = {
  color: "#7FD88A",
  fontSize: "clamp(14px,3.8vw,16px)",
  fontWeight: 600,
  margin: 0,
  textAlign: "center",
  maxWidth: "min(100%,320px)",
  lineHeight: 1.4,
};

const arrowBtn = {
  width: "clamp(42px,11vw,48px)", height: "clamp(42px,11vw,48px)", borderRadius: "50%",
  background: "transparent", border: "none",
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const arrowImageStyle = {
  width: 28,
  height: 28,
  objectFit: "contain",
  display: "block",
  opacity: 0.8,
};
