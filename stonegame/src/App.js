import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Money from "./Money"
import Start from "./Start"

function App() {

  const [money, setMoney] = useState(0)
  const [combo, setCombo] = useState(1)

  const [moss, setMoss] = useState(0)
  const [crack, setCrack] = useState(0)

  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")

  const [selectedCrystal, setSelectedCrystal] = useState(0)

  return (
    <div
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              <Start
                money={money}
                setMoney={setMoney}
                selectedCrystal={selectedCrystal}
                setSelectedCrystal={setSelectedCrystal}
              />
            }
          />

          <Route
            path="/money"
            element={
              <Money
                money={money}
                setMoney={setMoney}

                combo={combo}
                setCombo={setCombo}

                moss={moss}
                setMoss={setMoss}

                crack={crack}
                setCrack={setCrack}

                gameOver={gameOver}
                setGameOver={setGameOver}

                message={message}
                setMessage={setMessage}

                selectedCrystal={selectedCrystal}
              />
            }
          />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App