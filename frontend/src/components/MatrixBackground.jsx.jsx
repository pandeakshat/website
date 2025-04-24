// src/components/MatrixBackground.jsx
import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = "アカサタナハマヤラワンニチトシヘセテメレケネヘモヨロソホノミリコオユルクフウエツスヌムユル";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = (katakana + latin + nums).split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }, () => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(24, 29, 34, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(184, 134, 11, 0.8)"; // or "#b8860bcc"
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
<canvas
  ref={canvasRef}
  className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
/>

  );
}