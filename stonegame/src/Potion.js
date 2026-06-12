export default function Potion({
  money,
  setMoney,
  potionPrice,
  setPotionPrice,
  setReviveCount,
  setMoss,
  setCrack,
  setPendingMoney,
  setGameOver,
  setMessage,
  setCombo,
}) {
  const canBuy = money >= potionPrice;

  function handleBuyPotion() {
    if (!canBuy) return;
    setMoney(prev => prev - potionPrice);
    setMoss(0);
    setCrack(0);
    setPendingMoney(0);
    if (setCombo) setCombo(1);
    setReviveCount(prev => prev + 1);
    setPotionPrice(prev => prev * 3);
    setGameOver(false);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{
        background: "rgba(107,203,119,0.08)",
        border: "0.5px solid rgba(107,203,119,0.2)",
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "clamp(12px, 3.2vw, 14px)", color: "rgba(255,255,255,0.5)" }}>회복 물약</span>
        <span style={{ fontSize: "clamp(14px, 3.8vw, 16px)", fontWeight: 700, color: "#6bcb77" }}>
          {potionPrice.toLocaleString()}원
        </span>
      </div>

      {!canBuy && (
        <p style={{ margin: 0, color: "#ff6b6b", fontSize: "clamp(12px, 3.2vw, 13px)", fontWeight: 600 }}>
          보유 금액이 부족합니다
        </p>
      )}

      <button
        onClick={handleBuyPotion}
        disabled={!canBuy}
        style={{
          padding: "12px",
          border: `0.5px solid ${canBuy ? "rgba(107,203,119,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px",
          background: canBuy ? "rgba(107,203,119,0.12)" : "rgba(255,255,255,0.04)",
          color: canBuy ? "#6bcb77" : "rgba(255,255,255,0.25)",
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