import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, Sparkles, Share2, Check } from 'lucide-react';

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

export const KolyaFlappy: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_flappy_high')) || 0;
    } catch {
      return 0;
    }
  });
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdY = useRef(150);
  const birdVelocity = useRef(0);
  const pipes = useRef<Pipe[]>([]);
  const scoreRef = useRef(0);
  const animId = useRef<number | null>(null);
  const lastPipeSpawn = useRef(0);

  const GRAVITY = 0.38;
  const JUMP_FORCE = -6.8;
  const PIPE_SPEED = 2.4;
  const PIPE_GAP = 135;

  const endGame = useCallback(() => {
    sounds.playBoing();
    sounds.playMelancholy();
    setGameState('gameover');
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('koliapedia_flappy_high', String(finalScore));
      } catch {
        // ignore
      }
      confetti({ particleCount: 80, spread: 70 });
    }
  }, [highScore]);

  const startGame = useCallback(() => {
    sounds.playCollider();
    birdY.current = 150;
    birdVelocity.current = 0;
    pipes.current = [];
    scoreRef.current = 0;
    setScore(0);
    lastPipeSpawn.current = performance.now();
    setGameState('playing');
  }, []);

  const jump = () => {
    if (gameState === 'playing') {
      sounds.playPop();
      birdVelocity.current = JUMP_FORCE;
    } else if (gameState === 'menu' || gameState === 'gameover') {
      startGame();
    }
  };

  // Canvas loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const loop = (time: number) => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0b0f19');
      skyGrad.addColorStop(0.7, '#1e1b4b');
      skyGrad.addColorStop(1, '#311042');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Physics
      birdVelocity.current += GRAVITY;
      birdY.current += birdVelocity.current;

      // Spawn pipes
      if (time - lastPipeSpawn.current > 1600) {
        lastPipeSpawn.current = time;
        const minH = 40;
        const maxH = height - PIPE_GAP - minH;
        const topHeight = Math.floor(Math.random() * (maxH - minH)) + minH;
        pipes.current.push({
          x: width + 20,
          topHeight,
          bottomY: topHeight + PIPE_GAP,
          passed: false,
        });
      }

      // Check boundary collision
      if (birdY.current > height - 25 || birdY.current < 0) {
        endGame();
        return;
      }

      // Draw and update pipes
      const pipeWidth = 48;
      const currentPipes = [...pipes.current];
      const remainingPipes: Pipe[] = [];

      for (const pipe of currentPipes) {
        pipe.x -= PIPE_SPEED;

        const pipeGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
        pipeGrad.addColorStop(0, '#e11d48');
        pipeGrad.addColorStop(1, '#be123c');

        // Draw Top Pipe
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(pipe.x - 3, pipe.topHeight - 12, pipeWidth + 6, 12);

        // Draw Bottom Pipe
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, height - pipe.bottomY);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(pipe.x - 3, pipe.bottomY, pipeWidth + 6, 12);

        ctx.font = '16px sans-serif';
        ctx.fillText('⏰', pipe.x + 14, pipe.topHeight - 16);

        // Bird hitbox
        const birdX = 70;
        const birdRadius = 14;

        const collideTop =
          birdX + birdRadius > pipe.x &&
          birdX - birdRadius < pipe.x + pipeWidth &&
          birdY.current - birdRadius < pipe.topHeight;

        const collideBottom =
          birdX + birdRadius > pipe.x &&
          birdX - birdRadius < pipe.x + pipeWidth &&
          birdY.current + birdRadius > pipe.bottomY;

        if (collideTop || collideBottom) {
          endGame();
          return;
        }

        // Pass check
        if (!pipe.passed && pipe.x + pipeWidth < birdX) {
          pipe.passed = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
          sounds.playFizz();
        }

        if (pipe.x + pipeWidth > -20) {
          remainingPipes.push(pipe);
        }
      }
      pipes.current = remainingPipes;

      // Draw Bird
      const bx = 70;
      const by = birdY.current;

      ctx.save();
      ctx.translate(bx, by);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, birdVelocity.current * 0.06));
      ctx.rotate(angle);

      ctx.font = '30px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🥤', 0, 0);

      ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.beginPath();
      ctx.arc(-14, 4, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId.current = requestAnimationFrame(loop);
    };

    animId.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, [gameState, endGame]);

  const handleShare = () => {
    sounds.playFanfare();
    confetti({ particleCount: 50, spread: 60 });
    const text = `🐦 Я набрал ${score} очков в «Коля-Флаппи: Полёт над дедлайнами»!\nПопробуй обогнать меня в Коляпедии! 🥤✨`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fadeIn max-w-md mx-auto select-none">
      {/* Top dashboard */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Очки</div>
          <div className="text-3xl font-black text-amber-400">{score}</div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-end gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> Рекорд
          </div>
          <div className="text-lg font-black text-slate-200">{highScore}</div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div
        onClick={jump}
        className="relative w-full h-[380px] rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
      >
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="w-full h-full block"
        />

        {/* Menu Overlay */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="text-6xl animate-float">🥤</div>
            <div>
              <h3 className="text-2xl font-black text-white">Коля-Флаппи</h3>
              <p className="text-xs text-slate-400 mt-1">
                Кликайте мышью, тапайте или жмите <strong>Пробел</strong>, чтобы держать Колю в воздухе и пролетать между будильниками!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-500/30"
            >
              <Play className="w-4 h-4 fill-white" /> ЛЕТЕТЬ!
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 animate-scaleUp">
            <div className="text-5xl animate-bounce">⏰</div>
            <h4 className="text-2xl font-black text-rose-400">Коля столкнулся с дедлайном!</h4>
            <div className="text-xs text-slate-400">
              Итоговый счёт: <strong className="text-amber-400 text-xl">{score}</strong>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Снова
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-cyan-300 font-bold rounded-xl text-xs border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Скопировано!' : 'Поделиться'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Кликайте по экрану или нажимайте Пробел на клавиатуре!</span>
      </div>
    </div>
  );
};
