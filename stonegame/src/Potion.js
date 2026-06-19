import { formatPieces } from "./formatPieces";

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
        background: "rgba(214,205,190,0.05)",
        border: "0.5px solid rgba(214,205,190,0.14)",
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "clamp(12px, 3.2vw, 14px)", color: "rgba(255,255,255,0.54)" }}>회복 물약</span>
        <span style={{ fontSize: "clamp(14px, 3.8vw, 16px)", fontWeight: 700, color: "rgba(226, 214, 184, 0.92)" }}>
          {formatPieces(potionPrice)}
        </span>
      </div>

      {!canBuy && (
        <p style={{ margin: 0, color: "#ff6b6b", fontSize: "clamp(12px, 3.2vw, 13px)", fontWeight: 600 }}>
          보유 조각이 부족합니다
        </p>
      )}

      <button
        onClick={handleBuyPotion}
        disabled={!canBuy}
        style={{
          padding: "12px",
          border: `0.5px solid ${canBuy ? "rgba(214,205,190,0.18)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px",
          background: canBuy ? "rgba(214,205,190,0.08)" : "rgba(255,255,255,0.04)",
          color: canBuy ? "rgba(226, 214, 184, 0.92)" : "rgba(255,255,255,0.25)",
          cursor: canBuy ? "pointer" : "not-allowed",
          fontSize: "clamp(14px, 3.8vw, 15px)",
          fontWeight: 600,
          width: "100%",
          transition: "background 0.2s",
        }}
      >
        구매하기
      </button>
    </div>
  );
}
