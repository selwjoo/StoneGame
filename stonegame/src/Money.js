import { Fragment, useRef, useState } from "react";
import Moss, { reduceMossOnClick } from "./Moss";
import Crack from "./Crack";
import Crystal from "./Crystal";
import Exit from "./Exit";
import TopRightIconButton from "./TopRightIconButton";
import MoneyHeader from "./MoneyHeader";
import { crystals } from "./crystals";
import { screenShellStyle } from "./screenStyles";

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
  onResetGame,
}) {
  const crystalIdx = selectedCrystal ?? 0;
  const [comboBursts, setComboBursts] = useState([]);
  const [pressing, setPressing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickAt, setLastClickAt] = useState(0);
  const particleId = useRef(0);
  const comboAnchorIndex = useRef(0);
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
    <div style={screenShellStyle}>
      <MoneyHeader money={money} />

      <TopRightIconButton
        src="/exit.png"
        alt="나가기"
        onClick={() => setShowExit(true)}
      />

      <Exit showExit={showExit} setShowExit={setShowExit} onResetGame={onResetGame} />

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

      <div style={playContentStyle}>
        <p style={playLabelStyle}>
          {crystal.name} 돌멩이
        </p>

        <div style={playSliderStyle}>
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
      </div>
    </div>
  );
}

const playContentStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: "clamp(112px, 27vw, 136px)",
};

const playLabelStyle = {
  color: "rgba(255,255,255,0.5)",
  fontSize: "clamp(11px, 2.8vw, 13px)",
  letterSpacing: "0.18em",
  margin: "0 0 clamp(12px, 3vw, 16px)",
  textAlign: "center",
  textTransform: "uppercase",
};

const playSliderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(12px, 4vw, 32px)",
  width: "100%",
  marginBottom: "clamp(20px, 5vw, 28px)",
};
