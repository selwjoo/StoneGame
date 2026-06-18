import { useNavigate } from 'react-router-dom';
import { crystals } from './crystalList';
import BackgroundEffect from './BackgroundEffect';
import { formatPieces } from './formatPieces';
import MoneyHeader from './MoneyHeader';
import BenefitRecord from './BenefitRecord';

export default function Start({
  money,
  setMoney,
  unlockedCrystals,
  setUnlockedCrystals,
  selectedCrystal,
  setSelectedCrystal,
}) {
  const navigate = useNavigate();

  function prev() { setSelectedCrystal(i => (i - 1 + crystals.length) % crystals.length); }
  function next() { setSelectedCrystal(i => (i + 1) % crystals.length); }

  const crystal = crystals[selectedCrystal];
  const isOwned = unlockedCrystals.includes(selectedCrystal);
  const canBuy  = isOwned || money >= crystal.price;
  const hasBenefit = Boolean(crystal.benefit);

  function handleBuy() {
    if (!canBuy) return;

    if (!isOwned && crystal.price > 0) {
      setMoney(prev => prev - crystal.price);
      setUnlockedCrystals(prev => [...prev, selectedCrystal]);
    }

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

      <div style={isOwned ? infoStackOwnedStyle : hasBenefit ? infoStackStyle : infoStackNoBenefitStyle}>
        <p style={nameStyle}>
          {crystal.name} 돌멩이
        </p>
        <p style={isOwned ? descriptionOwnedStyle : hasBenefit ? descriptionStyle : descriptionNoBenefitStyle}>
          {crystal.description}
        </p>
        <BenefitRecord benefit={crystal.benefit} />
      </div>

      <div style={isOwned ? actionStackOwnedStyle : hasBenefit ? actionStackStyle : actionStackNoBenefitStyle}>
        <p style={{ ...priceStyle, color: canBuy ? "#7FD88A" : "#FF5C5C" }}>
          {isOwned ? "보유 중" : formatPieces(crystal.price)}
        </p>

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
          {isOwned ? "플레이하기 ▶" : "구매 후 플레이 ▶"}
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
  marginBottom: 14,
};

const infoStackNoBenefitStyle = {
  ...infoStackStyle,
  gap: 10,
  marginBottom: 18,
};

const infoStackOwnedStyle = {
  ...infoStackStyle,
  gap: 9,
  marginBottom: 12,
};

const nameStyle = {
  color: "#fff",
  fontSize: "clamp(18px,4.8vw,22px)",
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
};

const descriptionStyle = {
  color: "rgba(255,255,255,0.42)",
  fontSize: "clamp(12px,3vw,14px)",
  margin: 0,
  lineHeight: 1.52,
  maxWidth: "min(100%, 264px)",
};

const descriptionNoBenefitStyle = {
  ...descriptionStyle,
  lineHeight: 1.56,
  maxWidth: "min(100%, 240px)",
};

const descriptionOwnedStyle = {
  ...descriptionNoBenefitStyle,
  maxWidth: "min(100%, 220px)",
};

const actionStackStyle = {
  width: "min(100%, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
};

const actionStackNoBenefitStyle = {
  ...actionStackStyle,
  gap: 5,
};

const actionStackOwnedStyle = {
  ...actionStackStyle,
  gap: 2,
};

const priceStyle = {
  fontSize: "clamp(14px,3.8vw,16px)",
  fontWeight: 600,
  margin: 0,
  textAlign: "center",
  lineHeight: 1.35,
};

const arrowBtn = {
  width: "clamp(42px,11vw,48px)", height: "clamp(42px,11vw,48px)", borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  backdropFilter: "blur(6px)",
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const arrowImageStyle = {
  width: 24,
  height: 24,
  objectFit: "contain",
  display: "block",
  opacity: 0.98,
  filter: "brightness(1.25)",
};
