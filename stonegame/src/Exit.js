import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPieces } from "./formatPieces";
import {
  modalEyebrowStyle,
  modalBodyStyle,
  modalButtonRowStyle,
  modalHeaderStyle,
  modalStyle,
  modalTopGlowStyle,
  modalTitleStyle,
  overlayStyle,
  primaryDangerButtonStyle,
  primaryDangerButtonHoverStyle,
  secondaryButtonStyle,
} from "./modalStyles";
import { logout } from "./auth";

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
          <p style={modalEyebrowStyle}>ROUND EXIT</p>
          <h2 style={modalTitleStyle}>정말 나가시겠습니까?</h2>
        </div>
        <p style={modalBodyStyle}>
          정말로 {formatPieces(forfeitAmount)}을 포기하시겠습니까?
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
            나가기
          </button>
          <button onClick={handleCancel} style={secondaryButtonStyle}>취소</button>
        </div>
      </div>
    </div>
  );
}
