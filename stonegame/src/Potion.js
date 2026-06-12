export default function Potion({
  money,
  setMoney,
  potionPrice,
  setPotionPrice,
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
    setPotionPrice(prev => prev * 3)  // <- 살 수록 3배씩 비싸진ㅁ.. 크하학
    setGameOver(false);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p style={{ margin: 0, lineHeight: 1.4, wordBreak: "keep-all" }}>포션 가격: {potionPrice}원</p>

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
          width: "100%",
        }}
      >
        물약 구매
      </button>
    </div>
  );
}
