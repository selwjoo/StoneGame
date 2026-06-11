import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TopRightIconButton from "./TopRightIconButton";
import MoneyHeader from "./MoneyHeader";
import { crystals } from "./crystals";
import { screenShellStyle } from "./screenStyles";

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
  const isOwned = ownedCrystals.includes(selectedCrystal);
  const canBuy = isOwned || money >= crystal.price;

  function handleAction() {
    if (isOwned) {
      navigate('/money', { state: { probMultiplier: crystal.probMultiplier } });
      return;
    }
    if (!canBuy) return;
    setMoney(prev => prev - crystal.price);
    setOwnedCrystals(prev => [...prev, selectedCrystal]);
    navigate('/money', { state: { probMultiplier: crystal.probMultiplier } });
  }

  return (
    <div style={startScreenStyle}>
      <TopRightIconButton src="/explain.png" alt="설명" />
      <MoneyHeader money={money} />

      <div style={contentColumnStyle}>
        <p style={subtitleStyle}>
          크리스탈을 선택하세요
        </p>

        <div style={sliderStyle}>
          <button type="button" onClick={prev} style={arrowImageButtonStyle} aria-label="이전 크리스탈">
            <img src="/left.png" alt="" style={arrowImageStyle} />
          </button>

          <div style={crystalPreviewStyle}>
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

          <button type="button" onClick={next} style={arrowImageButtonStyle} aria-label="다음 크리스탈">
            <img src="/right.png" alt="" style={arrowImageStyle} />
          </button>
        </div>

        <p style={crystalNameStyle}>
          {crystal.name} 돌멩이
        </p>

        <div style={priceBlockStyle}>
          <div
            style={{
              ...priceValueStyle,
              color: canBuy ? "#cec9be" : "#b88c8c",
            }}
          >
            {crystal.price === 0 ? "무료" : `${crystal.price.toLocaleString()}원`}
          </div>
          {!canBuy && (
            <div style={priceNoticeStyle}>
              잔액이 부족합니다
            </div>
          )}
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
        {isOwned
          ? "보유중 ✅"
          : crystal.price === 0
            ? "무료"
            : `${crystal.price.toLocaleString()}원`}
        {!isOwned && !canBuy && "  (돈이 부족해요)"}
      </p>

      {/* 단단함(확률) 표시 */}
      <p style={{
        color: "rgba(255,255,255,0.55)",
        fontSize: "clamp(11px, 2.8vw, 13px)",
        margin: 0,
        textAlign: "center",
      }}>
        🪨 단단함: {Math.round((1 - crystal.probMultiplier) * 100)}%
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
        onClick={handleAction}
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
        {isOwned || crystal.price === 0 ? "플레이하기 ▶" : "구매 후 플레이 ▶"}
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
