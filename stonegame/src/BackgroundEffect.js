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
            y: H() + 15,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(1.0 + Math.random() * 1.8),
            r: 3 + Math.random() * 6,
            alpha: 0.25 + Math.random() * 0.35,
            wobbleSpeed: 0.02 + Math.random() * 0.03,
            wobblePhase: Math.random() * Math.PI * 2,
            hue: 195 + Math.random() * 20,
          });
          break;

        case "파이어":
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

        case "갤럭시": {
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
        }

        case "썬더": {
          const bx = W() * (0.15 + Math.random() * 0.7);
          const steps = 6 + Math.floor(Math.random() * 4);
          const mainPts = [];
          const subBranches = [];
          
          let cx = bx;
          for (let s = 0; s <= steps; s++) {
            const cy = (s / steps) * H();
            mainPts.push({ x: cx, y: cy });
            
            if (s > 1 && s < steps - 1 && Math.random() > 0.5) {
              const branchPts = [{ x: cx, y: cy }];
              let bx2 = cx;
              const subSteps = 3 + Math.floor(Math.random() * 3);
              for (let b = 1; b <= subSteps; b++) {
                bx2 += (Math.random() - 0.5) * 60 + (bx2 - cx > 0 ? 15 : -15);
                branchPts.push({
                  x: Math.max(10, Math.min(W() - 10, bx2)),
                  y: cy + (b / subSteps) * (H() * 0.2)
                });
              }
              subBranches.push(branchPts);
            }
            cx += (Math.random() - 0.5) * 80;
            cx = Math.max(10, Math.min(W() - 10, cx));
          }
          
          particles.push({ 
            type: "bolt", 
            pts: mainPts, 
            branches: subBranches, 
            life: 1, 
            decay: 0.08, 
            width: 5.0 + Math.random() * 3.5 
          });
          particles.push({ type: "flash", life: 1, decay: 0.18 });
          break;
        }

        case "블러드":
          particles.push({
            x: Math.random() * W(),
            y: -15,
            vy: 0.6 + Math.random() * 0.9, 
            vx: (Math.random() - 0.5) * 0.12,
            r: 4.0 + Math.random() * 4.5, 
            alpha: 0.2 + Math.random() * 0.25, 
          });
          break;

        case "보이드": {
          const angle = Math.random() * Math.PI * 2;
          const dist = (0.15 + Math.random() * 0.55) * Math.max(W(), H());
          particles.push({
            cx: W() / 2, cy: H() / 2,
            angle, dist,
            // orbitSpeed와 inSpeed를 줄여 훨씬 느릿하고 스산하게 회전하도록 세팅
            orbitSpeed: (0.0008 + Math.random() * 0.0015) * (Math.random() > 0.5 ? 1 : -1),
            inSpeed: 0.12 + Math.random() * 0.18,
            r: 2 + Math.random() * 4,
            alpha: 0.5 + Math.random() * 0.5,
            hue: 200 + Math.random() * 60,
          });
          break;
        }

        case "다이아": {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * Math.max(W(), H()) * 0.6;
          particles.push({
            x: W()/2 + Math.cos(angle) * dist,
            y: H()/2 + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: 2 + Math.random() * 4,
            alpha: 0,
            maxAlpha: 0.15 + Math.random() * 0.15,
            phase: Math.random() * Math.PI * 2,
            speed: 0.05 + Math.random() * 0.07,
            hue: 180 + Math.random() * 60,
          });
          break;
        }

        default:
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

    const initCount = crystalName === "오션" ? 0 : (crystalName === "갤럭시" ? 150 : crystalName === "썬더" ? 1 : 50);
    for (let i = 0; i < initCount; i++) {
      spawnParticle();
    }

    let frame = 0;

    function tick() {
      ctx.clearRect(0, 0, W(), H());
      frame++;

      const spawnRate = crystalName === "갤럭시" ? 12 : crystalName === "썬더" ? 85 : crystalName === "오션" ? 8 : 2;
      const maxParticles = crystalName === "갤럭시" ? 180 : crystalName === "다이아" ? 35 : crystalName === "오션" ? 35 : crystalName === "썬더" ? 3 : 150;

      if (frame % spawnRate === 0 && particles.length < maxParticles) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        let dead = false;

        switch (crystalName) {
          case "오션": {
            p.wobblePhase += p.wobbleSpeed;
            p.y += p.vy;
            p.x += p.vx + Math.sin(p.wobblePhase) * 0.3;

            if (p.y < -20) {
              dead = true;
            } else {
              ctx.save();
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.strokeStyle = `hsla(${p.hue}, 85%, 75%, ${p.alpha})`;
              ctx.lineWidth = 1.2;
              ctx.fillStyle = `hsla(${p.hue}, 90%, 95%, ${p.alpha * 0.12})`;
              ctx.shadowColor = `hsla(${p.hue}, 85%, 60%, 0.3)`;
              ctx.shadowBlur = 5;
              ctx.fill();
              ctx.stroke();
              ctx.restore();
            }
            break;
          }

          case "파이어":
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

          case "갤럭시":
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

          case "썬더":
            p.life -= p.decay;
            if (p.life <= 0) { dead = true; break; }
            if (p.type === "flash") {
              ctx.fillStyle = `rgba(255,250,200,${p.life * 0.12})`;
              ctx.fillRect(0, 0, W(), H());
            } else {
              ctx.save();
              const drawLine = (pts, lw, color) => {
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s].x, pts[s].y);
                ctx.strokeStyle = color;
                ctx.lineWidth = lw;
                ctx.stroke();
              };

              ctx.shadowColor = "rgba(180,210,255,0.8)";
              
              ctx.shadowBlur = 45;
              drawLine(p.pts, p.width * 6, `rgba(140,190,255,${p.life * 0.25})`);
              ctx.shadowBlur = 25;
              drawLine(p.pts, p.width * 2.5, `rgba(255,245,160,${p.life * 0.75})`);
              ctx.shadowBlur = 8;
              drawLine(p.pts, p.width * 0.8, `rgba(255,255,255,${p.life})`);

              if (p.branches) {
                p.branches.forEach(bPts => {
                  ctx.shadowBlur = 15;
                  drawLine(bPts, p.width * 1.5, `rgba(200,220,255,${p.life * 0.5})`);
                  drawLine(bPts, p.width * 0.5, `rgba(255,255,255,${p.life * 0.8})`);
                });
              }

              ctx.restore();
            }
            break;

          case "블러드":
            p.x += p.vx;
            p.vy += 0.012; 
            p.y += p.vy;
            
            let currentAlpha = p.alpha;
            if (p.y > H() * 0.85) {
              currentAlpha = p.alpha * ((H() + 20 - p.y) / (H() * 0.15));
            }
            if (p.y > H() + 20) dead = true;
            else {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.beginPath();
              ctx.ellipse(0, 0, p.r * 0.45, p.r * 1.2, 0, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(135, 6, 6, ${currentAlpha})`; 
              ctx.fill();
              ctx.restore();
            }
            break;

          case "보이드":
            p.angle += p.orbitSpeed;
            p.dist -= p.inSpeed;
            // 서서히 좁혀질 때 흐려지는 속도도 약간 늦춰서 오래 유지되게 수정
            p.alpha -= 0.0025; 
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

          case "다이아":
            p.phase += p.speed;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha = p.maxAlpha * (0.3 + Math.abs(Math.sin(p.phase)) * 0.7);
            if (p.x < 0 || p.x > W() || p.y < 0 || p.y > H()) {
              p.x = Math.random() * W();
              p.y = Math.random() * H();
            }
            ctx.save();
            ctx.beginPath();
            for (let s = 0; s < 4; s++) {
              const a = (s / 4) * Math.PI * 2 + p.phase * 0.3;
              const outerX = p.x + Math.cos(a) * p.r * 2;
              const outerY = p.y + Math.sin(a) * p.r * 2;
              const innerA = a + Math.PI / 4;
              const innerX = p.x + Math.cos(innerA) * p.r * 0.6;
              const innerY = p.y + Math.sin(innerA) * p.r * 0.6;
              if (s === 0) ctx.moveTo(outerX, outerY);
              else ctx.lineTo(outerX, outerY);
              ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fillStyle = `hsla(${p.hue},90%,90%,${p.alpha})`;
            ctx.shadowColor = `hsla(${p.hue},100%,95%,0.8)`;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
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