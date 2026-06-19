import { useNavigate } from "react-router-dom";
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
  secondaryButtonStyle,
} from "./modalStyles";

export default function Exit({ showExit, setShowExit, onResetGame }) {
  const navigate = useNavigate();

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
        <p style={modalBodyStyle}>현재 진행 중인 이번 판 기록은 사라지고 메인 화면으로 돌아갑니다.</p>
        <div style={modalButtonRowStyle}>
          <button onClick={handleExitGame} style={primaryDangerButtonStyle}>나가기</button>
          <button onClick={handleCancel} style={secondaryButtonStyle}>취소</button>
        </div>
      </div>
    </div>
  );
}
