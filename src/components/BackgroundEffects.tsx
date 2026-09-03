import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Sparkling bubbles representing Coca-Cola and festive Kolya sparkles
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      hue: number;
    }

    const bubbles: Bubble[] = [];
    const BUBBLE_COUNT = Math.min(35, Math.floor(window.innerWidth / 40));

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.6 ? 340 : Math.random() > 0.3 ? 40 : 260, // rose, amber, purple
      });
    }

    // Mouse coordinates for ambient cursor glow
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse glow interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Draw soft ambient cursor light (desktop only)
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      glowGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update rising bubbles
      for (const b of bubbles) {
        b.y -= b.speedY;
        b.x += b.speedX;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }
        if (b.x < -10) b.x = width + 10;
        if (b.x > width + 10) b.x = -10;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue}, 80%, 65%, ${b.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${b.hue}, 80%, 65%, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
