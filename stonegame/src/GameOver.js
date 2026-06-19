import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPieces } from "./formatPieces";
import {
  modalAccentStyle,
  modalBodyStyle,
  modalEyebrowStyle,
  modalHeaderStyle,
  modalButtonRowStyle,
  modalStyle,
  modalTopGlowStyle,
  modalTitleStyle,
  overlayStyle,
  primaryDangerButtonStyle,
  secondaryButtonStyle,
} from "./modalStyles";
import Potion from "./Potion";

export default function GameOver({
  totalMoney,
  setTotalMoney,
  pendingMoney,
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
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      setShowExitConfirm(false);
    }
  }, [gameOver]);

  function confirmExitGame() {
    // 이번 판 상태만 정리하고 메인으로 복귀
    setGameOver(false);
    setMessage("");
    setMoss(0);
    setCrack(0);
    setPendingMoney(0);
    setPotionPrice(50000);
    setReviveCount(0);
    if (setCombo) setCombo(1);
    setShowExitConfirm(false);
    navigate("/start");
  }

  if (!gameOver) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalTopGlowStyle} />
        <div style={modalHeaderStyle}>
          <p style={modalEyebrowStyle}>ROUND RESULT</p>
          <h2 style={modalTitleStyle}>GAME OVER</h2>
        </div>
        <p style={{ ...modalBodyStyle, whiteSpace: "pre-line" }}>{message}</p>

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

        <button onClick={() => setShowExitConfirm(true)} style={secondaryButtonStyle}>
          게임 종료하기
        </button>
      </div>

      {showExitConfirm && (
        <div style={overlayStyle}>
          <div style={{ ...modalStyle, width: "min(100%, 340px)" }}>
            <div style={modalTopGlowStyle} />
            <div style={modalHeaderStyle}>
              <p style={modalEyebrowStyle}>FORFEIT REWARD</p>
              <h2 style={modalTitleStyle}>정말 종료할까요?</h2>
            </div>
            <p style={modalBodyStyle}>
              정말로 {formatPieces(pendingMoney)}을 포기하시겠습니까?
            </p>
            <div style={modalButtonRowStyle}>
              <button onClick={confirmExitGame} style={primaryDangerButtonStyle}>
                포기하고 종료
              </button>
              <button onClick={() => setShowExitConfirm(false)} style={secondaryButtonStyle}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
