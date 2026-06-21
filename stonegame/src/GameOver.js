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
  primaryDangerButtonHoverStyle,
  secondaryButtonStyle,
} from "./modalStyles";
import Potion from "./Potion";

export default function GameOver({
  totalMoney,
  setTotalMoney,
  pendingMoney,
  forfeitedReward,
  setPendingMoney,
  setForfeitedReward,
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
  const [hoveredDangerButton, setHoveredDangerButton] = useState(null);

  useEffect(() => {
    if (!gameOver) {
      setShowExitConfirm(false);
    }
  }, [gameOver]);

  function confirmExitGame() {
    // 부활하지 않고 종료하면 총 보유 + 이번 판 누적을 모두 잃는다.
    setTotalMoney(0);
    setGameOver(false);
    setMessage("");
    setMoss(0);
    setCrack(0);
    setPendingMoney(0);
    setForfeitedReward(0);
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
          setForfeitedReward={setForfeitedReward}
          setGameOver={setGameOver}
          setMessage={setMessage}
          setCombo={setCombo}
        />

        <button
          onClick={() => setShowExitConfirm(true)}
          onMouseEnter={() => setHoveredDangerButton("open-exit")}
          onMouseLeave={() => setHoveredDangerButton(null)}
          style={{
            ...primaryDangerButtonStyle,
            ...(hoveredDangerButton === "open-exit" ? primaryDangerButtonHoverStyle : null),
          }}
        >
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
              정말로 {formatPieces(totalMoney + (forfeitedReward || pendingMoney))}을 잃고 종료하시겠습니까?
            </p>
            <div style={modalButtonRowStyle}>
              <button
                onClick={confirmExitGame}
                onMouseEnter={() => setHoveredDangerButton("confirm-exit")}
                onMouseLeave={() => setHoveredDangerButton(null)}
                style={{
                  ...primaryDangerButtonStyle,
                  ...(hoveredDangerButton === "confirm-exit" ? primaryDangerButtonHoverStyle : null),
                }}
              >
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
