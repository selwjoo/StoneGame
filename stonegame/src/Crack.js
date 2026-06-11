import { useEffect } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function CrackOverlay({ crack }) {
  const crackLevel = clamp(crack / 100, 0, 1);
  const opacity = crackLevel === 0 ? 0 : 0.12 + crackLevel * 0.88;
  const scale = 0.74 + crackLevel * 0.34;
  const contrast = 0.7 + crackLevel * 0.75;
  const brightness = 0.82 + crackLevel * 0.38;
  const blur = Math.max(0, 2.2 - crackLevel * 2.2);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <img
        src="/crack_effect.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "92%",
          height: "92%",
          objectFit: "contain",
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          filter: `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) drop-shadow(0 0 ${5 + crackLevel * 8}px rgba(0, 0, 0, 0.18))`,
          transition: "opacity 0.14s ease, transform 0.14s ease, filter 0.14s ease",
        }}
      />
    </div>
  );
}

export default function Crack({
  crack,
  setCrack,
  setGameOver,
  setMessage,
  clickCount,
  gameOver,
}) {
  useEffect(() => {
    if (gameOver) return;

    setCrack((prev) => {
      let increase = 0;

      if (prev < 35) {   // 개발할떄 기다리기 힘들어서 임시로 수정함
        increase = 1;
      } else if (prev < 80) {
        increase = 1;
      } else {
        increase = 1;
      }

      const next = prev + increase;

      if (next >= 100) {
        setGameOver(true);
        setMessage("💥 돌이 완전히 깨졌습니다...");
        return 100;
      }

      return next;
    });
  }, [clickCount, gameOver, setCrack, setGameOver, setMessage]);

  return (
    <div style={{ width: "min(100%, 360px)" }}>
      <h2
        style={{
          color: "white",
          marginBottom: "10px",
          fontSize: "clamp(18px, 4.8vw, 28px)",
          lineHeight: 1.2,
        }}
      >
        💥 금 간 정도 : {crack.toFixed(1)}%
      </h2>

      <div
        style={{
          width: "100%",
          height: "clamp(16px, 4vw, 20px)",
          background: "#333",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${crack}%`,
            height: "100%",
            background:
              crack > 80
                ? "#ff2d2d"
                : crack > 35
                  ? "#ff9f43"
                  : "#ffd93d",
            transition: "0.1s",
          }}
        />
      </div>
    </div>
  );
}
