import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Explain({ showExplain, setShowExplain }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [memo, setMemo] = useState("");

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  
  const modalStyle = {
    width: "500px",
    background: "#fff",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };
  
  const confirmBtnStyle = {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  };
  
  const cancelBtnStyle = {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#999",
    color: "white",
    cursor: "pointer",
  };

  function handleExplainGame() {
    navigate("/");
  }

  function handleCancel() {
    setShowExplain(false);
    setStep(0);
  }

  if (!showExplain) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        {step === 0 && (
          <>
            <h2>게임 설명</h2>
            <p>돌을 탭해서 금을 만들고 깨뜨려 보세요!</p>

            <button
              style={confirmBtnStyle}
              onClick={() => setStep(1)}
            >
              다음
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2>예시 이미지</h2>

            <img
              src="/stone.png"
              alt="stone"
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(0)}
              >
                이전
              </button>

              <button
                style={confirmBtnStyle}
                onClick={() => setStep(2)}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>메모</h2>

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="내용을 입력하세요..."
              style={{
                width: "100%",
                height: "120px",
                borderRadius: "10px",
                padding: "10px",
              }}
            />

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(1)}
              >
                이전
              </button>

              <button
                style={confirmBtnStyle}
                onClick={handleExplainGame}
              >
                완료
              </button>
            </div>
          </>
        )}

      </div>
    </div>

    
  );

 
}