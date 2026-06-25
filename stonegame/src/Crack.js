import { useEffect, useRef } from "react";

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
  onRoundLost,
  clickCount, gameOver,
  crackMin = 1.5,
  crackMax = 2.5,
}) {
  const lossTriggeredRef = useRef(false);

  useEffect(() => {
    if (gameOver || clickCount <= 0) return;

    setCrack(prev => {
      const stageMult = prev < 40 ? 1 : prev < 70 ? 1.08 : 1.16;
      const range = Math.max(0, crackMax - crackMin);
      const randomWeight = 0.2 + Math.random() * 0.28;
      const baseIncrease = crackMin + range * randomWeight;
      const increaseCap = crackMin + range * 0.45;
      const increase = Math.min(baseIncrease * stageMult, increaseCap);
      return Math.min(prev + increase, 100);
    });
  }, [clickCount, gameOver, crackMin, crackMax, setCrack]);

  useEffect(() => {
    if (crack < 100) {
      lossTriggeredRef.current = false;
      return;
    }
    if (gameOver || lossTriggeredRef.current) return;

    lossTriggeredRef.current = true;
    onRoundLost("행성이 궤도를 이탈했습니다... \n 회수하지 못한 조각이 우주로 흩어졌어요.");
  }, [crack, gameOver, onRoundLost]);

  return null;
}