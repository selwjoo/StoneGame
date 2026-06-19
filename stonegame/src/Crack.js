import { useEffect } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function CrackOverlay({ crack }) {
  const crackLevel = clamp(crack / 100, 0, 1);
  const opacity    = crackLevel === 0 ? 0 : 0.12 + crackLevel * 0.88;
  const scale      = 0.74 + crackLevel * 0.34;
  const contrast   = 0.7  + crackLevel * 0.75;
  const brightness = 0.82 + crackLevel * 0.38;
  const blur       = Math.max(0, 2.2 - crackLevel * 2.2);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <img
        src="/crack_effect.png" alt="" aria-hidden="true"
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: "92%", height: "92%", objectFit: "contain",
          transform: `translate(-50%,-50%) scale(${scale})`,
          opacity,
          filter: `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) drop-shadow(0 0 ${5 + crackLevel * 8}px rgba(0,0,0,0.18))`,
          transition: "opacity 0.14s ease, transform 0.14s ease, filter 0.14s ease",
        }}
      />
    </div>
  );
}

export default function Crack({
  crack, setCrack,
  setGameOver, setMessage,
  setPendingMoney,
  clickCount, gameOver,
  crackMin = 1.5,
  crackMax = 2.5,
}) {
  useEffect(() => {
    if (gameOver) return;

    setCrack(prev => {
      const stageMult = prev < 40 ? 1 : prev < 70 ? 1.2 : 1.5;
      const rand = crackMin + Math.random() * (crackMax - crackMin);
      const increase = rand * stageMult;
      const next = prev + increase;

      if (next >= 100) {
        setGameOver(true);
        setPendingMoney(0);
        setMessage("돌이 완전히 깨졌습니다... \n 수거하지 못한 돈이 사라졌어요.");
        return 100;
      }
      return next;
    });
  }, [clickCount, gameOver, crackMin, crackMax, setCrack, setGameOver, setMessage, setPendingMoney]);

  const crackColor = crack > 80 ? "#ff2d2d" : crack > 40 ? "#ff9f43" : "#ffd93d";

  return (
    <div style={{ width: "min(100%,360px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h2 style={{ color: "white", margin: 0, fontSize: "clamp(14px,3.8vw,17px)", lineHeight: 1.2 }}>
          균열
        </h2>
        <span style={{ color: crackColor, fontWeight: 700, fontSize: "clamp(13px,3.4vw,15px)" }}>
          {crack.toFixed(1)}%
        </span>
      </div>
      <div style={{
        width: "100%", height: "clamp(14px,3.5vw,18px)",
        background: "rgba(255,255,255,0.07)", borderRadius: "999px",
        overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          width: `${crack}%`, height: "100%",
          background: crack > 80
            ? "linear-gradient(90deg,#c0392b,#ff2d2d)"
            : crack > 40
              ? "linear-gradient(90deg,#e67e22,#ff9f43)"
              : "linear-gradient(90deg,#f0c040,#ffd93d)",
          transition: "0.1s", borderRadius: "999px",
        }} />
      </div>
    </div>
  );
}
