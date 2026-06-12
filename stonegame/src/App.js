import { useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Money from './Money';
import GameOver from './GameOver';
import Start from './Start';

function App() {
  const [totalMoney, setTotalMoney] = useState(0);   // 수거로 확정된 돈
  const [pendingMoney, setPendingMoney] = useState(0); // 수거 전 누적 돈 (깨지면 날아감)
  const [combo, setCombo] = useState(1);

  const [moss, setMoss] = useState(0);
  const [crack, setCrack] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const [potionPrice, setPotionPrice] = useState(50);
  const [reviveCount, setReviveCount] = useState(0);

  const [selectedCrystal, setSelectedCrystal] = useState(0);

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Start
              money={totalMoney}
              setMoney={setTotalMoney}
              selectedCrystal={selectedCrystal}
              setSelectedCrystal={setSelectedCrystal}
            />}
          />
          <Route path="/money" element={
            <Money
              totalMoney={totalMoney}
              setTotalMoney={setTotalMoney}
              pendingMoney={pendingMoney}
              setPendingMoney={setPendingMoney}
              combo={combo}
              setCombo={setCombo}
              selectedCrystal={selectedCrystal}
              moss={moss}
              setMoss={setMoss}
              gameOver={gameOver}
              setGameOver={setGameOver}
              setMessage={setMessage}
              crack={crack}
              setCrack={setCrack}
            />}
          />
        </Routes>
        <GameOver
          totalMoney={totalMoney}
          setTotalMoney={setTotalMoney}
          setPendingMoney={setPendingMoney}
          moss={moss}
          setMoss={setMoss}
          crack={crack}
          setCrack={setCrack}
          gameOver={gameOver}
          setGameOver={setGameOver}
          message={message}
          setMessage={setMessage}
          potionPrice={potionPrice}
          setPotionPrice={setPotionPrice}
          reviveCount={reviveCount}
          setReviveCount={setReviveCount}
          setCombo={setCombo}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;