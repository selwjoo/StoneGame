import { useNavigate } from "react-router-dom";
import { modalStyle, overlayStyle } from "./modalStyles";

export default function Exit({ showExit, setShowExit, onResetGame }) {
  const navigate = useNavigate();

  function handleExitGame() {
    if (onResetGame) onResetGame();
    setShowExit(false);
    navigate("/");
  }

  function handleCancel() {
    setShowExit(false);
  }

  if (!showExit) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ margin: 0 }}>정말 나가시겠습니까?</h2>
        <p style={{ margin: 0, color: "#ddd" }}>현재 진행상황이 사라집니다.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleExitGame} style={confirmBtnStyle}>나가기</button>
          <button onClick={handleCancel} style={cancelBtnStyle}>취소</button>
        </div>
      </div>
    </div>
  );
}

const confirmBtnStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#e74c3c",
  color: "#fff",
  cursor: "pointer",
};

const cancelBtnStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#444",
  color: "#fff",
  cursor: "pointer",
};
