import { formatPieces } from "./formatPieces";
import { primaryActionButtonStyle } from "./modalStyles";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{
        background: "#16181d",
        border: "0.5px solid #2B2D34",
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "clamp(12px, 3.2vw, 14px)", color: "rgba(176,182,194,0.54)" }}>회복 물약</span>
        <span style={{ fontSize: "clamp(14px, 3.8vw, 16px)", fontWeight: 700, color: "rgba(214,219,227,0.92)" }}>
          {formatPieces(potionPrice)}
        </span>
      </div>

      {!canBuy && (
        <p style={{ margin: 0, color: "rgba(176,182,194,0.62)", fontSize: "clamp(12px, 3.2vw, 13px)", fontWeight: 600 }}>
          보유 조각이 부족합니다
        </p>
      )}

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
          width: "100%",
          boxShadow: "none",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        }}
      >
        구매하기
      </button>
    </div>
  );
}
