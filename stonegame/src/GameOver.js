import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Potion from "./Potion";

export default function GameOver({
  money,
  setMoney,
  moss,
  setMoss,
  crack,
  setCrack,
  gameOver,
  setGameOver,
  message,
  setMessage,
  potionPrice,
  setPotionPrice,
  reviveCount,
  setReviveCount,
  setCombo,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (gameOver) return;

    if (moss >= 100 || crack >= 100) {
      const nextPotionPrice = (reviveCount + 1) * 50;

      setPotionPrice(nextPotionPrice);
      setMessage("Game Over! 물약을 구매해서 이어서 하거나 게임을 종료하세요.");
      setGameOver(true);
    }
  }, [
    moss,
    crack,
    gameOver,
    reviveCount,
    setGameOver,
    setMessage,
    setPotionPrice,
  ]);

  function handleExitGame() {
    setGameOver(false);
    setMessage("");
    setMoss(0);
    setCrack(0);
    if (setCombo) setCombo(1);
    navigate("/");
  }

  if (!gameOver) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ margin: 0 }}>게임 오버</h2>
        <p style={{ margin: 0, color: "#ddd" }}>{message}</p>

        <Potion
          money={money}
          setMoney={setMoney}
          potionPrice={potionPrice}
          setPotionPrice={setPotionPrice}
          reviveCount={reviveCount}
          setReviveCount={setReviveCount}
          setMoss={setMoss}
          setCrack={setCrack}
          setGameOver={setGameOver}
          setMessage={setMessage}
          setCombo={setCombo}
        />

        <button onClick={handleExitGame} style={exitBtnStyle}>
          게임 종료하기
        </button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  padding: "clamp(16px, 5vw, 24px)",
  boxSizing: "border-box",
};

const modalStyle = {
  width: "min(100%, 360px)",
  background: "#1b1b1b",
  color: "#fff",
  padding: "clamp(18px, 5vw, 24px)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  textAlign: "center",
  boxSizing: "border-box",
};

const exitBtnStyle = {
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#444",
  color: "#fff",
  cursor: "pointer",
};
