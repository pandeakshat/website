// src/components/GalaxyBackground.jsx
import { useEffect, useRef, useState } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    let particles = Array.from({ length: 250 }, () => createParticle());

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(184, 134, 11, 0.7)';
        ctx.fill();
      }
    }

    function update() {
      for (let p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - dist) / 120;
          p.dx += Math.cos(angle) * force * 0.6;
          p.dy += Math.sin(angle) * force * 0.6;
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
    }

    function animate() {
      draw();
      update();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [enabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none ${enabled ? '' : 'hidden'}`}
      />
      <div className="fixed bottom-4 right-4 z-50 text-sm text-foreground bg-background/80 px-3 py-2 rounded shadow border border-border">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
          Background FX
        </label>
      </div>
    </>
  );
}
