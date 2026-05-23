import { useRef, useState} from "react"
import Moss from './Moss'

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

export default function Money({ money, setMoney, combo, setCombo, selectedCrystal,  moss, setMoss, gameOver, setGameOver, setMessage }) {
  const [crystalIdx, setCrystalIdx] = useState(selectedCrystal ?? 0)
  const [particles, setParticles] = useState([])
  const [pressing, setPressing] = useState(false)
  const lastClickTime = useRef(0)
  const particleId = useRef(0)

  function handleClick(clientX, clientY, fromBtn = false) {
    const now = Date.now()
    const diff = now - lastClickTime.current
    let newCombo = diff < 500 ? combo + 1 : 1
    setCombo(newCombo)
    lastClickTime.current = now
    setMoney(prev => prev + newCombo)

    const id = particleId.current++
    const x = fromBtn ? 100 : clientX
    const y = fromBtn ? 100 : clientY
    setParticles(prev => [...prev, { id, x, y, combo: newCombo }])
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 700)
  }

  function handleCrystalClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    handleClick(e.clientX - rect.left, e.clientY - rect.top)
  }


  const crystal = crystals[crystalIdx]

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
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-70px) scale(1.2); }
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

          {/* 콤보 뱃지 */}
          {combo >= 2 && (
            <div style={{
              position: "absolute",
              top: -10, right: -10,
              background: "linear-gradient(135deg, #ffd93d, #ff6b35)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 20,
              whiteSpace: "nowrap",
            }}>
              x{combo} 콤보!
            </div>
          )}

          {/* 클릭 파티클 */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute",
              left: p.x - 20,
              top: p.y - 20,
              color: p.combo >= 3 ? "#ffd93d" : "rgba(255,255,255,0.9)",
              fontSize: p.combo >= 3 ? 16 : 14,
              fontWeight: 700,
              pointerEvents: "none",
              animation: "floatUp 0.7s ease-out forwards",
              whiteSpace: "nowrap",
            }}>
              {p.combo >= 2 ? `+${p.combo} 콤보!` : "+1"}
            </div>
          ))}
        </div>

        
      </div>
      {/* 이끼 */}
      <Moss moss={moss} setMoss={setMoss} setGameOver={setGameOver} setMessage={setMessage} lastClickTime={lastClickTime} gameOver={gameOver}/>

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