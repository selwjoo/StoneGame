import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPieces } from "./crystalList";
import {
  modalBodyStyle,
  modalHeaderStyle,
  modalButtonRowStyle,
  modalNumberStyle,
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
          <h2 style={modalTitleStyle}>GAME OVER</h2>
        </div>
        <p style={holdingStyle}>
          보유 조각 <strong style={modalNumberStyle}>{formatPieces(totalMoney)}</strong>
        </p>
        <p style={{ ...modalBodyStyle, whiteSpace: "pre-line" }}>{message}</p>

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
          sideAction={
            <button
              onClick={() => setShowExitConfirm(true)}
              onMouseEnter={() => setHoveredDangerButton("open-exit")}
              onMouseLeave={() => setHoveredDangerButton(null)}
              style={{
                ...primaryDangerButtonStyle,
                ...(hoveredDangerButton === "open-exit" ? primaryDangerButtonHoverStyle : null),
              }}
            >
              포기하기
            </button>
          }
        />
      </div>

      {showExitConfirm && (
        <div style={overlayStyle}>
          <div style={{ ...modalStyle, width: "min(100%, 340px)", gap: 0 }}>
            <div style={modalTopGlowStyle} />
            <div style={exitConfirmHeaderStyle}>
              <h2 style={modalTitleStyle}>모든 조각을 포기하고 떠날까요?</h2>
            </div>
            <p style={exitConfirmBodyStyle}>
              챙기지 못한{" "}
              <strong style={modalNumberStyle}>
                {formatPieces(totalMoney + (forfeitedReward || pendingMoney))}
              </strong>
              을 모두 잃게 됩니다.
            </p>
            <div style={exitConfirmButtonRowStyle}>
              <button
                onClick={confirmExitGame}
                onMouseEnter={() => setHoveredDangerButton("confirm-exit")}
                onMouseLeave={() => setHoveredDangerButton(null)}
                style={{
                  ...primaryDangerButtonStyle,
                  ...(hoveredDangerButton === "confirm-exit" ? primaryDangerButtonHoverStyle : null),
                }}
              >
                포기하고 떠나기
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

const holdingStyle = {
  margin: "-4px 0 2px",
  color: "rgba(186,192,203,0.72)",
  fontSize: "clamp(12px, 3vw, 13px)",
  lineHeight: 1.2,
};

const exitConfirmHeaderStyle = {
  ...modalHeaderStyle,
  marginTop: 6,
  marginBottom: 18,
};

const exitConfirmBodyStyle = {
  ...modalBodyStyle,
  margin: "0 0 20px",
};

const exitConfirmButtonRowStyle = {
  ...modalButtonRowStyle,
  marginTop: 6,
};
