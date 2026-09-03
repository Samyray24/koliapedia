import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, Heart, Sparkles, Zap, Share2, Check } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'coca' | 'pina' | 'shoko' | 'bro' | 'collagen' | 'deadline' | 'alarm' | 'collapsus';
  emoji: string;
  points: number;
  isBad: boolean;
  size: number;
}

export const KolyaRunner: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_highscore')) || 0;
    } catch {
      return 0;
    }
  });
  const [copied, setCopied] = useState(false);
  const [isSuperMode, setIsSuperMode] = useState(false);

  // Player position (percentage 0 to 100)
  const [playerX, setPlayerX] = useState(50);

  // Use refs solely inside the game loop / event handlers
  const playerXRef = useRef(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FallingItem[]>([]);
  const nextItemId = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const comboRef = useRef(0);

  // Floating text popups
  const [popups, setPopups] = useState<{ id: number; text: string; x: number; y: number; color: string }[]>([]);

  // State for rendering active items to avoid reading refs during render
  const [renderItems, setRenderItems] = useState<FallingItem[]>([]);

  const addPopup = (text: string, x: number, y: number, color: string) => {
    const id = Date.now() + Math.random();
    setPopups((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  };

  const updatePlayerX = (newX: number) => {
    playerXRef.current = newX;
    setPlayerX(newX);
  };

  const startGame = () => {
    sounds.playCollider();
    scoreRef.current = 0;
    livesRef.current = 3;
    comboRef.current = 0;
    setScore(0);
    setLives(3);
    setCombo(0);
    setIsSuperMode(false);
    itemsRef.current = [];
    setRenderItems([]);
    setPopups([]);
    updatePlayerX(50);
    setGameState('playing');
    lastSpawnTime.current = performance.now();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф') {
        const nextX = Math.max(8, playerXRef.current - 8);
        updatePlayerX(nextX);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В') {
        const nextX = Math.min(92, playerXRef.current + 8);
        updatePlayerX(nextX);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Touch / Mouse movement on container
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, rawX));
    updatePlayerX(clamped);
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let isRunning = true;

    const gameLoop = (time: number) => {
      if (!isRunning) return;

      // Spawn item every ~700ms (faster as score increases)
      const spawnDelay = Math.max(400, 850 - Math.min(scoreRef.current * 1.5, 450));
      if (time - lastSpawnTime.current > spawnDelay) {
        lastSpawnTime.current = time;

        const rand = Math.random();
        let newItem: FallingItem;

        if (rand < 0.35) {
          // 🥤 Кока-Коля (+10)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 0.8 + Math.min(scoreRef.current * 0.002, 1.2),
            type: 'coca',
            emoji: '🥤',
            points: 10,
            isBad: false,
            size: 38,
          };
        } else if (rand < 0.52) {
          // 🍹 Пино-Коляда (+25)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 1.0 + Math.min(scoreRef.current * 0.002, 1.3),
            type: 'pina',
            emoji: '🍹',
            points: 25,
            isBad: false,
            size: 40,
          };
        } else if (rand < 0.67) {
          // 🍫 Шо-Коляд (+15)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 0.9 + Math.min(scoreRef.current * 0.002, 1.1),
            type: 'shoko',
            emoji: '🍫',
            points: 15,
            isBad: false,
            size: 38,
          };
        } else if (rand < 0.77) {
          // 🥦 Бро-Коли (+50)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 1.3,
            type: 'bro',
            emoji: '🥦',
            points: 50,
            isBad: false,
            size: 42,
          };
        } else if (rand < 0.83) {
          // ✨ Коля-ген (+жизнь)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 1.4,
            type: 'collagen',
            emoji: '✨',
            points: 20,
            isBad: false,
            size: 36,
          };
        } else if (rand < 0.92) {
          // ⏰ Будильник (-1 жизнь)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 0.9 + Math.min(scoreRef.current * 0.0025, 1.4),
            type: 'alarm',
            emoji: '⏰',
            points: 0,
            isBad: true,
            size: 38,
          };
        } else {
          // 🌀 Коляпсус (-1 жизнь)
          newItem = {
            id: nextItemId.current++,
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 1.1 + Math.min(scoreRef.current * 0.003, 1.5),
            type: 'collapsus',
            emoji: '🌀',
            points: 0,
            isBad: true,
            size: 40,
          };
        }

        itemsRef.current.push(newItem);
      }

      // Update item positions and check collisions
      const currentItems = [...itemsRef.current];
      const remainingItems: FallingItem[] = [];
      const currentPlayerX = playerXRef.current;

      for (const item of currentItems) {
        item.y += item.speed;

        // Check catch zone at bottom (y roughly 80% to 92%)
        const inCatchY = item.y >= 80 && item.y <= 92;
        const inCatchX = Math.abs(item.x - currentPlayerX) < 9;

        if (inCatchY && inCatchX) {
          if (item.isBad) {
            sounds.playBoing();
            const nextLives = livesRef.current - 1;
            livesRef.current = nextLives;
            setLives(nextLives);
            comboRef.current = 0;
            setCombo(0);
            setIsSuperMode(false);
            addPopup('-1 ❤️ Ой!', item.x, item.y, 'text-rose-400 font-bold');

            if (nextLives <= 0) {
              isRunning = false;
              setGameState('gameover');
              sounds.playMelancholy();
              const finalScore = scoreRef.current;
              if (finalScore > highScore) {
                setHighScore(finalScore);
                try {
                  localStorage.setItem('koliapedia_highscore', String(finalScore));
                } catch {
                  // ignore
                }
                confetti({ particleCount: 100, spread: 80 });
              }
              return;
            }
          } else {
            if (item.type === 'coca') {
              sounds.playFizz();
            } else if (item.type === 'collagen') {
              sounds.playFanfare();
              livesRef.current = Math.min(livesRef.current + 1, 5);
              setLives(livesRef.current);
            } else {
              sounds.playPop();
            }

            const currentCombo = comboRef.current + 1;
            comboRef.current = currentCombo;
            setCombo(currentCombo);

            const multiplier = currentCombo >= 10 ? 3 : currentCombo >= 5 ? 2 : 1;
            const pointsToAdd = item.points * multiplier;
            const newScore = scoreRef.current + pointsToAdd;
            scoreRef.current = newScore;
            setScore(newScore);

            if (currentCombo >= 10) {
              setIsSuperMode(true);
            }

            addPopup(
              `+${pointsToAdd}${multiplier > 1 ? ` (x${multiplier}!)` : ''}`,
              item.x,
              item.y,
              item.type === 'coca'
                ? 'text-rose-400 font-black'
                : item.type === 'bro'
                ? 'text-emerald-400 font-black'
                : 'text-amber-300 font-bold'
            );
          }
        } else if (item.y < 102) {
          remainingItems.push(item);
        } else {
          if (!item.isBad && comboRef.current > 0) {
            comboRef.current = 0;
            setCombo(0);
            setIsSuperMode(false);
          }
        }
      }

      itemsRef.current = remainingItems;
      setRenderItems([...remainingItems]);
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, highScore]);

  const handleShareScore = () => {
    sounds.playFanfare();
    confetti({ particleCount: 50, spread: 60 });
    const text = `🎮 Мой рекорд в «Коля-Раннер: Охота за Кока-Колей» — ${score} очков!\nПопробуй побить мой результат в Коляпедии! 🥤✨`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRank = (sc: number) => {
    if (sc >= 600) return { title: 'Повелитель Коляйдера ⚛️', desc: 'Ты двигаешься быстрее скорости света!' };
    if (sc >= 300) return { title: 'Магистр Коляборации 🤝', desc: 'Коля гордится твоей ловкостью!' };
    if (sc >= 150) return { title: 'Истинный Коляфил 😍', desc: 'Ни одна баночка Кока-Коли не пролетит мимо!' };
    return { title: 'Начинающий Колян 🥤', desc: 'Хорошее начало, тренируй реакцию!' };
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* Game Dashboard */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Очки</div>
            <div className="text-2xl md:text-3xl font-black text-amber-400">{score}</div>
          </div>

          {combo > 1 && (
            <div className="px-2.5 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black animate-pulse flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> КОМБО x{combo >= 10 ? 3 : combo >= 5 ? 2 : 1} ({combo})
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 transition-all duration-300 ${
                i < lives ? 'text-rose-500 fill-rose-500 scale-100' : 'text-slate-700 scale-75'
              }`}
            />
          ))}
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-end gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> Рекорд
          </div>
          <div className="text-base md:text-lg font-extrabold text-slate-200">{highScore}</div>
        </div>
      </div>

      {/* Game Playfield */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className={`relative w-full h-[400px] md:h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/90 border-2 rounded-3xl overflow-hidden shadow-2xl touch-none cursor-ew-resize transition-all ${
          isSuperMode ? 'border-amber-400 ring-4 ring-amber-400/20' : 'border-slate-700'
        }`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 text-xl">✨</div>
          <div className="absolute top-24 right-20 text-sm">⭐</div>
          <div className="absolute bottom-20 left-20 text-xs">✨</div>
        </div>

        {isSuperMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/40 animate-pulse z-20">
            ⚡ РЕЖИМ КОЛЯЙДЕРА: ОЧКИ x3 ⚡
          </div>
        )}

        {/* State: MENU */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-5">
            <div className="text-7xl animate-float">🥤</div>
            <div>
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Охота за Кока-Колей
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-sm">
                Ловите Кока-Колю, Шо-Коляд и Пино-Коляду! Уворачивайтесь от будильников и дедлайнов!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span>Ловите: 🥤 +10</span>
              <span>🍹 +25</span>
              <span>🍫 +15</span>
              <span>🥦 +50</span>
              <span className="text-rose-400 font-bold">Опасайтесь: ⏰ 🌀</span>
            </div>

            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 hover:scale-105 active:scale-95 text-white font-black text-lg rounded-2xl shadow-xl shadow-rose-500/25 transition-all"
            >
              <Play className="w-5 h-5 fill-white" /> ПОГНАЛИ!
            </button>
          </div>
        )}

        {/* State: GAME OVER */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-scaleUp">
            <div className="text-6xl animate-bounce">🌀</div>
            <div>
              <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                Коляпсус настиг героя!
              </span>
              <h3 className="text-3xl font-black text-white mt-1">Игра окончена</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl w-full max-w-xs space-y-2">
              <div className="text-xs text-slate-400 uppercase font-semibold">Итоговый счёт</div>
              <div className="text-4xl font-black text-amber-400">{score}</div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-sm font-extrabold text-cyan-300">{getRank(score).title}</div>
                <p className="text-xs text-slate-400">{getRank(score).desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Играть снова
              </button>

              <button
                onClick={handleShareScore}
                className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 text-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Поделиться'}
              </button>
            </div>
          </div>
        )}

        {/* Falling items from state */}
        {gameState === 'playing' &&
          renderItems.map((item) => (
            <div
              key={item.id}
              className="absolute pointer-events-none select-none transition-transform"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${item.size}px`,
                filter: item.isBad ? 'drop-shadow(0 0 8px rgba(244,63,94,0.6))' : 'drop-shadow(0 0 8px rgba(251,191,36,0.6))',
              }}
            >
              {item.emoji}
            </div>
          ))}

        {/* Floating popups */}
        {popups.map((p) => (
          <div
            key={p.id}
            className={`absolute pointer-events-none select-none text-sm md:text-base animate-float ${p.color}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y - 4}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {p.text}
          </div>
        ))}

        {/* Player Basket at bottom */}
        {gameState === 'playing' && (
          <div
            className="absolute bottom-4 -translate-x-1/2 transition-all duration-75 pointer-events-none select-none flex flex-col items-center"
            style={{ left: `${playerX}%` }}
          >
            <div className="text-3xl md:text-4xl animate-pulse">😎</div>
            <div className="w-16 h-7 md:w-20 md:h-8 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500 p-0.5 shadow-lg shadow-rose-500/40">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xs font-black text-amber-300">
                КОЛЯ
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls */}
      <div className="flex items-center justify-center gap-4 md:hidden pt-1">
        <button
          onClick={() => {
            sounds.playPop();
            const nextX = Math.max(8, playerXRef.current - 12);
            updatePlayerX(nextX);
          }}
          className="flex-1 py-4 bg-slate-900 border border-slate-800 active:bg-slate-800 rounded-2xl text-xl font-black text-slate-200 active:scale-95 shadow-lg"
        >
          ⬅️ Влево
        </button>
        <button
          onClick={() => {
            sounds.playPop();
            const nextX = Math.min(92, playerXRef.current + 12);
            updatePlayerX(nextX);
          }}
          className="flex-1 py-4 bg-slate-900 border border-slate-800 active:bg-slate-800 rounded-2xl text-xl font-black text-slate-200 active:scale-95 shadow-lg"
        >
          Вправо ➡️
        </button>
      </div>

      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Подсказка: на компьютере можно управлять стрелками или просто двигать курсором внутри поля!</span>
      </div>
    </div>
  );
};
