import { useEffect, useRef } from "react";

const mossStains = [
  { cx: 98,  cy: 42,  rx: 60, ry: 18, start: 6,  rotate: -2,  shade: "rgba(78,101,67,0.18)"  },
  { cx: 62,  cy: 68,  rx: 42, ry: 18, start: 18, rotate: -18, shade: "rgba(88,113,76,0.18)"  },
  { cx: 142, cy: 74,  rx: 40, ry: 18, start: 28, rotate: 16,  shade: "rgba(92,118,78,0.16)"  },
  { cx: 102, cy: 102, rx: 58, ry: 24, start: 44, rotate: 4,   shade: "rgba(72,92,62,0.18)"   },
  { cx: 70,  cy: 136, rx: 44, ry: 20, start: 62, rotate: -14, shade: "rgba(98,124,86,0.14)"  },
  { cx: 144, cy: 142, rx: 42, ry: 18, start: 74, rotate: 14,  shade: "rgba(86,108,74,0.14)"  },
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
  const veilOpacity     = 0.06 + mossLevel * 0.34;
  const topWashOpacity  = 0.08 + mossLevel * 0.28;
  const fullCoverOpacity = Math.max(0, (mossLevel - 0.68) / 0.32) * 0.42;

  return (
    <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <filter id="mossWash"><feGaussianBlur stdDeviation="3.8" /></filter>
        <linearGradient id="mossTopFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={`rgba(95,122,80,${topWashOpacity})`} />
          <stop offset="45%"  stopColor={`rgba(82,105,70,${topWashOpacity * 0.72})`} />
          <stop offset="100%" stopColor="rgba(55,72,48,0)" />
        </linearGradient>
        <radialGradient id="mossFullCover" cx="50%" cy="46%" r="68%">
          <stop offset="0%"   stopColor={`rgba(90,118,76,${fullCoverOpacity * 0.72})`} />
          <stop offset="100%" stopColor={`rgba(66,86,56,${fullCoverOpacity})`} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#mossTopFlow)" />
      <circle cx="100" cy="100" r="100" fill="url(#mossFullCover)" />
      {mossStains.map((stain, i) => {
        const strength = clamp((moss - stain.start) / 20, 0, 1);
        const rx = stain.rx + strength * 10;
        const ry = stain.ry + strength * 5;
        return (
          <g key={i} opacity={strength * 0.9} filter="url(#mossWash)">
            <ellipse cx={stain.cx} cy={stain.cy} rx={rx} ry={ry} fill={stain.shade} transform={`rotate(${stain.rotate} ${stain.cx} ${stain.cy})`} />
            <ellipse cx={stain.cx - rx*0.18} cy={stain.cy - ry*0.12} rx={rx*0.58} ry={ry*0.34} fill="rgba(162,182,150,0.07)" transform={`rotate(${stain.rotate} ${stain.cx} ${stain.cy})`} />
            <ellipse cx={stain.cx + rx*0.1}  cy={stain.cy + ry*0.04} rx={rx*0.86} ry={ry*0.56} fill="rgba(46,60,42,0.08)"   transform={`rotate(${stain.rotate} ${stain.cx} ${stain.cy})`} />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="100" fill={`rgba(78,102,66,${veilOpacity})`} opacity={mossLevel} />
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
    onRoundLost("이끼가 돌을 완전히 덮었습니다...");
  }, [moss, gameOver, onRoundLost]);

  return null;
}