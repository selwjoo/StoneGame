import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Money from './Money';
import GameOver from './GameOver';
import Start from './Start';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { authFetch } from './auth';

const PROGRESS_REQUEST_TIMEOUT_MS = 1500;
const DEFAULT_POTION_PRICE = 120000;

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("progress-timeout")), timeoutMs);
    }),
  ]);
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [totalMoney, setTotalMoney] = useState(0);
  const [pendingMoney, setPendingMoney] = useState(0);
  const [forfeitedReward, setForfeitedReward] = useState(0);
  const [combo, setCombo] = useState(1);
  const [unlockedCrystals, setUnlockedCrystals] = useState([0]);
  const [progressReady, setProgressReady] = useState(false);

  const [moss, setMoss] = useState(0);
  const [crack, setCrack] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const [potionPrice, setPotionPrice] = useState(DEFAULT_POTION_PRICE);
  const [reviveCount, setReviveCount] = useState(0);

  const [selectedCrystal, setSelectedCrystal] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadProgress() {
      const access = localStorage.getItem("access");
      if (!access) {
        if (!ignore) setProgressReady(true);
        return;
      }

      try {
        const res = await withTimeout(
          authFetch("/api/progress/"),
          PROGRESS_REQUEST_TIMEOUT_MS
        );
        if (!res.ok) return;

        const data = await res.json();
        if (ignore) return;

        setTotalMoney(Number(data.total_money) || 0);
        setUnlockedCrystals(normalizeUnlockedCrystals(data.unlocked_crystals));
        setPotionPrice(Math.max(Number(data.potion_price) || 0, DEFAULT_POTION_PRICE));
        setSelectedCrystal(0);
      } catch (error) {
      } finally {
        if (!ignore) setProgressReady(true);
      }
    }

    loadProgress();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!progressReady || !localStorage.getItem("access")) return;

    const timeoutId = setTimeout(() => {
      authFetch("/api/progress/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_money: totalMoney,
          unlocked_crystals: normalizeUnlockedCrystals(unlockedCrystals),
          selected_crystal: selectedCrystal,
          potion_price: potionPrice,
        }),
      }).catch(() => {});
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [progressReady, totalMoney, unlockedCrystals, selectedCrystal, potionPrice]);

  if (!progressReady) {
    return <div style={{ background: "#0a0a0f", minHeight: "100vh" }} />;
  }

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/start" element={
        <PrivateRoute>
        <Start
      money={totalMoney}
      setTotalMoney={setTotalMoney}
      unlockedCrystals={unlockedCrystals}
      setUnlockedCrystals={setUnlockedCrystals}
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
                setForfeitedReward={setForfeitedReward}
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
        </Routes>
        <GameOver
          totalMoney={totalMoney}
          setTotalMoney={setTotalMoney}
          pendingMoney={pendingMoney}
          forfeitedReward={forfeitedReward}
          setPendingMoney={setPendingMoney}
          setForfeitedReward={setForfeitedReward}
          setMoss={setMoss}
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

function normalizeUnlockedCrystals(value) {
  const base = Array.isArray(value) ? value : [];
  const numeric = base
    .map(item => Number(item))
    .filter(item => Number.isInteger(item) && item >= 0);

  if (!numeric.includes(0)) numeric.unshift(0);
  return [...new Set(numeric)].sort((a, b) => a - b);
}

export default App;
