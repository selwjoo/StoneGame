import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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

// 클릭 간격(ms)에 따라 "깰 확률"을 계산.
// 빠르게 칠수록(간격이 짧을수록) 확률이 높아짐.
function getBreakProbability(intervalMs) {
  if (intervalMs == null) return 0.05; // 첫 클릭은 낮은 확률로 시작

  const FAST = 80;    // 이보다 빠르면 거의 확정 (광클)
  const SLOW = 700;   // 이보다 느리면 거의 0%

  if (intervalMs <= FAST) return 0.98;
  if (intervalMs >= SLOW) return 0.01;

  // FAST ~ SLOW 사이를 0.98 ~ 0.01 로 선형 보간
  const t = (intervalMs - FAST) / (SLOW - FAST);
  return 0.98 - t * (0.98 - 0.01);
}

export default function Crack({
  crack,
  setCrack,
  setGameOver,
  setMessage,
  clickCount,
  gameOver,
}) {
  const location = useLocation();
  const probMultiplier = location.state?.probMultiplier ?? 1;

  const lastClickTimeRef = useRef(null);
  const isFirstRun = useRef(true);

  // 클릭 시마다: 클릭 속도에 따른 확률로 금이 증가
  useEffect(() => {
    if (gameOver) return;

    // 마운트 시 최초 effect는 클릭이 아니므로 스킵
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const now = Date.now();
    const interval = lastClickTimeRef.current
      ? now - lastClickTimeRef.current
      : null;
    lastClickTimeRef.current = now;

    const probability = getBreakProbability(interval) * probMultiplier;
    const success = Math.random() < probability;

    if (!success) return; // 실패하면 금 증가 없음

    // 빠르게 칠수록 한 번에 늘어나는 양도 약간 더 큼
    const speedFactor = interval == null ? 1 : clamp(1 - interval / 700, 0, 1);
    const increase = 3 + speedFactor * 17; // 3 ~ 20 사이 (광클하면 한방에 훅훅)

    setCrack((prev) => {
      const next = clamp(prev + increase, 0, 100);

      if (next >= 100) {
        setGameOver(true);
        setMessage("💥 돌이 완전히 깨졌습니다...");
      }

      return next;
    });
  }, [clickCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // 클릭을 안 하면 시간이 지날수록 서서히 감소
  useEffect(() => {
    if (gameOver) return;

    const decayInterval = setInterval(() => {
      const now = Date.now();
      const sinceLastClick = lastClickTimeRef.current
        ? now - lastClickTimeRef.current
        : Infinity;

      // 마지막 클릭 후 일정 시간(예: 250ms) 지나면 감소 시작
      if (sinceLastClick < 250) return;

      setCrack((prev) => {
        if (prev <= 0) return 0;
        return clamp(prev - 2.5, 0, 100); // 빠르게 훅 떨어짐
      });
    }, 80);

    return () => clearInterval(decayInterval);
  }, [gameOver, setCrack]);

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