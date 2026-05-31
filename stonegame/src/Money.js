import { useRef, useState} from "react"
import Moss from './Moss'
import Crack from './Crack'

const crystals = [
  {
    name: "일반",
    price: 0,
    style: {
      background: "radial-gradient(circle at 35% 30%, #d0d0d0, #a0a0a0 40%, #6b6b6b 70%, #3a3a3a)",
      boxShadow: "0 8px 40px rgba(100,100,100,0.4), 0 0 0 2px rgba(255,255,255,0.1) inset",
    },
  },
  {
    name: "오션",
    style: {
      background: "radial-gradient(circle at 35% 30%, #a8edea, #4d96ff 45%, #0d47a1 80%)",
      boxShadow: "0 8px 40px rgba(77,150,255,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "파이어",
    style: {
      background: "radial-gradient(circle at 35% 30%, #fff176, #ffd93d 30%, #ff6b35 60%, #c0392b)",
      boxShadow: "0 8px 40px rgba(255,107,53,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
  {
    name: "갤럭시",
    style: {
      background: "radial-gradient(circle at 35% 30%, #e0c3fc, #c77dff 35%, #6a0dad 65%, #1a003d)",
      boxShadow: "0 8px 40px rgba(199,125,255,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset",
    },
  },
]

const mossDots = [
  { cx: 44, cy: 56, r: 5, start: 4, shade: "#77d65d" },
  { cx: 56, cy: 72, r: 4, start: 8, shade: "#53b74c" },
  { cx: 68, cy: 54, r: 3, start: 12, shade: "#9ce874" },
  { cx: 130, cy: 50, r: 4, start: 16, shade: "#7cd957" },
  { cx: 146, cy: 60, r: 5, start: 20, shade: "#49a942" },
  { cx: 118, cy: 70, r: 3, start: 24, shade: "#95df6f" },
  { cx: 54, cy: 120, r: 6, start: 28, shade: "#66c257" },
  { cx: 70, cy: 132, r: 4, start: 32, shade: "#8fe66b" },
  { cx: 88, cy: 116, r: 3, start: 36, shade: "#57b94a" },
  { cx: 136, cy: 126, r: 5, start: 40, shade: "#7dd161" },
  { cx: 122, cy: 144, r: 4, start: 44, shade: "#a4ef7e" },
  { cx: 154, cy: 138, r: 3, start: 48, shade: "#4da845" },
  { cx: 96, cy: 88, r: 6, start: 52, shade: "#7ed866" },
  { cx: 108, cy: 102, r: 4, start: 56, shade: "#65bc56" },
  { cx: 82, cy: 92, r: 3, start: 60, shade: "#95ea72" },
  { cx: 44, cy: 148, r: 5, start: 64, shade: "#5eb650" },
  { cx: 156, cy: 92, r: 4, start: 68, shade: "#81da64" },
  { cx: 100, cy: 146, r: 6, start: 72, shade: "#6bc95a" },
  { cx: 72, cy: 40, r: 3, start: 76, shade: "#a4ef85" },
  { cx: 128, cy: 154, r: 4, start: 80, shade: "#4ea446" },
]

const crackPaths = [
  { d: "M102 18 L96 48 L103 86 L97 120 L106 156", start: 8, width: 2.2 },
  { d: "M98 62 L78 78 L64 96", start: 20, width: 1.8 },
  { d: "M101 92 L122 108 L138 126", start: 32, width: 1.8 },
  { d: "M97 118 L76 138 L60 154", start: 48, width: 1.6 },
  { d: "M103 50 L126 42 L146 34", start: 58, width: 1.5 },
  { d: "M108 136 L128 150 L144 164", start: 72, width: 1.4 },
  { d: "M92 38 L78 26 L62 20", start: 82, width: 1.3 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function Money({ money, setMoney, combo, setCombo, selectedCrystal, moss, setMoss, gameOver, setGameOver, setMessage, crack, setCrack})  {
  const crystalIdx = selectedCrystal ?? 0
  const [comboBursts, setComboBursts] = useState([])
  const [pressing, setPressing] = useState(false)
  const [clicked, setClicked] = useState(0);
  const lastClickTime = useRef(0)
  const particleId = useRef(0)

  function handleClick() {
    const now = Date.now()
    const diff = now - lastClickTime.current
    let newCombo = diff < 500 ? combo + 1 : 1
    setCombo(newCombo)
    lastClickTime.current = now
    setMoney(prev => prev + newCombo)
    setMoss(prev => Math.max(0, prev - 3))

    const id = particleId.current++
    const accent =
      newCombo >= 15 ? "#ff9cfb" :
      newCombo >= 10 ? "#ffd166" :
      newCombo >= 5 ? "#8be9fd" :
      "#ffffff"
    const size = Math.min(42 + newCombo * 2.4, 86)

    setComboBursts(prev => [
      ...prev,
      { id, combo: newCombo, earned: newCombo, accent, size },
    ])
    setTimeout(() => {
      setComboBursts(prev => prev.filter(burst => burst.id !== id))
    }, 650)

    setClicked(prev => prev + 1) 
  }

  function handleCrystalClick() {
    handleClick()
  }


  const crystal = crystals[crystalIdx]
  const mossLevel = clamp(moss / 100, 0, 1)

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      padding: 32,
      position: "relative",
    }}>
      <style>{`
        @keyframes comboPop {
          0% {
            opacity: 0;
            transform: translate(-50%, 12px) scale(0.55);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1.14);
          }
          45% {
            opacity: 1;
            transform: translate(-50%, -4px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -42px) scale(0.94);
          }
        }
      `}</style>

      {/* 크리스탈 이름 */}
      <p style={{
        color: "rgba(255,255,255,0.4)",
        fontSize: 13,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        margin: 0,
      }}>
        {crystal.name} 돌멩이
      </p>

      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
       

        {/* 크리스탈 구체 */}
        <div
          onClick={handleCrystalClick}
          onMouseDown={() => setPressing(true)}
          onMouseUp={() => setPressing(false)}
          onMouseLeave={() => setPressing(false)}
          style={{
            position: "relative",
            width: 200,
            height: 200,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            ...crystal.style,
            transform: pressing ? "scale(0.93)" : "scale(1)",
            transition: "transform 0.12s cubic-bezier(0.34,1.56,0.64,1)",
          }} />

          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            overflow: "hidden",
            pointerEvents: "none",
          }}>
            <svg
              viewBox="0 0 200 200"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <defs>
                <clipPath id="crystalClip">
                  <circle cx="100" cy="100" r="100" />
                </clipPath>
                <filter id="mossBlur">
                  <feGaussianBlur stdDeviation="0.9" />
                </filter>
              </defs>

              <g clipPath="url(#crystalClip)">
                <ellipse
                  cx="100"
                  cy="140"
                  rx="72"
                  ry="38"
                  fill="rgba(28, 84, 32, 0.10)"
                  opacity={mossLevel}
                />

                {mossDots.map((dot, index) => {
                  const strength = clamp((moss - dot.start) / 14, 0, 1)

                  return (
                    <g key={index} opacity={strength} filter="url(#mossBlur)">
                      <circle
                        cx={dot.cx}
                        cy={dot.cy}
                        r={dot.r + strength * 1.2}
                        fill={dot.shade}
                      />
                      <circle
                        cx={dot.cx - 1}
                        cy={dot.cy - 1}
                        r={Math.max(dot.r * 0.45, 1.4)}
                        fill="rgba(198, 255, 173, 0.34)"
                      />
                    </g>
                  )
                })}

                {crackPaths.map((path, index) => {
                  const strength = clamp((crack - path.start) / 18, 0, 1)

                  return (
                    <g key={index} opacity={strength}>
                      <path
                        d={path.d}
                        fill="none"
                        stroke="rgba(18, 18, 18, 0.62)"
                        strokeWidth={path.width + 1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={path.d}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.36)"
                        strokeWidth={Math.max(path.width - 0.6, 0.8)}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>

          {/* 하이라이트 */}
          <div style={{
            position: "absolute",
            top: "14%", left: "20%",
            width: "35%", height: "22%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.28)",
            filter: "blur(6px)",
            pointerEvents: "none",
          }} />

          {comboBursts.map(burst => (
            <div key={burst.id} style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              pointerEvents: "none",
              animation: "comboPop 0.65s cubic-bezier(0.2, 0.9, 0.25, 1) forwards",
              whiteSpace: "nowrap",
              textAlign: "center",
              lineHeight: 1,
              transform: "translate(-50%, 0)",
              textShadow: "0 0 28px rgba(255,255,255,0.2), 0 8px 24px rgba(0, 0, 0, 0.45)",
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.72)",
                marginBottom: 6,
                paddingLeft: "0.32em",
              }}>
                COMBO
              </div>
              <div style={{
                fontSize: burst.size,
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: burst.accent,
              }}>
                {burst.combo}
              </div>
              <div style={{
                marginTop: 4,
                fontSize: 18,
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.03em",
              }}>
                +{burst.earned}원
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {/* 이끼 */}
      <Moss moss={moss} setMoss={setMoss} setGameOver={setGameOver} setMessage={setMessage} lastClickTime={lastClickTime} gameOver={gameOver}/>

      {/* 깨짐 */}
      <Crack  crack={crack} setCrack={setCrack} setGameOver={setGameOver} setMessage={setMessage} clicked = {clicked} gameOver = {gameOver}/>

      {/* 돈 표시 */}
      <div style={{
        background: "rgba(255,249,160,0.12)",
        border: "1px solid rgba(255,249,160,0.3)",
        color: "#fffaaa",
        fontSize: 26,
        fontWeight: 700,
        padding: "12px 36px",
        borderRadius: 14,
        minWidth: 200,
        textAlign: "center",
      }}>
        {money.toLocaleString()}원
      </div>

    
    </div>
  )
}
