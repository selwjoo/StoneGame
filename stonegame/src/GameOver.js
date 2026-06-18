import { useNavigate } from "react-router-dom";
import Potion from "./Potion";

export default function GameOver({
  totalMoney,
  setTotalMoney,
  setPendingMoney,
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

  function handleExitGame() {
    setGameOver(false);
    setMessage("");
    setMoss(0);
    setCrack(0);
    setPendingMoney(0);
<<<<<<< Updated upstream
=======
    setTotalMoney(0);
    setPotionPrice(30000);
    setReviveCount(0);
>>>>>>> Stashed changes
    if (setCombo) setCombo(1);
    navigate("/");
  }

  if (!gameOver) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={iconStyle}>💥</div>
        <h2 style={{ margin: 0, fontSize: "clamp(18px, 4.8vw, 22px)" }}>게임 오버</h2>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "clamp(13px, 3.4vw, 15px)", lineHeight: 1.5 }}>
          {message}
        </p>

        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "10px 16px",
          fontSize: "clamp(13px, 3.4vw, 14px)",
          color: "#fffaaa",
        }}>
          현재 보유: {totalMoney.toLocaleString()}원
        </div>

        <Potion
          money={totalMoney}
          setMoney={setTotalMoney}
          potionPrice={potionPrice}
          setPotionPrice={setPotionPrice}
          reviveCount={reviveCount}
          setReviveCount={setReviveCount}
          setMoss={setMoss}
          setCrack={setCrack}
          setPendingMoney={setPendingMoney}
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
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  padding: "clamp(16px, 5vw, 24px)",
  boxSizing: "border-box",
};

const modalStyle = {
  width: "min(100%, 360px)",
  background: "rgba(18,18,24,0.98)",
  border: "0.5px solid rgba(255,255,255,0.1)",
  color: "#fff",
  padding: "clamp(20px, 5vw, 28px)",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  textAlign: "center",
  boxSizing: "border-box",
};

const iconStyle = {
  width: 52, height: 52,
  borderRadius: "50%",
  background: "rgba(231,76,60,0.15)",
  border: "0.5px solid rgba(231,76,60,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  fontSize: 24,
};

const exitBtnStyle = {
  padding: "12px",
  border: "0.5px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  color: "rgba(255,255,255,0.6)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
};