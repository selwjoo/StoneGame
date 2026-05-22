import { useState } from "react"
import Crack from './Crack';
import Money from './Money';
import Moss from "./Moss";
import Potion from './Potion';

function App() {
  const [money, setMoney] = useState(0);
  const [combo, setCombo] = useState(1);

  const [moss, setMoss] = useState(0);
  const [crack, setCrack] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');

  const [potionPrice, setPotionPrice] = useState(50);
  const [reviveCount, setReviveCount] = useState(1);

  const [message, setMessage] = useState('');

  return (
    <div>
      <Crack />
      <Money money={money} setMoney={setMoney} combo={combo} setCombo={setCombo} />
      <Moss />
      <Potion />
    </div>
  );
}

export default App;