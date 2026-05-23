import { useRef, useState } from "react"
import Crack from "./Crack"
import Moss from "./Moss"

const crystals = [
  {
    name: "레인보우",
    style: {
      background: "radial-gradient(circle at 35% 30%, #ff9a9e, #ffd93d 30%, #6bcb77 55%, #4d96ff 75%, #c77dff)",
      boxShadow: "0 8px 40px rgba(180,107,255,0.45), 0 0 0 2px rgba(255,255,255,0.15) inset",
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

export default function Money({
  money,
  setMoney,
  combo,
  setCombo,

  moss,
  setMoss,

  crack,
  setCrack,

  gameOver,
  setGameOver,

  message,
  setMessage,

  selectedCrystal
}) {

  const [crystalIdx, setCrystalIdx] = useState(selectedCrystal ?? 0)
  const [particles, setParticles] = useState([])
  const [pressing, setPressing] = useState(false)
  const [clicked, setClicked] = useState(false)

  const lastClickTime = useRef(0)
  const particleId = useRef(0)

  function handleClick(clientX, clientY, fromBtn = false) {

    if (gameOver) return

    setClicked(prev => !prev)

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

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id))
    }, 700)
  }

  function handleCrystalClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()

    handleClick(
      e.clientX - rect.left,
      e.clientY - rect.top
    )
  }

  function prevCrystal() {
    setCrystalIdx(i => (i - 1 + crystals.length) % crystals.length)
    setCombo(1)
  }

  function nextCrystal() {
    setCrystalIdx(i => (i + 1) % crystals.length)
    setCombo(1)
  }

  const crystal = crystals[crystalIdx]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: 32,
        position: "relative",
      }}
    >

      <Crack
        crack={crack}
        setCrack={setCrack}
        setGameOver={setGameOver}
        setMessage={setMessage}
        clicked={clicked}
      />

      <Moss
        moss={moss}
        setMoss={setMoss}
        setGameOver={setGameOver}
        setMessage={setMessage}
        lastClickTime={lastClickTime}
        gameOver={gameOver}
      />

      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-70px) scale(1.2); }
        }
      `}</style>

      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 13,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {crystal.name} 크리스탈
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>

        <button
          onClick={prevCrystal}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ‹
        </button>

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

          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              ...crystal.style,
              transform: pressing ? "scale(0.93)" : "scale(1)",
              transition: "transform 0.12s",
            }}
          />

          {combo >= 2 && (
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                background: "orange",
                color: "white",
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              x{combo} 콤보!
            </div>
          )}

          {particles.map(p => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x - 20,
                top: p.y - 20,
                color: "white",
                fontWeight: 700,
                animation: "floatUp 0.7s ease-out forwards",
                pointerEvents: "none",
              }}
            >
              +{p.combo}
            </div>
          ))}

        </div>

        <button
          onClick={nextCrystal}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ›
        </button>

      </div>

      <div
        style={{
          background: "rgba(255,249,160,0.12)",
          border: "1px solid rgba(255,249,160,0.3)",
          color: "#fffaaa",
          fontSize: 26,
          fontWeight: 700,
          padding: "12px 36px",
          borderRadius: 14,
          minWidth: 200,
          textAlign: "center",
        }}
      >
        {money.toLocaleString()}원
      </div>

      <button
        onClick={() => handleClick(0, 0, true)}
        style={{
          padding: "14px 40px",
          borderRadius: 40,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "white",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        클릭해서 돈 벌기
      </button>

      {gameOver && (
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

    </div>
  )
}