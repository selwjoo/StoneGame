import { useEffect } from "react";

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

      // 2초 이상 클릭 안 하면 이끼 증가
      if (now - lastClickTime.current > 2000) {

        setMoss((prev) => {

          let next = prev + 5;

          if (next >= 100) {
            setGameOver(true);
            setMessage("🌿 이끼가 돌을 완전히 덮었습니다...");
            return 100;
          }

          return next;
        });

      } else {

      // 클릭하면 이끼 초기화
       setMoss(0);

   }

    }, 1000);

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