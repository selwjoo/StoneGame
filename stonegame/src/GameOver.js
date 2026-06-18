import { useNavigate } from "react-router-dom";
import { formatPieces } from "./formatPieces";
import {
  modalAccentStyle,
  modalBodyStyle,
  modalIconStyle,
  modalStyle,
  modalTitleStyle,
  overlayStyle,
  secondaryButtonStyle,
} from "./modalStyles";
import Potion from "./Potion";

export default function GameOver({
  totalMoney,
  setTotalMoney,
  setPendingMoney,
  setMoss,
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
    // 이번 판 상태만 정리하고 메인으로 복귀
    setGameOver(false);
    setMessage("");
    setMoss(0);
    setCrack(0);
    setPendingMoney(0);
    setPotionPrice(50000);
    setReviveCount(0);
    if (setCombo) setCombo(1);
    navigate("/start");
  }

  if (!gameOver) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalIconStyle}></div>
        <h2 style={modalTitleStyle}>게임 오버</h2>
        <p style={modalBodyStyle}>{message}</p>

        <div style={modalAccentStyle}>
          현재 보유: {formatPieces(totalMoney)}
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

        <button onClick={handleExitGame} style={secondaryButtonStyle}>
          게임 종료하기
        </button>
      </div>
    </div>
  );
}
