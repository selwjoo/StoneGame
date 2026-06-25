import { useEffect, useRef } from "react";

export default function BackgroundEffect({ crystalName }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    const W = () => canvas.width;
    const H = () => canvas.height;

    const particles = [];

    function spawnParticle() {
      switch (crystalName) {
        case "수성": // 태양풍 스파크 효과
          particles.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            r: 1 + Math.random() * 2,
            alpha: 0.3 + Math.random() * 0.5,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            hue: 35 + Math.random() * 15, // 황금빛 노란색
          });
          break;

        case "화성": // 붉은 모래 폭풍 효과
          particles.push({
            x: -10,
            y: Math.random() * H(),
            r: 2 + Math.random() * 4,
            alpha: 0.2 + Math.random() * 0.3,
            vx: 1.5 + Math.random() * 2.5,
            vy: (Math.random() - 0.5) * 0.5,
            hue: 15 + Math.random() * 15, // 붉은 황토색
          });
          break;

        case "목성": // 느리게 회전하며 빨려 들어가는 가스 구름 고리 효과
          const angle = Math.random() * Math.PI * 2;
          const dist = (0.2 + Math.random() * 0.5) * Math.max(W(), H());
          particles.push({
            cx: W() / 2, cy: H() / 2,
            angle, dist,
            orbitSpeed: (0.001 + Math.random() * 0.002) * (Math.random() > 0.5 ? 1 : -1),
            inSpeed: 0.1 + Math.random() * 0.15,
            r: 3 + Math.random() * 4,
            alpha: 0.4 + Math.random() * 0.4,
            hue: 25 + Math.random() * 20, // 오렌지 브라운 계열
          });
          break;

        case "해왕성": // 차가운 푸른 서리 가스 업스핀 효과
          particles.push({
            x: Math.random() * W(),
            y: H() + 15,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -(0.8 + Math.random() * 1.5),
            r: 3 + Math.random() * 5,
            alpha: 0.2 + Math.random() * 0.3,
            hue: 190 + Math.random() * 20, // 시원한 시안 파란색
          });
          break;

        case "태양": // 활활 타오르는 불꽃 파티클
          particles.push({
            x: Math.random() * W(),
            y: H() * 0.85 + Math.random() * H() * 0.15,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(1.8 + Math.random() * 3.2),
            r: 4 + Math.random() * 6,
            alpha: 0.9,
            hue: 10 + Math.random() * 30,
            life: 1,
          });
          break;

        case "은하": // 몽환적인 성운과 은하수 효과
          const isMilkyWay = Math.random() > 0.35;
          let gx, gy;
          if (isMilkyWay) {
            const t = Math.random();
            gx = t * W();
            gy = (t * H() * 0.7) + H() * 0.1 + (Math.random() - 0.5) * H() * 0.18;
          } else {
            gx = Math.random() * W();
            gy = Math.random() * H();
          }
          particles.push({
            x: gx, y: gy,
            r: isMilkyWay ? 1 + Math.random() * 3 : 2 + Math.random() * 4,
            alpha: 0,
            maxAlpha: isMilkyWay ? 0.6 + Math.random() * 0.4 : 0.5 + Math.random() * 0.4,
            hue: isMilkyWay ? 200 + Math.random() * 60 : 260 + Math.random() * 60,
            phase: Math.random() * Math.PI * 2,
            speed: 0.025 + Math.random() * 0.04,
            isMilkyWay,
          });
          break;

        default: // 달 - 은은하게 빛나는 기본 우주 성간 물질 효과
          particles.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: 1.5 + Math.random() * 3.5,
            alpha: 0.2 + Math.random() * 0.3,
          });
      }
    }

    const initCount = (crystalName === "은하" || crystalName === "목성") ? 140 : 50;
    for (let i = 0; i < initCount; i++) {
      spawnParticle();
    }

    let frame = 0;

    function tick() {
      ctx.clearRect(0, 0, W(), H());
      frame++;

      const spawnRate = crystalName === "은하" ? 12 : (crystalName === "해왕성" ? 8 : 2);
      const maxParticles = crystalName === "은하" ? 180 : 130;

      if (frame % spawnRate === 0 && particles.length < maxParticles) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        let dead = false;

        switch (crystalName) {
          case "수성":
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.005;
            if (p.alpha <= 0) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`;
              ctx.fill();
            }
            break;

          case "화성":
            p.x += p.vx;
            p.y += p.vy;
            if (p.x > W() + 10) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 65%, 45%, ${p.alpha})`;
              ctx.fill();
            }
            break;

          case "목성":
            p.angle += p.orbitSpeed;
            p.dist -= p.inSpeed;
            p.alpha -= 0.002;
            if (p.dist < 10 || p.alpha <= 0) dead = true;
            else {
              const px = p.cx + Math.cos(p.angle) * p.dist;
              const py = p.cy + Math.sin(p.angle) * p.dist;
              ctx.beginPath();
              ctx.arc(px, py, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 55%, 55%, ${p.alpha})`;
              ctx.fill();
            }
            break;

          case "해왕성":
            p.y += p.vy;
            p.x += p.vx;
            if (p.y < -20) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
              ctx.fill();
            }
            break;

          case "태양":
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.022;
            p.r *= 0.98;
            if (p.life <= 0) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue},100%,${50 + p.life * 30}%,${p.life})`;
              ctx.shadowColor = `hsla(${p.hue},100%,60%, 0.5)`;
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            break;

          case "은하":
            p.phase += p.speed;
            p.alpha = p.maxAlpha * (0.4 + Math.abs(Math.sin(p.phase)) * 0.6);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            if (p.isMilkyWay) {
              ctx.fillStyle = `hsla(${p.hue},100%,92%,${p.alpha})`;
              ctx.shadowColor = `hsla(${p.hue},100%,85%,0.9)`;
              ctx.shadowBlur = 12;
            } else {
              ctx.fillStyle = `hsla(${p.hue},90%,85%,${p.alpha})`;
              ctx.shadowColor = `hsla(${p.hue},100%,80%,0.6)`;
              ctx.shadowBlur = 6;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
            break;

          default:
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W();
            if (p.x > W()) p.x = 0;
            if (p.y < 0) p.y = H();
            if (p.y > H()) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,180,180,${p.alpha})`;
            ctx.fill();
        }

        if (dead) particles.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [crystalName]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}