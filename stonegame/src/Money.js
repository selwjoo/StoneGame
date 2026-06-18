import { Fragment, useEffect, useRef, useState } from "react";
import Moss, { reduceMossOnClick } from "./Moss";
import Crack from "./Crack";
import Crystal from "./Crystal";
import Exit from "./Exit";
import { crystals } from "./crystalList";
import BackgroundEffect from "./BackgroundEffect";
import { formatPieces } from "./formatPieces";
import MoneyHeader from "./MoneyHeader";
import BenefitRecord from "./BenefitRecord";

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

// 클릭 횟수 구간별 수거 배율
function getCrackMultiplier(clickCount) {
  if (clickCount <= 10) return { mult: 0.5, label: "×0.5", color: "#888",    desc: "너무 이른 수거" };
  if (clickCount <= 18) return { mult: 1,   label: "×1",   color: "#aaa",    desc: "기본" };
  if (clickCount <= 24) return { mult: 2,   label: "×2",   color: "#ffd93d", desc: "스윗스팟" };
  if (clickCount <= 29) return { mult: 4,   label: "×4",   color: "#ff9f43", desc: "고위험" };
  return                       { mult: 8,   label: "×8",   color: "#ff4444", desc: "초고위험" };
}

export default function Money({
  totalMoney,
  setTotalMoney,
  pendingMoney,
  setPendingMoney,
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
  const crystal = crystals[crystalIdx];

  const [comboBursts, setComboBursts] = useState([]);
  const [pressing, setPressing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickAt, setLastClickAt] = useState(0);
  const [collectFlash, setCollectFlash] = useState(false);
  const particleId = useRef(0);
  const comboAnchorIndex = useRef(0);
  const [exitHover, setExitHover] = useState(false);
  const [showExit, setShowExit] = useState(false);

  // 물약 구매 후 게임 재개 시 clickCount 리셋
  useEffect(() => {
    if (!gameOver) {
      setClickCount(0);
      setCombo(1);
    }
  }, [gameOver, setCombo]);

  function handleCollect() {
    if (pendingMoney <= 0 || gameOver) return;
    const { mult } = getCrackMultiplier(clickCount);
    const mossRatio = (1 - moss / 100) * (9 / 10) + (1 / 10); // 이끼 0%=1.0, 이끼 100%=0.1
    setTotalMoney(prev => prev + Math.floor(pendingMoney * mult * mossRatio));
    setPendingMoney(0);
    setMoss(0);
    setCrack(0);
    setCombo(1);
    setClickCount(0);
    setCollectFlash(true);
    setTimeout(() => setCollectFlash(false), 600);
  }

  function handleClick(clientX, clientY) {
    const now = Date.now();
    const diff = now - lastClickAt;
    const comboWindow = crystal.comboWindowMs ?? 500;
    const newCombo = diff < comboWindow ? combo + 1 : 1;
    setCombo(newCombo);
    setLastClickAt(now);

    // 돌멩이 수익 배율 적용
    const earned = Math.floor(Math.pow(newCombo, 2.5) * (crystal.rewardMult ?? 1) * 0.3);
    setPendingMoney(prev => prev + earned);
    reduceMossOnClick(setMoss);

    const id = particleId.current++;
    const accent =
      newCombo >= 15 ? "#d9c27a" :
      newCombo >= 10 ? "#c9d1db" :
      newCombo >= 5  ? "#b8c4b0" :
                       "#e8e3d6";
    const labelColor  = newCombo >= 10 ? "rgba(214,205,184,0.58)" : "rgba(196,192,180,0.48)";
    const moneyColor  = newCombo >= 10 ? "rgba(228,221,196,0.92)" : "rgba(214,210,198,0.86)";
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
        id, combo: newCombo, earned, accent,
        comboSize, moneySize,
        comboX, comboY, comboDriftX, comboDriftY, comboSpin,
        moneyX, moneyY, moneyDriftX, moneyDriftY,
        labelColor, moneyColor,
      },
    ]);
    setTimeout(() => {
      setComboBursts(prev => prev.filter(b => b.id !== id));
    }, 650);

    setClickCount(prev => prev + 1);
  }

  function handleCrystalClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    handleClick(event.clientX - rect.left, event.clientY - rect.top);
  }

  return (
    <>
    <BackgroundEffect crystalName={crystal.name} />
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "calc(env(safe-area-inset-top,0px) + 16px) clamp(16px,5vw,28px) calc(env(safe-area-inset-bottom,0px) + 24px)",
      position: "relative",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: 520,
      margin: "0 auto",
      zIndex: 1,
    }}>
      <MoneyHeader money={totalMoney} titleOffset={8} moneyOffset={20} />

      {/* 나가기 버튼 */}
      <button
        onClick={() => setShowExit(true)}
        onMouseEnter={() => setExitHover(true)}
        onMouseLeave={() => setExitHover(false)}
        style={{
          position: "absolute",
          top: "calc(env(safe-area-inset-top,0px) + 25px)",
          left: "clamp(30px,8vw,42px)",
          width: "clamp(40px,11vw,44px)",
          height: "clamp(40px,11vw,44px)",
          padding: 0, border: "none",
          background: "transparent",
          borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.15s ease",
          transform: exitHover ? "scale(1.1)" : "scale(1)",
        }}
      >
        <img src="exit.png" alt="나가기" style={{ width: 20, height: 20, objectFit: "contain", opacity: exitHover ? 1 : 0.82, transition: "opacity 0.18s ease" }} />
      </button>

      <Exit showExit={showExit} setShowExit={setShowExit} />

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
        @keyframes collectFlash {
          0%   { transform:scale(1); }
          30%  { transform:scale(1.06); }
          100% { transform:scale(1); }
        }
      `}</style>

      <div style={playContentStyle}>
      {/* 돌멩이 이름 + 베네핏 */}
      <div style={playInfoStyle}>
        <p style={playNameStyle}>
          {crystal.name} 돌멩이
        </p>
        <BenefitRecord benefit={crystal.benefit} compact />
      </div>

      {/* 크리스탈 */}
      <Crystal
        crystalStyle={crystal.style}
        crystalName={crystal.name}
        moss={moss}
        crack={crack}
        pressing={pressing}
        onClick={handleCrystalClick}
        onPressStart={() => setPressing(true)}
        onPressEnd={() => setPressing(false)}
      >
        {comboBursts.map(burst => (
          <Fragment key={burst.id}>
            <div style={{
              position: "absolute", left: burst.comboX, top: burst.comboY,
              pointerEvents: "none",
              animation: "comboPop 0.68s cubic-bezier(0.2,0.9,0.25,1) forwards",
              whiteSpace: "nowrap", textAlign: "center", lineHeight: 1,
              transform: "translate(-50%,-50%)",
              textShadow: "0 0 26px rgba(255,255,255,0.16), 0 10px 24px rgba(0,0,0,0.42)",
              "--drift-x": `${burst.comboDriftX}px`,
              "--drift-y": `${burst.comboDriftY}px`,
              "--spin": `${burst.comboSpin}deg`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.28em", color: burst.labelColor, marginBottom: 4, paddingLeft: "0.28em" }}>COMBO</div>
              <div style={{ fontSize: `clamp(22px,${burst.comboSize/200*100}vw,${burst.comboSize}px)`, fontWeight: 900, letterSpacing: "-0.08em", color: burst.accent, lineHeight: 0.92 }}>
                x{burst.combo}
              </div>
            </div>
            <div style={{
              position: "absolute", left: burst.moneyX, top: burst.moneyY,
              pointerEvents: "none",
              animation: "moneyPop 0.56s ease-out forwards",
              whiteSpace: "nowrap", textAlign: "center",
              transform: "translate(-50%,-50%)",
              textShadow: "0 6px 18px rgba(0,0,0,0.32)",
              "--money-drift-x": `${burst.moneyDriftX}px`,
              "--money-drift-y": `${burst.moneyDriftY}px`,
              fontSize: `clamp(13px,${burst.moneySize/200*100}vw,${burst.moneySize}px)`,
              fontWeight: 800, color: burst.moneyColor, letterSpacing: "-0.03em",
            }}>
              +{formatPieces(burst.earned)}
            </div>
          </Fragment>
        ))}
      </Crystal>

      <Moss
        moss={moss} setMoss={setMoss}
        setGameOver={setGameOver} setMessage={setMessage}
        lastClickAt={lastClickAt} gameOver={gameOver}
        mossSpeedMult={crystal.mossSpeedMult ?? 1}
      />

      <Crack
        crack={crack} setCrack={setCrack}
        setGameOver={setGameOver} setMessage={setMessage}
        setPendingMoney={setPendingMoney}
        clickCount={clickCount} gameOver={gameOver}
        crackMin={crystal.crackMin ?? 1.5}
        crackMax={crystal.crackMax ?? 2.5}
      />

      {/* 수거 UI */}
      {(() => {
          const crackInfo = getCrackMultiplier(clickCount);

          const now = Date.now();
          const willContinueCombo = now - lastClickAt < (crystal.comboWindowMs ?? 500);
          const nextCombo = willContinueCombo ? combo + 1 : 1;
          const nextEarned = Math.floor(Math.pow(nextCombo, 2.5) * (crystal.rewardMult ?? 1) * 0.3);
        
          const mossRatio = (1 - moss / 100) * (9 / 10) + (1 / 10);
          const finalPreview = Math.floor(pendingMoney * crackInfo.mult * mossRatio);
        return (
          <div style={{ width: "min(100%,320px)", display: "flex", flexDirection: "column", gap: 8 }}>

            {/* 다음 클릭 예고 */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 10, padding: "7px 14px", boxSizing: "border-box",
            }}>
              <span style={{ fontSize: "clamp(11px,2.6vw,12px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
                다음 클릭 시
              </span>
              <span style={{ fontSize: "clamp(15px,4vw,18px)", fontWeight: 800, color: "#ffd700", textShadow: "0 0 12px rgba(255,215,0,0.4)" }}>
                +{formatPieces(nextEarned)}
              </span>
            </div>

            {/* 누적 돈 + 배율 */}
            <div style={{
              background: "rgba(236,228,212,0.08)", border: `1px solid ${crackInfo.color}33`,
              color: "#f1ebdd", borderRadius: 14, textAlign: "center",
              boxSizing: "border-box", lineHeight: 1.2, overflow: "hidden",
            }}>
              <div style={{ padding: "clamp(10px,2.8vw,12px) clamp(18px,6vw,28px)" }}>
                <div style={{ fontSize: "clamp(10px,2.4vw,12px)", opacity: 0.6, marginBottom: 2, letterSpacing: "0.1em" }}>
                  누적 중 (수거 전)
                </div>
                <div style={{ fontSize: "clamp(18px,5vw,22px)", fontWeight: 700 }}>
                  {formatPieces(pendingMoney)}
                </div>
              </div>
              {/* 수거 배율 바 */}
              <div style={{
                background: `${crackInfo.color}18`,
                borderTop: `0.5px solid ${crackInfo.color}33`,
                padding: "6px 14px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "clamp(10px,2.4vw,11px)", color: crackInfo.color, fontWeight: 600 }}>
                  {crackInfo.label} · {crackInfo.desc}
                </span>
                <span style={{ fontSize: "clamp(13px,3.4vw,15px)", fontWeight: 800, color: crackInfo.color }}>
                  → {formatPieces(finalPreview)}
                </span>
              </div>
              {/* 이끼 수익률 */}
              <div style={{
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
                padding: "5px 14px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "clamp(10px,2.4vw,11px)", color: "rgba(255,255,255,0.35)" }}>
                  이끼 페널티
                </span>
                <span style={{
                  fontSize: "clamp(11px,2.6vw,12px)", fontWeight: 700,
                  color: moss > 70 ? "#ff6b6b" : moss > 40 ? "#ff9f43" : "#86efac",
                }}>
                  {Math.round(mossRatio * 100)}% 수익
                </span>
              </div>
            </div>

            {/* 수거 버튼 */}
            <button
              onClick={handleCollect}
              disabled={pendingMoney <= 0 || gameOver}
              style={{
                padding: "clamp(11px,3vw,14px)", borderRadius: 14, border: "none",
                background: pendingMoney > 0 && !gameOver ? "linear-gradient(135deg,#2d6a4f,#52b788)" : "rgba(255,255,255,0.06)",
                color: pendingMoney > 0 && !gameOver ? "#fff" : "rgba(255,255,255,0.25)",
                fontSize: "clamp(15px,4vw,17px)", fontWeight: 700,
                cursor: pendingMoney > 0 && !gameOver ? "pointer" : "not-allowed",
                letterSpacing: "0.04em",
                transition: "background 0.2s, transform 0.1s",
                animation: collectFlash ? "collectFlash 0.6s ease" : "none",
                boxSizing: "border-box", width: "100%",
              }}
            >
              수거하기
            </button>

            {/* 총 보유 */}
            <div style={{
              background: "transparent", border: "none",
              color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px,3.4vw,15px)", fontWeight: 600,
              padding: "8px clamp(18px,6vw,28px)", borderRadius: 10, textAlign: "center", boxSizing: "border-box",
            }}>
              총 보유  {formatPieces(totalMoney)}
            </div>
          </div>
        );
      })()}
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
  gap: "clamp(14px, 3.5vw, 24px)",
  marginTop: "clamp(128px,31vw,152px)",
};

const playInfoStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  textAlign: "center",
  marginBottom: "clamp(20px,4.8vw,26px)",
};

const playNameStyle = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "clamp(12px,3.1vw,14px)",
  letterSpacing: "0.1em",
  margin: 0,
  lineHeight: 1.08,
};
