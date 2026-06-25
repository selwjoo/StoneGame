import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Moss, { reduceMossOnClick } from "./Moss";
import Crack from "./Crack";
import Crystal from "./Crystal";
import Exit from "./Exit";
import { crystals, formatPieces } from "./crystalList";
import BackgroundEffect from "./BackgroundEffect";
import MoneyHeader, {
  HEADER_LEFT_ACTION_OFFSET,
  HEADER_MONEY_OFFSET,
  HEADER_TITLE_OFFSET,
  PLANET_FRAME_SIZE,
  PLANET_STAGE_LABEL_GAP,
  PLANET_STAGE_LABEL_STYLE,
  PLANET_STAGE_LABEL_MIN_HEIGHT,
  PLANET_STAGE_TOP_MARGIN,
} from "./MoneyHeader";
import {
  modalStyle,
  modalTopGlowStyle,
  modalHeaderStyle,
  modalTitleStyle,
  modalBodyStyle,
  modalButtonRowStyle,
  secondaryButtonStyle,
} from "./modalStyles";

const comboAnchors = [
  { x: 100, y: 44 },
  { x: 62, y: 70 },
  { x: 138, y: 72 },
  { x: 72, y: 128 },
  { x: 128, y: 126 },
];

const COMBO_EXPONENT = 2.2;
const BASE_REWARD_SCALE = 0.18;
const comboPlanetPalette = {
  달: { main: "200, 216, 238", sub: "232, 240, 252" },
  금성: { main: "224, 202, 150", sub: "244, 228, 190" },
  화성: { main: "226, 154, 132", sub: "244, 194, 180" },
  목성: { main: "218, 190, 160", sub: "240, 222, 198" },
  해왕성: { main: "154, 206, 236", sub: "208, 234, 248" },
  태양: { main: "246, 192, 118", sub: "255, 224, 168" },
  은하: { main: "194, 176, 246", sub: "224, 214, 255" },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCollectAmountValue(sourcePendingMoney, sourceClickCount, sourceMoss) {
  const mossRatio = (1 - sourceMoss / 100) * (9 / 10) + (1 / 10);
  return Math.floor(sourcePendingMoney * mossRatio);
}

function getClickReward(comboValue, rewardMult) {
  return Math.max(1, Math.floor(Math.pow(comboValue, COMBO_EXPONENT) * rewardMult * BASE_REWARD_SCALE));
}

function getComboVisual(crystalName, comboValue) {
  const palette = comboPlanetPalette[crystalName] ?? { main: "198, 210, 226", sub: "232, 238, 246" };
  const comboBoost = comboValue >= 12 ? 0.08 : comboValue >= 6 ? 0.04 : 0;

  return {
    accent: `rgba(${palette.main}, ${0.58 + comboBoost})`,
    labelColor: `rgba(${palette.sub}, ${0.26 + comboBoost * 0.45})`,
    moneyColor: `rgba(${palette.sub}, ${0.52 + comboBoost * 0.6})`,
    comboShadow: `0 0 8px rgba(${palette.main}, 0.16), 0 0 18px rgba(${palette.sub}, 0.06), 0 8px 18px rgba(0,0,0,0.24)`,
    moneyShadow: `0 0 8px rgba(${palette.sub}, 0.12), 0 6px 14px rgba(0,0,0,0.22)`,
  };
}

export default function Money({
  totalMoney,
  setTotalMoney,
  pendingMoney,
  setPendingMoney,
  setForfeitedReward,
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
  const navigate = useNavigate();
  const crystalIdx = selectedCrystal ?? 0;
  const crystal = crystals[crystalIdx];

  const [comboBursts, setComboBursts] = useState([]);
  const [pressing, setPressing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickAt, setLastClickAt] = useState(0);
  const particleId = useRef(0);
  const comboAnchorIndex = useRef(0);
  const [exitHover, setExitHover] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showCollectPopup, setShowCollectPopup] = useState(false);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [roundLocked, setRoundLocked] = useState(false);
  const roundLockedRef = useRef(false);

  useEffect(() => {
    roundLockedRef.current = false;
    setRoundLocked(false);
    setPendingMoney(0);
    setForfeitedReward(0);
    setMoss(0);
    setCrack(0);
    setCombo(1);
    setClickCount(0);
    setLastClickAt(0);
    setGameOver(false);
    setMessage("");
  }, [
    setCombo,
    setCrack,
    setForfeitedReward,
    setGameOver,
    setMessage,
    setMoss,
    setPendingMoney,
  ]);

  function resetRoundState() {
    roundLockedRef.current = false;
    setRoundLocked(false);
    setShowCollectPopup(false);
    setPendingMoney(0);
    setForfeitedReward(0);
    setMoss(0);
    setCrack(0);
    setCombo(1);
    setClickCount(0);
    setLastClickAt(0);
    setGameOver(false);
    setMessage("");
  }

  const handleRoundLoss = useCallback((nextMessage) => {
    if (roundLockedRef.current) return;
    setForfeitedReward(getCollectAmountValue(pendingMoney, clickCount, moss));
    setGameOver(true);
    setMessage(nextMessage);
  }, [clickCount, moss, pendingMoney, setForfeitedReward, setGameOver, setMessage]);

  function handleCollect() {
    if (pendingMoney <= 0 || gameOver || roundLockedRef.current) return;
  
    const amount = getCollectAmountValue(
      pendingMoney,
      clickCount,
      moss
    );

    roundLockedRef.current = true;
    setRoundLocked(true);
    setPressing(false);
    setCollectedAmount(amount);
    setShowCollectPopup(true);
  }

  function handleClick(clientX, clientY) {
    if (roundLockedRef.current || gameOver) return;

    const now = Date.now();
    const diff = now - lastClickAt;
    const comboWindow = crystal.comboWindowMs ?? 500;
    const newCombo = diff < comboWindow ? combo + 1 : 1;
    setCombo(newCombo);
    setLastClickAt(now);

    const earned = getClickReward(newCombo, crystal.rewardMult ?? 1);
    setPendingMoney(prev => prev + earned);
    reduceMossOnClick(setMoss);

    const id = particleId.current++;
    const comboVisual = getComboVisual(crystal.name, newCombo);
    const comboSize   = Math.min(28 + newCombo * 2.1, 60);
    const moneySize   = Math.min(16 + newCombo * 0.5, 24);
    const anchor      = comboAnchors[comboAnchorIndex.current % comboAnchors.length];
    comboAnchorIndex.current += 1;

    const comboX      = anchor.x + (-6 + Math.random() * 12);
    const comboY      = anchor.y + (-6 + Math.random() * 12);
    const comboDriftX = -16 + Math.random() * 32;
    const comboDriftY = -30 - Math.random() * 18;
    const comboSpin   = -10 + Math.random() * 20;
    const moneyX      = clamp(clientX + (-10 + Math.random() * 20), 52, 148);
    const moneyY      = clamp(clientY + (-8  + Math.random() * 16), 58, 150);
    const moneyDriftX = -10 + Math.random() * 20;
    const moneyDriftY = -44 - Math.random() * 18;

    setComboBursts(prev => [
      ...prev,
      {
        id, combo: newCombo, earned, accent: comboVisual.accent,
        comboSize, moneySize,
        comboX, comboY, comboDriftX, comboDriftY, comboSpin,
        moneyX, moneyY, moneyDriftX, moneyDriftY,
        labelColor: comboVisual.labelColor,
        moneyColor: comboVisual.moneyColor,
        comboShadow: comboVisual.comboShadow,
        moneyShadow: comboVisual.moneyShadow,
      },
    ]);
    setTimeout(() => {
      setComboBursts(prev => prev.filter(b => b.id !== id));
    }, 650);

    setClickCount(prev => prev + 1);
  }

  function handleCrystalClick(event) {
    if (roundLockedRef.current || gameOver) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleClick(event.clientX - rect.left, event.clientY - rect.top);
  }

  const collectAmount = getCollectAmountValue(pendingMoney, clickCount, moss);
  const roundClosed = gameOver || roundLocked;
  const canCollect = pendingMoney > 0 && !roundClosed;

  return (
    <>
    <BackgroundEffect crystalName={crystal.name} />
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100dvh",
      padding: "calc(env(safe-area-inset-top,0px) + 20px) clamp(16px,5vw,28px) calc(env(safe-area-inset-bottom,0px) + 24px)",
      position: "relative",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: 520,
      margin: "0 auto",
      zIndex: 1,
    }}>
      <MoneyHeader
        money={totalMoney}
        titleOffset={HEADER_TITLE_OFFSET}
        moneyOffset={HEADER_MONEY_OFFSET}
        leftSlot={
          <button
            onClick={() => setShowExit(true)}
            onMouseEnter={() => setExitHover(true)}
            onMouseLeave={() => setExitHover(false)}
            style={{
              width: "clamp(44px,12vw,50px)",
              height: "clamp(44px,12vw,50px)",
              padding: 0,
              marginLeft: HEADER_LEFT_ACTION_OFFSET,
              border: "none",
              background: "transparent",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s ease",
              transform: exitHover ? "translateY(10px) scale(1.1)" : "translateY(10px) scale(1)",
            }}
          >
            <img src="exit.png" alt="나가기" style={{ width: 20, height: 20, objectFit: "contain", opacity: exitHover ? 1 : 0.82, transition: "opacity 0.18s ease" }} />
          </button>
        }
      />

      <Exit
        showExit={showExit}
        setShowExit={setShowExit}
        onResetGame={resetRoundState}
        forfeitAmount={collectAmount}
      />

      <style>{`
        @keyframes comboPop {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0.82) rotate(0deg); }
          18%  { opacity:1; transform:translate(-50%,-50%) scale(1.08) rotate(-3deg); }
          48%  { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(0deg); }
          100% { opacity:0; transform:translate(calc(-50% + var(--drift-x)),calc(-50% + var(--drift-y))) scale(0.92) rotate(var(--spin)); }
        }
        @keyframes moneyPop {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0.72); }
          20%  { opacity:1; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0; transform:translate(calc(-50% + var(--money-drift-x)),calc(-50% + var(--money-drift-y))) scale(0.9); }
        }
      }
      `}</style>

      <div style={playContentStyle}>
        <div style={playStageLabelWrapStyle}>
          <p style={PLANET_STAGE_LABEL_STYLE}>{crystal.name}</p>
        </div>

        <Crystal
          crystalStyle={crystal.style}
          crystalName={crystal.name}
          hasRing={crystal.hasRing}
          moss={moss}
          crack={crack}
          pressing={pressing}
          onClick={handleCrystalClick}
          onPressStart={() => setPressing(true)}
          onPressEnd={() => setPressing(false)}
          size={PLANET_FRAME_SIZE}
        >
          {comboBursts.map(burst => (
            <Fragment key={burst.id}>
              <div style={{
                position: "absolute", left: burst.comboX, top: burst.comboY,
                pointerEvents: "none",
                animation: "comboPop 0.68s cubic-bezier(0.2,0.9,0.25,1) forwards",
                whiteSpace: "nowrap", textAlign: "center", lineHeight: 1,
                transform: "translate(-50%,-50%)",
                textShadow: burst.comboShadow,
                opacity: 0.8,
                "--drift-x": `${burst.comboDriftX}px`,
                "--drift-y": `${burst.comboDriftY}px`,
                "--spin": `${burst.comboSpin}deg`,
              }}>
                <div style={{ fontSize: `clamp(22px,${burst.comboSize/200*100}vw,${burst.comboSize}px)`, fontWeight: 800, letterSpacing: "-0.08em", color: burst.accent, lineHeight: 0.92 }}>
                  x{burst.combo}
                </div>
              </div>
              <div style={{
                position: "absolute", left: burst.moneyX, top: burst.moneyY,
                pointerEvents: "none",
                animation: "moneyPop 0.56s ease-out forwards",
                whiteSpace: "nowrap", textAlign: "center",
                transform: "translate(-50%,-50%)",
                textShadow: burst.moneyShadow,
                opacity: 0.72,
                "--money-drift-x": `${burst.moneyDriftX}px`,
                "--money-drift-y": `${burst.moneyDriftY}px`,
                fontSize: `clamp(13px,${burst.moneySize/200*100}vw,${burst.moneySize}px)`,
                fontWeight: 760, color: burst.moneyColor, letterSpacing: "-0.03em",
              }}>
                +{formatPieces(burst.earned)}
              </div>
            </Fragment>
          ))}
        </Crystal>

        {showCollectPopup && (
  <div style={overlayStyle}>
    <div style={modalStyle}>
      <div style={modalTopGlowStyle} />

      <div style={modalHeaderStyle}>
        <h2 style={modalTitleStyle}>
          수거를 완료했습니다
        </h2>
      </div>

      <p style={modalBodyStyle}>
        이번 라운드에서{" "}
        <strong
          style={{
            color: "#f1ebdd",
            fontWeight: 700,
          }}
        >
          {formatPieces(collectedAmount)}
        </strong>
        을 획득했습니다.
      </p>

      <div
        style={{
          ...modalButtonRowStyle,
          justifyContent: "center",
        }}
      >
        <button
          style={{
            ...secondaryButtonStyle,
            width: "100%",
            maxWidth: 260,
          }}
          onClick={() => {
            setTotalMoney(prev => prev + collectedAmount);

            setForfeitedReward(0);
            setPendingMoney(0);
            setMoss(0);
            setCrack(0);
            setCombo(1);
            setClickCount(0);
            setLastClickAt(0);

            setShowCollectPopup(false);

            navigate("/start");
          }}
        >
          확인
        </button>
      </div>
    </div>
  </div>
)}
        <Moss
          moss={moss} setMoss={setMoss}
          onRoundLost={handleRoundLoss}
          lastClickAt={lastClickAt} gameOver={roundClosed}
          mossSpeedMult={crystal.mossSpeedMult ?? 1}
        />

        <Crack
          crack={crack} setCrack={setCrack}
          onRoundLost={handleRoundLoss}
          clickCount={clickCount} gameOver={roundClosed}
          crackMin={crystal.crackMin ?? 1.5}
          crackMax={crystal.crackMax ?? 2.5}
        />

        <div style={playBottomStackStyle}>
          {(() => {
            const now = Date.now();
            const willContinueCombo = now - lastClickAt < (crystal.comboWindowMs ?? 500);
            const nextCombo = willContinueCombo ? combo + 1 : 1;
            const nextEarned = getClickReward(nextCombo, crystal.rewardMult ?? 1);
            return (
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#16181d",
                border: "0.5px solid #2B2D34",
                borderRadius: 10, padding: "7px 14px", boxSizing: "border-box",
              }}>
                <span style={{ fontSize: "clamp(11px,2.6vw,12px)", color: "rgba(176,182,194,0.35)", letterSpacing: "0.06em" }}>
                  다음 클릭 시
                </span>
                <span style={{
                  fontSize: "clamp(15px,4vw,18px)",
                  fontWeight: 800,
                  color: "rgba(214,219,227,0.92)",
                }}>
                  +{formatPieces(nextEarned)}
                </span>
              </div>
            );
          })()}

          <div style={{
            background: "#16181d", border: "1px solid #2B2D34",
            color: "#eef1f5", borderRadius: 14, textAlign: "center",
            boxSizing: "border-box", lineHeight: 1.2,
          }}>
            <div style={{ padding: "clamp(10px,2.8vw,12px) clamp(18px,6vw,28px)" }}>
              <div style={{ fontSize: "clamp(10px,2.4vw,12px)", opacity: 0.6, marginBottom: 2, letterSpacing: "0.1em" }}>
                채굴한 조각
              </div>
              <div style={{ fontSize: "clamp(18px,5vw,22px)", fontWeight: 700 }}>
                {formatPieces(collectAmount)}
              </div>
            </div>
          </div>

          <button
            onClick={handleCollect}
            disabled={!canCollect}
            style={{
              padding: "clamp(11px,3vw,14px)",
              borderRadius: 14,
              border: canCollect ? "1px solid #343740" : "1px solid #2B2D34",
              background: canCollect
                ? "#1b1e25"
                : "#16181d",
              color: canCollect ? "rgba(214,219,227,0.92)" : "rgba(176,182,194,0.25)",
              fontSize: "clamp(15px,4vw,17px)", fontWeight: 700,
              cursor: canCollect ? "pointer" : "not-allowed",
              letterSpacing: "0.04em",
              transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
              boxShadow: "none",
              boxSizing: "border-box", width: "100%",
            }}
          >
            수거하기
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

const playContentStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: PLANET_STAGE_TOP_MARGIN,
};

const playStageLabelWrapStyle = {
  minHeight: PLANET_STAGE_LABEL_MIN_HEIGHT,
  marginBottom: PLANET_STAGE_LABEL_GAP,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const playBottomStackStyle = {
  width: "min(100%,320px)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: "clamp(18px, 4vw, 26px)",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};
