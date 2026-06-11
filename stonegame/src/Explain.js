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
    setShowExplain(false);
    setStep(0);
    navigate("/", { state: { memo } });
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
            <p>돌을 탭해서 돈을 벌어 다른 돌도 사보세용ㅇ</p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={handleCancel}
              >
                닫기
              </button>

              <button
                style={confirmBtnStyle}
                onClick={() => setStep(1)}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>게임 설명</h2>
            <p>돌을 빨리 클릭하면 콤보가 쌓여 돈을 더 빨리 벌 수 있어요.</p>

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
            <h2>게임 설명</h2>
            <p>하지만 너무 빨리 클릭하면 돌이 깨짉 수 있답니다!!</p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(1)}
              >
                이전
              </button>

              <button
                style={confirmBtnStyle}
                onClick={() => setStep(3)}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>게임 설명</h2>
            <p>만약 돌이 깨졌다면 물약을 사서 부활을 할 수 있어요!</p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(2)}
              >
                이전
              </button>

              <button
                style={confirmBtnStyle}
                onClick={() => setStep(4)}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>게임 설명</h2>
            <p>반면에 너무 가만히 있으면 이끼가 껴서 돌이 망가질 수 있답니다. </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(3)}
              >
                이전
              </button>

              <button
                style={confirmBtnStyle}
                onClick={() => setStep(5)}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2>게임 설명</h2>
            <p>즐겜하세영크크 </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={cancelBtnStyle}
                onClick={() => setStep(3)}
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