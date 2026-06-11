import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Money from './Money';
import GameOver from './GameOver';
import Start from './Start';

function App() {
  const [money, setMoney] = useState(0); // 돈
  const [combo, setCombo] = useState(1); // 클릭 시 돈 증가 배율

  const [moss, setMoss] = useState(0); // 이끼
  const [crack, setCrack] = useState(0); // 돌 깨짐

  const [gameOver, setGameOver] = useState(false); // 게임 종료시 true!! // 포션 구매 시, 다시 false로 변경
  const [message, setMessage] = useState(''); // 게임 종료 후 포션 구매 or 포기 선택하는 메세지 창 팝업

  const [potionPrice, setPotionPrice] = useState(10); // 포션 가격 // 원활한 진행을 위하여 임의로 가격 조정
  const [reviveCount, setReviveCount] = useState(0); 
  // 부활 횟수..! 초기에 0으로 선언하여 (부활횟수) x (포션 가격) x 3 하여 포션 가격을 업데이트 후, 부활 횟수에 1을 더하는 형태

  const [selectedCrystal, setSelectedCrystal] = useState(0); // 고른 크리스탈 공유

  // 보유한 크리스탈 목록 (0번 "일반"은 기본 보유)
  // localStorage에서 불러오고, 없으면 [0]으로 시작
  const [ownedCrystals, setOwnedCrystals] = useState(() => {
    try {
      const saved = localStorage.getItem("ownedCrystals");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("ownedCrystals 불러오기 실패", e);
    }
    return [0];
  });

  // ownedCrystals가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("ownedCrystals", JSON.stringify(ownedCrystals));
  }, [ownedCrystals]);

  // money도 새로고침해도 유지되도록 저장/불러오기
  const [moneyLoaded, setMoneyLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("money");
      if (saved !== null) setMoney(Number(saved));
    } catch (e) {
      console.error("money 불러오기 실패", e);
    } finally {
      setMoneyLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!moneyLoaded) return; // 초기 로드 전에는 덮어쓰지 않음
    localStorage.setItem("money", String(money));
  }, [money, moneyLoaded]);

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }} >

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Start
            money={money}
            setMoney={setMoney}
            selectedCrystal={selectedCrystal}
            setSelectedCrystal={setSelectedCrystal}
            ownedCrystals={ownedCrystals}
            setOwnedCrystals={setOwnedCrystals}
          />
        } />
        <Route path="/money" element={<Money  money = {money} setMoney = {setMoney} combo = {combo} setCombo = {setCombo} selectedCrystal={selectedCrystal}  moss={moss} setMoss={setMoss} gameOver={gameOver} setGameOver={setGameOver} setMessage={setMessage} crack={crack} setCrack={setCrack}/>} />
      </Routes>
      <GameOver
      money={money}
      setMoney={setMoney}
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