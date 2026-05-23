export default function Potion({
  money,
  setMoney,
  potionPrice,
  reviveCount,
  setReviveCount,
  setMoss,
  setCrack,
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
    if (setCombo) setCombo(1);

    setReviveCount(prev => prev + 1);
    setGameOver(false);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p style={{ margin: 0 }}>포션 가격: {potionPrice}원</p>
      <p style={{ margin: 0 }}>현재 부활 횟수: {reviveCount}회</p>

      {!canBuy && (
        <p style={{ margin: 0, color: "#ff6b6b", fontWeight: "bold" }}>
          살 수 없습니다.
        </p>
      )}

      <button
        onClick={handleBuyPotion}
        disabled={!canBuy}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          background: canBuy ? "#6bcb77" : "#666",
          color: "#fff",
          cursor: canBuy ? "pointer" : "not-allowed",
        }}
      >
        물약 구매
      </button>
    </div>
  );
}