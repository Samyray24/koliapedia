import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';

interface Upgrade {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  cost: number;
  cps: number; // collagen per second
  clickPower: number;
  count: number;
}

const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'cola_sip',
    name: 'Глоток Кока-Коли',
    desc: '+1 к силе каждого тапа',
    emoji: '🥤',
    cost: 15,
    cps: 0,
    clickPower: 1,
    count: 0,
  },
  {
    id: 'bro_assistant',
    name: 'Бро-Коли ассистент',
    desc: 'Верный овощ генерирует +2 Коля-гена/сек',
    emoji: '🥦',
    cost: 50,
    cps: 2,
    clickPower: 0,
    count: 0,
  },
  {
    id: 'pina_bar',
    name: 'Бармен Пино-Коляды',
    desc: 'Тропический релакс дает +12 Коля-гена/сек',
    emoji: '🍹',
    cost: 200,
    cps: 12,
    clickPower: 0,
    count: 0,
  },
  {
    id: 'shoko_factory',
    name: 'Шо-Колядная фабрика',
    desc: 'Сладкие эндорфины: +45 Коля-гена/сек',
    emoji: '🍫',
    cost: 700,
    cps: 45,
    clickPower: 0,
    count: 0,
  },
  {
    id: 'collider_reactor',
    name: 'Адронный Коляйдер',
    desc: 'Квантовый разгон: +180 Коля-гена/сек',
    emoji: '⚛️',
    cost: 2500,
    cps: 180,
    clickPower: 0,
    count: 0,
  },
];

export const KolyaClicker: React.FC = () => {
  const [collagen, setCollagen] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_clicker_count')) || 0;
    } catch {
      return 0;
    }
  });

  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    try {
      const saved = localStorage.getItem('koliapedia_clicker_upgrades');
      return saved ? JSON.parse(saved) : INITIAL_UPGRADES;
    } catch {
      return INITIAL_UPGRADES;
    }
  });

  const [isBumping, setIsBumping] = useState(false);
  const [tapParticles, setTapParticles] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  // Calculate total CPS and Click Power
  const clickPower = 1 + upgrades.reduce((acc, u) => acc + u.clickPower * u.count, 0);
  const totalCps = upgrades.reduce((acc, u) => acc + u.cps * u.count, 0);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('koliapedia_clicker_count', String(Math.floor(collagen)));
      localStorage.setItem('koliapedia_clicker_upgrades', JSON.stringify(upgrades));
    } catch {
      // ignore
    }
  }, [collagen, upgrades]);

  // Idle tick generator (every 100ms)
  useEffect(() => {
    if (totalCps <= 0) return;
    const interval = setInterval(() => {
      setCollagen((prev) => prev + totalCps / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [totalCps]);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playFizz();
    setIsBumping(true);
    setTimeout(() => setIsBumping(false), 120);

    setCollagen((prev) => prev + clickPower);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now() + Math.random();
    setTapParticles((prev) => [...prev, { id, x, y, text: `+${clickPower}` }]);
    setTimeout(() => {
      setTapParticles((prev) => prev.filter((p) => p.id !== id));
    }, 600);
  };

  const buyUpgrade = (upgradeId: string) => {
    const item = upgrades.find((u) => u.id === upgradeId);
    if (!item || collagen < item.cost) return;

    sounds.playFanfare();
    setCollagen((prev) => prev - item.cost);

    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId) {
          const nextCount = u.count + 1;
          const nextCost = Math.round(u.cost * 1.35);
          return { ...u, count: nextCount, cost: nextCost };
        }
        return u;
      })
    );

    if (upgradeId === 'collider_reactor') {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const resetProgress = () => {
    sounds.playBoing();
    setCollagen(0);
    setUpgrades(INITIAL_UPGRADES);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto select-none">
      {/* Top Banner Stats */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center shadow-xl relative overflow-hidden">
        <div className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" /> Запас Коля-гена
        </div>

        <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-300">
          {Math.floor(collagen)}
        </div>

        <div className="text-xs font-semibold text-slate-400 mt-2 flex items-center justify-center gap-4">
          <span className="text-cyan-400">⚡ Клик: +{clickPower}</span>
          <span>•</span>
          <span className="text-emerald-400">⚙️ Пассив: +{totalCps}/сек</span>
        </div>
      </div>

      {/* Big Clickable Kolya */}
      <div className="flex justify-center relative my-4">
        <button
          onClick={handleTap}
          className={`relative p-8 rounded-full bg-gradient-to-tr from-slate-900 via-purple-950 to-slate-900 border-4 border-amber-400/80 shadow-2xl shadow-amber-500/20 active:scale-90 transition-all cursor-pointer ${
            isBumping ? 'scale-105 rotate-3' : 'hover:scale-102 animate-float'
          }`}
        >
          <div className="text-7xl md:text-8xl select-none">🥤</div>

          {/* Floating click particles */}
          {tapParticles.map((tp) => (
            <div
              key={tp.id}
              className="absolute pointer-events-none text-base md:text-lg font-black text-amber-300 animate-float"
              style={{ left: `${tp.x}px`, top: `${tp.y}px` }}
            >
              {tp.text}
            </div>
          ))}
        </button>
      </div>

      {/* Upgrades Store */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-rose-400" /> Магазин Коля-улучшений
          </h4>
          <button
            onClick={resetProgress}
            className="text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Сбросить
          </button>
        </div>

        <div className="space-y-2">
          {upgrades.map((u) => {
            const canAfford = collagen >= u.cost;
            return (
              <div
                key={u.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                    {u.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{u.name}</span>
                      {u.count > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-amber-300">
                          x{u.count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{u.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => buyUpgrade(u.id)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex flex-col items-center flex-shrink-0 ${
                    canAfford
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white shadow-md shadow-amber-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <span>Купить</span>
                  <span className="text-[10px] opacity-90">{u.cost} ✨</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
