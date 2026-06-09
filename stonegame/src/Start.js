import { useNavigate } from 'react-router-dom';
import TopRightIconButton from "./TopRightIconButton";
import MoneyHeader from "./MoneyHeader";
import { crystals } from "./crystals";
import { screenShellStyle } from "./screenStyles";

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

        <button
          onClick={handleBuy}
          disabled={!canBuy}
          style={{
            padding: "16px 24px",
            borderRadius: 12,
            background: canBuy ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${canBuy ? "rgba(228, 223, 212, 0.24)" : "rgba(255,255,255,0.08)"}`,
            color: canBuy ? "#ece7dc" : "rgba(255,255,255,0.28)",
            fontSize: "clamp(16px, 4.2vw, 18px)",
            fontWeight: 700,
            cursor: canBuy ? "pointer" : "not-allowed",
            letterSpacing: "0.04em",
            marginTop: 10,
            width: "min(100%, 320px)",
            boxShadow: canBuy ? "inset 0 -1px 0 rgba(255,255,255,0.08)" : "none",
          }}
        >
          {crystal.price === 0 ? "시작하기" : "플레이"}
        </button>
      </div>
    </div>
  );
}

const startScreenStyle = {
  ...screenShellStyle,
};

const contentColumnStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: "clamp(112px, 27vw, 136px)",
};

const subtitleStyle = {
  color: "rgba(255,255,255,0.5)",
  fontSize: "clamp(11px, 2.8vw, 13px)",
  letterSpacing: "0.18em",
  margin: "0 0 clamp(12px, 3vw, 16px)",
  textAlign: "center",
};

const sliderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(12px, 4vw, 32px)",
  width: "100%",
  marginBottom: "clamp(12px, 3vw, 16px)",
};

const crystalPreviewStyle = {
  position: "relative",
  width: "min(62vw, 260px)",
  aspectRatio: "1 / 1",
  flex: "0 1 auto",
};

const crystalNameStyle = {
  color: "#fff",
  fontSize: "clamp(18px, 4.8vw, 22px)",
  fontWeight: 700,
  margin: "0 0 clamp(8px, 2.2vw, 14px)",
  textAlign: "center",
};

const priceBlockStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  minHeight: 36,
};

const priceValueStyle = {
  fontSize: "clamp(16px, 4vw, 19px)",
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  fontVariantNumeric: "tabular-nums",
  textAlign: "center",
};

const priceNoticeStyle = {
  color: "rgba(255,255,255,0.34)",
  fontSize: "clamp(12px, 3vw, 13px)",
  fontWeight: 500,
  lineHeight: 1.3,
  textAlign: "center",
};

const arrowImageButtonStyle = {
  width: 35,
  height: 35,
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const arrowImageStyle = {
  width: 35,
  height: 35,
  objectFit: "contain",
  display: "block",
};
