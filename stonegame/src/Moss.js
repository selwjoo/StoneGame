import { useEffect } from "react";

function getMossIncrease(moss) {
  if (moss < 15) return 1.2;
  if (moss < 35) return 2.1;
  if (moss < 55) return 3.4;
  if (moss < 75) return 5.2;
  if (moss < 90) return 7.4;
  return 10;
}

function Moss({
  moss,
  setMoss,
  setGameOver,
  setMessage,
  lastClickTime,
  gameOver,
}) {

  useEffect(() => {

    const timer = setInterval(() => {

      if (gameOver) return;

      const now = Date.now();

      if (now - lastClickTime.current <= 1200) return;

      setMoss((prev) => {

        const next = prev + getMossIncrease(prev);

        if (next >= 100) {
          setGameOver(true);
          setMessage("이끼가 돌을 완전히 덮었습니다");
          return 100;
        }

        return next;
      });

    }, 700);

    return () => clearInterval(timer);

  }, [
    gameOver,
    lastClickTime,
    setGameOver,
    setMessage,
    setMoss,
  ]);

  return (
    <div style={{ width: "300px" }}>

      <h2
        style={{
          color: "white",
          marginBottom: "10px",
        }}
      >
        🌿 이끼 : {Math.floor(moss)}%
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
            width: `${moss}%`,
            height: "100%",
            background:
              moss > 70
                ? "#14532d"
                : moss > 40
                ? "#22c55e"
                : "#86efac",
            transition: "0.2s",
          }}
        />
      </div>

    </div>
  );
}

export default Moss;
