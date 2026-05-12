import { useState } from "react"

export default function App() {
  const [money, setMoney] = useState(0)  // 시작 돈은 0원
  const lastClickTime = useRef(0) // 마지막 클릭 시간은 화면에 표시할거 아니니까 기억만 하면 되서 useState가 아니라 useRef임. 유가릿? 

  function handleClick() {
    setMoney(money +1)  // 클릭하면 돈 1 증가
    lastClickTime.current = Date.now() // 클릭 시간을 저장하는것이죠 ㅋ
  }

  return (
    <div>
      <h1>💰 {money}원</h1>
      <button onClick={handleClick}>클릭해서 돈 벌기</button>
    </div>
  )
}

