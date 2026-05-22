import { useRef } from "react"


export default function Money({money, setMoney, combo, setCombo}) {
  const lastClickTime = useRef(0) // 마지막 클릭 시간은 화면에 표시할거 아니니까 기억만 하면 되서 useState가 아니라 useRef임. 유가릿? 
  

  function handleClick() {
    const now = Date.now()
    const diff = now - lastClickTime.current           // 시간 차이 계산

    let newCombo = 1

    if (diff < 500) {
      newCombo = combo + 1                             // 빠르면 콤보 +1
    } else {
      newCombo = 1                          // 느리면 콤보 리셋
    }

    setCombo(newCombo)                          // state 업데이트
    lastClickTime.current = Date.now()          // //UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환한다.( 즉 right now )
    setMoney(money + newCombo)      // 콤보 배율 적용!
  }

  

  return (
    <div>
      <h1>💰 {money}원</h1>
      <button onClick={handleClick}>클릭해서 돈 벌기</button>

    </div>

  )
}

