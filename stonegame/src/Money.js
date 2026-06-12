import { Fragment, useRef, useState } from "react";
import Moss, { reduceMossOnClick } from "./Moss";
import Crack from "./Crack";
import Crystal from "./Crystal";
import Exit from "./Exit";


const crystals = [
  {
    name: "일반",
    price: 0,
    probMultiplier: 1,
    style: {
      background: "radial-gradient(circle at 35% 30%, #d0d0d0, #a0a0a0 40%, #6b6b6b 70%, #3a3a3a)",
      boxShadow: "0 8px 40px rgba(100,100,100,0.4), 0 0 0 2px rgba(255,255,255,0.1) inset",
    },
  },
  {
    name: "코퍼",
    price: 500,
    probMultiplier: 0.92,
    style: {
      background: "radial-gradient(circle at 35% 30%, #ffd9b3, #d18b47 45%, #7a4a1a 80%)",
      boxShadow: "0 8px 40px rgba(209,139,71,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "실버",
    price: 5000,
    probMultiplier: 0.85,
    style: {
      background: "radial-gradient(circle at 35% 30%, #f5f5f5, #c0c0c0 45%, #707070 80%)",
      boxShadow: "0 8px 40px rgba(192,192,192,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "오션",
    price: 50000,
    probMultiplier: 0.75,
    style: {
      background: "radial-gradient(circle at 35% 30%, #a8edea, #4d96ff 45%, #0d47a1 80%)",
      boxShadow: "0 8px 40px rgba(77,150,255,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "에메랄드",
    price: 250000,
    probMultiplier: 0.65,
    style: {
      background: "radial-gradient(circle at 35% 30%, #d4ffea, #2ecc71 45%, #145a32 80%)",
      boxShadow: "0 8px 40px rgba(46,204,113,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "파이어",
    price: 1000000,
    probMultiplier: 0.55,
    style: {
      background: "radial-gradient(circle at 35% 30%, #fff176, #ffd93d 30%, #ff6b35 60%, #c0392b)",
      boxShadow: "0 8px 40px rgba(255,107,53,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "다이아몬드",
    price: 5000000,
    probMultiplier: 0.42,
    style: {
      background: "radial-gradient(circle at 35% 30%, #ffffff, #b9f2ff 35%, #4fc3f7 65%, #01579b)",
      boxShadow: "0 8px 40px rgba(79,195,247,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "갤럭시",
    price: 25000000,
    probMultiplier: 0.3,
    style: {
      background: "radial-gradient(circle at 35% 30%, #e0c3fc, #c77dff 35%, #6a0dad 65%, #1a003d)",
      boxShadow: "0 8px 40px rgba(199,125,255,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
];



const comboAnchors = [
  { x: 100, y: 44 },
  { x: 62, y: 70 },
  { x: 138, y: 72 },
  { x: 72, y: 128 },
  { x: 128, y: 126 },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function Money({
  money,
  setMoney,
  combo,
  setCombo,
  selectedCrystal,
  moss,
  setMoss,
  gameOver,
  setGameOver,
  setMessage,
  crack,
  setCrack,
}) {
  const crystalIdx = selectedCrystal ?? 0;
  const [comboBursts, setComboBursts] = useState([]);
  const [pressing, setPressing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickAt, setLastClickAt] = useState(0);
  const particleId = useRef(0);
  const comboAnchorIndex = useRef(0);
  const [exitHover, setExitHover] = useState(false);
  const [showExit, setShowExit] = useState(false);
 


  function handleClick(clientX, clientY) {
    const now = Date.now();
    const diff = now - lastClickAt;
    const newCombo = diff < 500 ? combo + 1 : 1;
    setCombo(newCombo);
    setLastClickAt(now);
    setMoney((prev) => prev + newCombo);
    reduceMossOnClick(setMoss);

    const id = particleId.current++;
    const accent =
      newCombo >= 15 ? "#d9c27a" :
      newCombo >= 10 ? "#c9d1db" :
      newCombo >= 5 ? "#b8c4b0" :
      "#e8e3d6";
    const labelColor =
      newCombo >= 10 ? "rgba(214, 205, 184, 0.58)" : "rgba(196, 192, 180, 0.48)";
    const moneyColor =
      newCombo >= 10 ? "rgba(228, 221, 196, 0.92)" : "rgba(214, 210, 198, 0.86)";
    const comboSize = Math.min(28 + newCombo * 2.1, 60);
    const moneySize = Math.min(16 + newCombo * 0.5, 24);
    const anchor = comboAnchors[comboAnchorIndex.current % comboAnchors.length];
    comboAnchorIndex.current += 1;

    const comboX = anchor.x + (-6 + Math.random() * 12);
    const comboY = anchor.y + (-6 + Math.random() * 12);
    const comboDriftX = -16 + Math.random() * 32;
    const comboDriftY = -30 - Math.random() * 18;
    const comboSpin = -10 + Math.random() * 20;

    const moneyX = clamp(clientX + (-10 + Math.random() * 20), 52, 148);
    const moneyY = clamp(clientY + (-8 + Math.random() * 16), 58, 150);
    const moneyDriftX = -10 + Math.random() * 20;
    const moneyDriftY = -44 - Math.random() * 18;

    setComboBursts((prev) => [
      ...prev,
      {
        id,
        combo: newCombo,
        earned: newCombo,
        accent,
        comboSize,
        moneySize,
        comboX,
        comboY,
        comboDriftX,
        comboDriftY,
        comboSpin,
        moneyX,
        moneyY,
        moneyDriftX,
        moneyDriftY,
        labelColor,
        moneyColor,
      },
    ]);
    setTimeout(() => {
      setComboBursts((prev) => prev.filter((burst) => burst.id !== id));
    }, 650);

    setClickCount((prev) => prev + 1);
  }

  function handleCrystalClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleClick(x, y);
  }

  const crystal = crystals[crystalIdx];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "clamp(18px, 4vw, 32px)",
      padding: "calc(env(safe-area-inset-top, 0px) + 16px) clamp(16px, 5vw, 28px) calc(env(safe-area-inset-bottom, 0px) + 24px)",
      position: "relative",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: 520,
      margin: "0 auto",
    }}>
      {/* 나가기 버튼 */}
      <button
          onClick={() => setShowExit(true)}
        onMouseEnter={() => setExitHover(true)}
        onMouseLeave={() => setExitHover(false)}
        style={{
          position: "absolute",
          top: "calc(env(safe-area-inset-top, 0px) + 4px)",
          right: "clamp(10px, 3vw, 16px)",
          width: "clamp(40px, 11vw, 44px)",
          height: "clamp(40px, 11vw, 44px)",
          padding: 0,
          border: "none",
          background: exitHover
            ? "rgba(255, 255, 255, 0.50)"
            : "rgba(255, 255, 255, 0.30)",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.18s ease, transform 0.15s ease",
          transform: exitHover ? "scale(1.1)" : "scale(1)",
        }}
      >
        <img
          src="exit.png"
          alt="나가기"
          style={{
            width: 26,
            height: 26,
            objectFit: "contain",
            opacity: exitHover ? 1 : 0.7,
            transition: "opacity 0.18s ease",
          }}
        />
      </button>

      

      <Exit showExit={showExit} setShowExit={setShowExit} />


      <style>{`
        @keyframes comboPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.82) rotate(0deg);
          }
          18% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08) rotate(-3deg);
          }
          48% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform:
              translate(
                calc(-50% + var(--drift-x)),
                calc(-50% + var(--drift-y))
              )
              scale(0.92)
              rotate(var(--spin));
          }
        }

        @keyframes moneyPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.72);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform:
              translate(
                calc(-50% + var(--money-drift-x)),
                calc(-50% + var(--money-drift-y))
              )
              scale(0.9);
          }
        }
      `}</style>

      {/* 크리스탈 이름 */}
      <p style={{
        color: "rgba(255,255,255,0.4)",
        fontSize: "clamp(11px, 2.8vw, 13px)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        margin: 0,
        textAlign: "center",
      }}>
        {crystal.name} 돌멩이
      </p>

      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px, 4vw, 32px)", width: "100%" }}>
        <Crystal
          crystalStyle={crystal.style}
          moss={moss}
          crack={crack}
          pressing={pressing}
          onClick={handleCrystalClick}
          onPressStart={() => setPressing(true)}
          onPressEnd={() => setPressing(false)}
        >
          {comboBursts.map((burst) => (
            <Fragment key={burst.id}>
              <div
                style={{
                  position: "absolute",
                  left: burst.comboX,
                  top: burst.comboY,
                  pointerEvents: "none",
                  animation: "comboPop 0.68s cubic-bezier(0.2, 0.9, 0.25, 1) forwards",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  lineHeight: 1,
                  transform: "translate(-50%, -50%)",
                  textShadow: "0 0 26px rgba(255,255,255,0.16), 0 10px 24px rgba(0, 0, 0, 0.42)",
                  "--drift-x": `${burst.comboDriftX}px`,
                  "--drift-y": `${burst.comboDriftY}px`,
                  "--spin": `${burst.comboSpin}deg`,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.28em",
                    color: burst.labelColor,
                    marginBottom: 4,
                    paddingLeft: "0.28em",
                  }}
                >
                  COMBO
                </div>
                <div
                  style={{
                    fontSize: `clamp(22px, ${burst.comboSize / 200 * 100}vw, ${burst.comboSize}px)`,
                    fontWeight: 900,
                    letterSpacing: "-0.08em",
                    color: burst.accent,
                    lineHeight: 0.92,
                  }}
                >
                  x{burst.combo}
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: burst.moneyX,
                  top: burst.moneyY,
                  pointerEvents: "none",
                  animation: "moneyPop 0.56s ease-out forwards",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  transform: "translate(-50%, -50%)",
                  textShadow: "0 6px 18px rgba(0, 0, 0, 0.32)",
                  "--money-drift-x": `${burst.moneyDriftX}px`,
                  "--money-drift-y": `${burst.moneyDriftY}px`,
                  fontSize: `clamp(13px, ${burst.moneySize / 200 * 100}vw, ${burst.moneySize}px)`,
                  fontWeight: 800,
                  color: burst.moneyColor,
                  letterSpacing: "-0.03em",
                }}
              >
                +{burst.earned}원
              </div>
            </Fragment>
          ))}
        </Crystal>
      </div>

      <Moss
        moss={moss}
        setMoss={setMoss}
        setGameOver={setGameOver}
        setMessage={setMessage}
        lastClickAt={lastClickAt}
        gameOver={gameOver}
      />

      <Crack
        crack={crack}
        setCrack={setCrack}
        setGameOver={setGameOver}
        setMessage={setMessage}
        clickCount={clickCount}
        gameOver={gameOver}
      />

      {/* 돈 표시 */}
      <div style={{
        background: "rgba(255,249,160,0.12)",
        border: "1px solid rgba(255,249,160,0.3)",
        color: "#fffaaa",
        fontSize: "clamp(20px, 5.4vw, 26px)",
        fontWeight: 700,
        padding: "clamp(10px, 2.8vw, 12px) clamp(18px, 6vw, 36px)",
        borderRadius: 14,
        width: "min(100%, 320px)",
        minWidth: 0,
        textAlign: "center",
        boxSizing: "border-box",
        lineHeight: 1.2,
      }}>
        {money.toLocaleString()}원
      </div>

    
    </div>
  );
}