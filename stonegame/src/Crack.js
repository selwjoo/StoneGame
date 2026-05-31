import { useEffect } from "react";

function Crack({
  crack,
  setCrack,
  setGameOver,
  setMessage,
  clicked,
  gameOver,
}) {

  useEffect(() => {

    if (gameOver) return;

    setCrack((prev) => {

      let increase = 0;

      // 0 ~ 35%
      if (prev < 35) {
        increase = 0.14;
      }

      // 35 ~ 80%
      else if (prev < 80) {
        increase = 0.5;
      }

      // 80 ~ 100%
      else {
        increase = 1;
      }

      const next = prev + increase;

      if (next >= 100) {
        setGameOver(true);
        setMessage("💥 돌이 완전히 깨졌습니다...");
        return 100;
      }

      return next;
    });

  }, [clicked, gameOver, setCrack, setGameOver, setMessage]);

  return (
    <div style={{ width: "300px" }}>

      <h2
        style={{
          color: "white",
          marginBottom: "10px",
        }}
      >
        💥 금 간 정도 : {crack.toFixed(1)}%
      </h2>

      <div
        style={{
          width: "100%",
          height: "20px",
          background: "#333",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${crack}%`,
            height: "100%",
            background:
              crack > 80
                ? "#ff2d2d"
                : crack > 35
                ? "#ff9f43"
                : "#ffd93d",
            transition: "0.1s",
          }}
        />
      </div>

    </div>
  );
}

export default Crack;
