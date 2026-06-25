import { formatPieces } from "./formatPieces";
import { modalButtonRowStyle, modalNumberStyle, primaryActionButtonStyle } from "./modalStyles";

export default function Potion({
  money,
  setMoney,
  potionPrice,
  setPotionPrice,
  setReviveCount,
  setMoss,
  setCrack,
  setForfeitedReward,
  setGameOver,
  setMessage,
  sideAction = null,
}) {
  const canBuy = money >= potionPrice;

  function handleBuyPotion() {
    if (!canBuy) return;
    setMoney(prev => prev - potionPrice);
    setMoss(0);
    setCrack(0);
    setForfeitedReward(0);
    setReviveCount(prev => prev + 1);
    setPotionPrice(prev => prev * 2);
    setGameOver(false);
    setMessage("");
  }

  return (
    <div style={wrapStyle}>
      <div style={hourglassWrapStyle}>
        <img src="hourglass.png" alt="" style={hourglassImageStyle} />
      </div>

      <p style={priceLineStyle}>
        <span>역행 시계</span>
        <span aria-hidden="true"> · </span>
        <strong style={modalNumberStyle}>{formatPieces(potionPrice)}</strong>
      </p>

      {!canBuy && (
        <p style={warningStyle}>
          보유 조각이 부족합니다
        </p>
      )}

      <div
        style={{
          ...modalButtonRowStyle,
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <button
          onClick={handleBuyPotion}
          disabled={!canBuy}
          style={{
            ...primaryActionButtonStyle,
            border: `0.5px solid ${canBuy ? "#343740" : "#2B2D34"}`,
            background: canBuy
              ? primaryActionButtonStyle.background
              : "#16181d",
            color: canBuy
              ? primaryActionButtonStyle.color
              : "rgba(176,182,194,0.25)",
            cursor: canBuy ? "pointer" : "not-allowed",
            boxShadow: "none",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
          }}
        >
          사용하기
        </button>
        {sideAction}
      </div>
    </div>
  );
}

const wrapStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
};

const hourglassWrapStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2,
};

const hourglassImageStyle = {
  width: 24,
  height: 24,
  objectFit: "contain",
  opacity: 0.88,
};

const priceLineStyle = {
  margin: 0,
  color: "rgba(214,219,227,0.86)",
  fontSize: "clamp(13px, 3.5vw, 15px)",
  fontWeight: 600,
  lineHeight: 1.2,
  textAlign: "center",
};

const warningStyle = {
  margin: 0,
  color: "rgba(176,182,194,0.62)",
  fontSize: "clamp(12px, 3.2vw, 13px)",
  fontWeight: 600,
  textAlign: "center",
};
