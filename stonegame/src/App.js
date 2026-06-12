import { useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Money from './Money';
import GameOver from './GameOver';
import Start from './Start';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';


function App() {
  const [totalMoney, setTotalMoney] = useState(0);
  const [pendingMoney, setPendingMoney] = useState(0);
  const [combo, setCombo] = useState(1);

  const [moss, setMoss] = useState(0);
  const [crack, setCrack] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const [potionPrice, setPotionPrice] = useState(50000);
  const [reviveCount, setReviveCount] = useState(0);

  const [selectedCrystal, setSelectedCrystal] = useState(0);
  const [unlockedCrystals, setUnlockedCrystals] = useState([0]); // 잠금해제된 돌 인덱스

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Start
              money={totalMoney}
              setMoney={setTotalMoney}
              selectedCrystal={selectedCrystal}
              setSelectedCrystal={setSelectedCrystal}
              />
            </PrivateRoute>}
            
          />
          <Route path="/money" element={
            <PrivateRoute>
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
            />
            </PrivateRoute>}
            
          />

          <Route path="/signup" element={<Signup />} />
          
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
          setSelectedCrystal={setSelectedCrystal}
        />

        
      </BrowserRouter>
    </div>
  );
}

export default App;