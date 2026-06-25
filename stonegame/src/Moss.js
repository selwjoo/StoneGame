import { useEffect, useRef } from "react";

const mossStains = [
  { cx: 98,  cy: 42,  rx: 60, ry: 18, start: 6,  rotate: -2,  shade: "rgba(0,0,0,0.22)" },
  { cx: 62,  cy: 68,  rx: 42, ry: 18, start: 18, rotate: -18, shade: "rgba(0,0,0,0.2)" },
  { cx: 142, cy: 74,  rx: 40, ry: 18, start: 28, rotate: 16,  shade: "rgba(0,0,0,0.22)"  },
  { cx: 102, cy: 102, rx: 58, ry: 24, start: 44, rotate: 4,   shade: "rgba(0,0,0,0.26)"  },
  { cx: 70,  cy: 136, rx: 44, ry: 20, start: 62, rotate: -14, shade: "rgba(0,0,0,0.22)" },
  { cx: 144, cy: 142, rx: 42, ry: 18, start: 74, rotate: 14,  shade: "rgba(0,0,0,0.24)"  },
];

function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

function getMossIncrease(moss) {
  if (moss < 15) return 2;
  if (moss < 35) return 2.5;
  if (moss < 55) return 3.4;
  if (moss < 75) return 5.2;
  if (moss < 90) return 7.4;
  return 10;
}

export function reduceMossOnClick(setMoss) {
  setMoss(prev => Math.max(0, prev - 3));
}

export function MossOverlay({ moss }) {
  const mossLevel       = clamp(moss / 100, 0, 1);
  const veilOpacity      = 0.05 + mossLevel * 0.44;
  const topWashOpacity   = 0.06 + mossLevel * 0.24;
  const fullCoverOpacity = Math.max(0, (mossLevel - 0.58) / 0.42) * 0.62;
  const abyssCoreOpacity = Math.max(0, (mossLevel - 0.26) / 0.74) * 0.5;

  return (
    <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <filter id="mossWash">
          <feGaussianBlur stdDeviation="4.4" />
        </filter>
        <linearGradient id="mossTopFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={`rgba(0,0,0,${topWashOpacity})`} />
          <stop offset="45%"  stopColor={`rgba(0,0,0,${topWashOpacity * 0.78})`} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <radialGradient id="mossFullCover" cx="50%" cy="46%" r="68%">
          <stop offset="0%"   stopColor={`rgba(0,0,0,${fullCoverOpacity * 0.54})`} />
          <stop offset="100%" stopColor={`rgba(0,0,0,${fullCoverOpacity})`} />
        </radialGradient>
        <radialGradient id="abyssCore" cx="50%" cy="52%" r="54%">
          <stop offset="0%"   stopColor={`rgba(0,0,0,${abyssCoreOpacity})`} />
          <stop offset="58%"  stopColor={`rgba(0,0,0,${abyssCoreOpacity * 0.82})`} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#mossTopFlow)" />
      <circle cx="100" cy="100" r="100" fill="url(#mossFullCover)" />
      <circle cx="100" cy="100" r="100" fill="url(#abyssCore)" />
      {mossStains.map((stain, i) => {
        const strength = clamp((moss - stain.start) / 20, 0, 1);
        const rx = stain.rx + strength * 10;
        const ry = stain.ry + strength * 5;
        return (
          <g key={i} opacity={strength * 0.9} filter="url(#mossWash)">
            <ellipse cx={stain.cx} cy={stain.cy} rx={rx} ry={ry} fill={stain.shade} transform={`rotate(${stain.rotate} ${stain.cx} ${stain.cy})`} />
            <ellipse cx={stain.cx + rx*0.08} cy={stain.cy + ry*0.02} rx={rx*0.82} ry={ry*0.52} fill="rgba(0,0,0,0.14)" transform={`rotate(${stain.rotate} ${stain.cx} ${stain.cy})`} />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="100" fill={`rgba(0,0,0,${veilOpacity})`} opacity={mossLevel} />
    </svg>
  );
}

export default function Moss({
  moss, setMoss,
  onRoundLost,
  lastClickAt, gameOver,
  mossSpeedMult = 1,
}) {
  const lossTriggeredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameOver) return;
      if (Date.now() - lastClickAt <= 1200) return;

      setMoss(prev => {
        const next = prev + getMossIncrease(prev) * mossSpeedMult;
        return Math.min(next, 100);
      });
    }, 700);
    return () => clearInterval(timer);
  }, [gameOver, lastClickAt, mossSpeedMult, setMoss]);

  useEffect(() => {
    if (moss < 100) {
      lossTriggeredRef.current = false;
      return;
    }
    if (gameOver || lossTriggeredRef.current) return;

    lossTriggeredRef.current = true;
    onRoundLost("블랙홀에 탐사 신호가 끊겼습니다... \n 회수하지 못한 조각이 우주로 흩어졌어요.");
  }, [moss, gameOver, onRoundLost]);

  return null;
}
