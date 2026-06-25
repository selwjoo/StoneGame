import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPieces } from "./crystalList";
import {
  modalBodyStyle,
  modalButtonRowStyle,
  modalHeaderStyle,
  modalNumberStyle,
  modalStyle,
  modalTopGlowStyle,
  modalTitleStyle,
  overlayStyle,
  primaryDangerButtonStyle,
  primaryDangerButtonHoverStyle,
  secondaryButtonStyle,
} from "./modalStyles";

export default function Exit({ showExit, setShowExit, onResetGame, forfeitAmount = 0 }) {
  const navigate = useNavigate();
  const [isExitHovered, setIsExitHovered] = useState(false);

  function handleExitGame() {
    if (onResetGame) onResetGame();
    setShowExit(false);
    navigate("/start");
  }

  function handleCancel() {
    setShowExit(false);
  }

  if (!showExit) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalTopGlowStyle} />
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>탐사를 중단하시겠습니까?</h2>
        </div>
        <p style={modalBodyStyle}>
          운반 중인 <strong style={modalNumberStyle}>{formatPieces(forfeitAmount)}</strong>을 잃습니다.
        </p>
        <div style={modalButtonRowStyle}>
          <button
            onClick={handleExitGame}
            onMouseEnter={() => setIsExitHovered(true)}
            onMouseLeave={() => setIsExitHovered(false)}
            style={{
              ...primaryDangerButtonStyle,
              ...(isExitHovered ? primaryDangerButtonHoverStyle : null),
            }}
          >
            중단하기
          </button>
          <button onClick={handleCancel} style={secondaryButtonStyle}>계속하기</button>
        </div>
      </div>
    </div>
  );
}
