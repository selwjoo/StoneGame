import { useState, useRef } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Crack from './Crack';
//import Moss from "./Moss";
import Money from './Money';
//import Potion from './Potion';
//import GameOver from './GameOver';
import Start from './Start';

function App() {
  const [money, setMoney] = useState(0); // 돈
  const [combo, setCombo] = useState(1); // 클릭 시 돈 증가 배율

  const [moss, setMoss] = useState(0); // 이끼
  const [crack, setCrack] = useState(0); // 돌 깨짐

  const [gameOver, setGameOver] = useState(false); // 게임 종료시 true!! // 포션 구매 시, 다시 false로 변경
  const [message, setMessage] = useState(''); // 게임 종료 후 포션 구매 or 포기 선택하는 메세지 창 팝업

  const [potionPrice, setPotionPrice] = useState(50); // 포션 가격
  const [reviveCount, setReviveCount] = useState(0); 
  // 부활 횟수..! 초기에 0으로 선언하여 (부활횟수) x (포션 가격) x 3 하여 포션 가격을 업데이트 후, 부활 횟수에 1을 더하는 형태

  const [selectedCrystal, setSelectedCrystal] = useState(0); // 👈 고른 크리스탈 공유

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }} >

    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Start money={money} setMoney={setMoney} selectedCrystal={selectedCrystal} setSelectedCrystal={setSelectedCrystal}/>} />
        <Route path="/money" element={<Money  money = {money} setMoney = {setMoney} combo = {combo} setCombo = {setCombo} selectedCrystal={selectedCrystal} moss={moss} setMoss={setMoss} gameOver={gameOver} setGameOver={setGameOver} setMessage={setMessage}/>} />
  
      </Routes>
    </BrowserRouter>
    </div>

    
  );
}

export default App;
