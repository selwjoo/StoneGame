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

    // 파티클 생성
    const particles = [];

    function spawnParticle() {
      switch (crystalName) {
        case "오션":
          particles.push({
            x: Math.random() * W(),
            y: H() + 10,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(1.5 + Math.random() * 2),
            r: 4 + Math.random() * 8,
            alpha: 0.6 + Math.random() * 0.4,
            wobble: Math.random() * Math.PI * 2,
          });
          break;
        case "파이어":
          particles.push({
            x: Math.random() * W(),
            y: H() * 0.5 + Math.random() * H() * 0.5,
            vx: (Math.random() - 0.5) * 2,
            vy: -(2 + Math.random() * 4),
            r: 4 + Math.random() * 8,
            alpha: 0.9,
            hue: 10 + Math.random() * 35,
            life: 1,
          });
          break;
        case "갤럭시":
          particles.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            r: 2 + Math.random() * 4,
            alpha: 0,
            maxAlpha: 0.6 + Math.random() * 0.4,
            hue: 250 + Math.random() * 80,
            phase: Math.random() * Math.PI * 2,
            speed: 0.03 + Math.random() * 0.05,
            born: true,
          });
          break;
        case "썬더":
          particles.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            r: 3 + Math.random() * 5,
            alpha: 0.9 + Math.random() * 0.1,
            isBolt: Math.random() > 0.4,
            life: 1,
            decay: 0.05 + Math.random() * 0.08,
          });
          break;
        case "블러드":
          particles.push({
            x: Math.random() * W(),
            y: -10,
            vy: 2 + Math.random() * 3,
            vx: (Math.random() - 0.5) * 0.5,
            r: 3 + Math.random() * 5,
            alpha: 0.7 + Math.random() * 0.3,
          });
          break;
        case "보이드": {
          const angle = Math.random() * Math.PI * 2;
          const dist = (0.1 + Math.random() * 0.55) * Math.max(W(), H());
          particles.push({
            cx: W() / 2, cy: H() / 2,
            angle, dist,
            orbitSpeed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
            inSpeed: 0.3 + Math.random() * 0.5,
            r: 2 + Math.random() * 4,
            alpha: 0.5 + Math.random() * 0.5,
            hue: 200 + Math.random() * 60,
          });
          break;
        }
        default: // 일반
          particles.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: 2 + Math.random() * 4,
            alpha: 0.2 + Math.random() * 0.3,
          });
      }
    }

    // 초기 파티클
    const initCount = crystalName === "갤럭시" ? 40 : 50;
    for (let i = 0; i < initCount; i++) spawnParticle();

    let frame = 0;

    function tick() {
      ctx.clearRect(0, 0, W(), H());
      frame++;

      // 주기적 스폰
      const spawnRate = crystalName === "갤럭시" ? 12 : 2;
      if (frame % spawnRate === 0 && particles.length < (crystalName === "갤럭시" ? 50 : 150)) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        let dead = false;

        switch (crystalName) {
          case "오션":
            p.x += p.vx + Math.sin(p.wobble) * 0.5;
            p.y += p.vy;
            p.wobble += 0.05;
            p.alpha -= 0.008;
            if (p.y < -20 || p.alpha <= 0) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(80,200,255,${p.alpha})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            break;

          case "파이어":
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.025;
            p.r *= 0.98;
            if (p.life <= 0) dead = true;
            else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue},100%,${50 + p.life * 30}%,${p.life})`;
              ctx.shadowColor = `hsla(${p.hue},100%,60%,0.6)`;
              ctx.shadowBlur = 12;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            break;

          case "갤럭시":
            p.phase += p.speed;
            p.alpha = p.maxAlpha * (0.4 + Math.abs(Math.sin(p.phase)) * 0.6);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue},90%,85%,${p.alpha})`;
            ctx.shadowColor = `hsla(${p.hue},100%,80%,0.6)`;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
            break;

          case "썬더":
            p.life -= p.decay;
            if (p.life <= 0) dead = true;
            else if (p.isBolt) {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.strokeStyle = `rgba(255,240,60,${p.life})`;
              ctx.lineWidth = 2;
              ctx.shadowColor = `rgba(255,240,60,0.8)`;
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.moveTo(0, -p.r * 2);
              ctx.lineTo(p.r * 0.6, 0);
              ctx.lineTo(-p.r * 0.2, 0);
              ctx.lineTo(p.r * 0.4, p.r * 2);
              ctx.stroke();
              ctx.restore();
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,240,60,${p.life * 0.7})`;
              ctx.shadowColor = `rgba(255,240,60,0.6)`;
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            break;

          case "블러드":
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.006;
            if (p.y > H() + 20 || p.alpha <= 0) dead = true;
            else {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.beginPath();
              ctx.ellipse(0, 0, p.r * 0.5, p.r, 0, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(200,20,20,${p.alpha})`;
              ctx.fill();
              ctx.restore();
            }
            break;

          case "보이드":
            p.angle += p.orbitSpeed;
            p.dist -= p.inSpeed;
            p.alpha -= 0.004;
            if (p.dist < 5 || p.alpha <= 0) dead = true;
            else {
              const px = p.cx + Math.cos(p.angle) * p.dist;
              const py = p.cy + Math.sin(p.angle) * p.dist;
              ctx.beginPath();
              ctx.arc(px, py, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue},60%,75%,${p.alpha})`;
              ctx.fill();
            }
            break;

          default: // 일반
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