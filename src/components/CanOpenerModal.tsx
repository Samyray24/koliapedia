import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, Sparkles, RotateCcw, Volume2, Flame } from 'lucide-react';

interface CanOpenerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FizzParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CanOpenerModal: React.FC<CanOpenerModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [openCount, setOpenCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_cans_opened')) || 0;
    } catch {
      return 0;
    }
  });
  const [fizzActive, setFizzActive] = useState(false);
  const [glugState, setGlugState] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FizzParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Eruption particle loop
  const spawnEruption = useCallback(() => {
    const particles: FizzParticle[] = [];
    const colors = ['#ffffff', '#fef08a', '#fb7185', '#f43f5e', '#fed7aa'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: 150, // center of can top
        y: 85,  // top opening
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 8 + 4), // shoot upwards
        size: Math.random() * 4 + 2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = particles;
    setFizzActive(true);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!fizzActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.alpha -= 0.015; // fade

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Shimmer ring around big bubbles
        if (p.size > 3) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();

        if (p.alpha <= 0 || p.y > canvas.height) {
          list.splice(i, 1);
        }
      }

      if (list.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        setFizzActive(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [fizzActive]);

  const handleOpenCan = () => {
    if (isOpened) return;

    // 1. Play realistic Web Audio can opening sound
    sounds.playCanOpen();

    // 2. State & Eruption
    setIsOpened(true);
    spawnEruption();

    // 3. Confetti blast
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#ffffff', '#fbbf24', '#f43f5e'],
    });

    // 4. Update count
    const nextCount = openCount + 1;
    setOpenCount(nextCount);
    try {
      localStorage.setItem('koliapedia_cans_opened', String(nextCount));
    } catch {
      // ignore
    }
  };

  const handleDrinkSip = () => {
    sounds.playFanfare();
    setGlugState(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
    });
    setTimeout(() => setGlugState(false), 2000);
  };

  const handleReset = () => {
    sounds.playPop();
    setIsOpened(false);
    setGlugState(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-700/80 rounded-3xl p-6 shadow-2xl overflow-hidden text-center">
        {/* Ambient background glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Ритуал Николая
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Открытие баночки <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Кока-Коли</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isOpened
              ? 'Праздник к нам пришёл! Газировка с шипением рвётся наружу!'
              : 'Потяните за металлическое кольцо или просто нажмите на банку, чтобы услышать легендарный пшик!'}
          </p>
        </div>

        {/* Interactive Can Stage */}
        <div className="relative my-6 flex justify-center items-center h-[340px]">
          {/* Particle canvas overlay for fizz spray */}
          <canvas
            ref={canvasRef}
            width={300}
            height={340}
            className="absolute inset-0 mx-auto pointer-events-none z-30"
          />

          {/* Realistic 3D-styled Soda Can */}
          <div
            onClick={handleOpenCan}
            className={`relative w-48 h-72 rounded-t-3xl rounded-b-2xl cursor-pointer transition-all duration-300 group ${
              isOpened ? 'scale-102' : 'hover:scale-105 active:scale-95'
            }`}
            style={{ perspective: '800px' }}
          >
            {/* Top Metallic Rim (Bevel) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-44 h-7 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full border border-slate-300 shadow-md z-20 flex items-center justify-center">
              {/* Inner Rim */}
              <div className="w-40 h-5 bg-gradient-to-b from-slate-300 to-slate-400 rounded-full relative flex items-center justify-center overflow-hidden">
                {/* Oval Drink Hole (Punched when opened) */}
                <div
                  className={`absolute left-8 w-7 h-3 rounded-full transition-all duration-200 ${
                    isOpened
                      ? 'bg-slate-950 border border-slate-700 shadow-inner'
                      : 'bg-slate-300 border border-slate-400'
                  }`}
                />

                {/* Metal Ring Pull Tab (Кольцо-ключ) */}
                <div
                  className={`relative z-20 transition-all duration-300 flex items-center justify-center ${
                    isOpened
                      ? 'rotate-[-45deg] translate-y-[-6px] translate-x-[2px] opacity-90'
                      : 'group-hover:-translate-y-0.5'
                  }`}
                >
                  <div className="w-8 h-4 rounded-full border-2 border-slate-500 bg-gradient-to-b from-slate-200 to-slate-300 shadow-sm flex items-center justify-center">
                    <div className="w-3 h-2 rounded-full bg-slate-400/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Frost / Vapor Cloud when opened */}
            {isOpened && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-12 bg-white/20 rounded-full blur-xl pointer-events-none animate-float z-30" />
            )}

            {/* Can Cylindrical Body */}
            <div className="w-full h-full rounded-t-3xl rounded-b-2xl bg-gradient-to-r from-red-700 via-rose-600 to-red-800 border-2 border-red-500/80 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              {/* Cylindrical Sheen / Highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-16 pointer-events-none blur-sm animate-pulse" />

              {/* Condensation droplets (Капельки влаги) */}
              <div className="absolute top-8 left-6 text-xs select-none opacity-60">💧</div>
              <div className="absolute top-20 right-5 text-xs select-none opacity-50">💧</div>
              <div className="absolute bottom-12 left-8 text-xs select-none opacity-70">💧</div>
              <div className="absolute bottom-6 right-8 text-xs select-none opacity-60">💧</div>

              {/* Top Brand Stripe */}
              <div className="w-full border-t border-b border-white/20 py-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                  ORIGINAL KOLYA TASTE
                </span>
              </div>

              {/* Center Logo */}
              <div className="my-auto transform -rotate-12 select-none">
                <div className="text-3xl sm:text-4xl font-black text-white italic tracking-wider drop-shadow-lg font-display">
                  Кока-Коля
                </div>
                <div className="text-[11px] font-bold text-amber-200 tracking-widest uppercase mt-0.5">
                  100% Натуральный Николай
                </div>
              </div>

              {/* Bottom Nutrition / Volume */}
              <div className="flex items-center justify-between text-[9px] font-bold text-white/70 border-t border-white/20 pt-1">
                <span>0.5 ЛИТРА</span>
                <span>0% САХАРА</span>
                <span>100% ХАРИЗМА</span>
              </div>
            </div>

            {/* Bottom Metallic Base */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-42 h-4 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-full border border-slate-400 shadow-lg" />
          </div>
        </div>

        {/* Status and Action Buttons */}
        <div className="space-y-3 pt-2">
          {!isOpened ? (
            <button
              onClick={handleOpenCan}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-sm tracking-wide shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-5 h-5 animate-bounce" />
              <span>НАЖМИ, ЧТОБЫ ОТКРЫТЬ С ПШИКОМ!</span>
            </button>
          ) : (
            <div className="space-y-3 animate-scaleUp">
              <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>
                  {glugState
                    ? 'Глоток сделан! Уровень счастья: 1000%! 🥤✨'
                    : 'Кока-Коля открыта! Наслаждайтесь ледяной свежестью!'}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleDrinkSip}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                >
                  СДЕЛАТЬ ГЛОТОК 🥤
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ещё баночку
                </button>
              </div>
            </div>
          )}

          {/* Stats footer */}
          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2 pt-1">
            <span>🥤 Всего открыто баночек: <strong className="text-amber-400">{openCount}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
