import React, { useState } from 'react';
import { KolyaRunner } from './games/KolyaRunner';
import { KolyaFlappy } from './games/KolyaFlappy';
import { KolyaMemory } from './games/KolyaMemory';
import { KolyaMinesweeper } from './games/KolyaMinesweeper';
import { KolyaClicker } from './games/KolyaClicker';
import { KolyaMemeStudio } from './games/KolyaMemeStudio';
import { sounds } from '../utils/audio';
import { Gamepad2, Maximize2, Minimize2, Monitor } from 'lucide-react';

type GameMode = 'runner' | 'flappy' | 'memory' | 'sweeper' | 'clicker' | 'meme';

export const KolyaGame: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameMode>('runner');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    sounds.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const gameTabs = [
    {
      id: 'runner' as GameMode,
      title: 'Коля-Раннер',
      subtitle: 'Лови Кока-Колю',
      icon: '🥤',
      badge: 'Аркада',
      color: 'from-rose-500 to-amber-500',
    },
    {
      id: 'flappy' as GameMode,
      title: 'Коля-Флаппи',
      subtitle: 'Полёт сквозь дедлайны',
      icon: '🐦',
      badge: 'Хит',
      color: 'from-sky-500 to-indigo-600',
    },
    {
      id: 'memory' as GameMode,
      title: 'Коля-Мемори',
      subtitle: 'Найди пары Колям',
      icon: '🧠',
      badge: 'Память',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'sweeper' as GameMode,
      title: 'Коля-Сапёр',
      subtitle: 'Обезвредь Коляпсус',
      icon: '💣',
      badge: 'Логика',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      id: 'clicker' as GameMode,
      title: 'Фабрика Коля-гена',
      subtitle: 'Прокачай кликер',
      icon: '⚡',
      badge: 'Кликер',
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 'meme' as GameMode,
      title: 'Мем-Студия',
      subtitle: 'Создай свой мем',
      icon: '🎨',
      badge: 'Творчество',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header with PC controls indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Gamepad2 className="w-4 h-4" /> Игровой центр Коляпедии
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Коля-<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400">Игротека PRO</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            6 игр и развлечений: аркадный раннер, флаппи-полёт, логическая память, сапёр, кликер и генератор мемов!
          </p>
        </div>

        {/* PC Fullscreen & Controls Tip */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>Клавиатура: стрелки, A/D, Пробел</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shadow-md active:scale-95"
            title="Полноэкранный режим на весь экран ПК"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Обычный экран' : 'Во весь экран'}</span>
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {gameTabs.map((tab) => {
          const isActive = activeGame === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playPop();
                setActiveGame(tab.id);
              }}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group active:scale-95 ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-102 ring-2 ring-cyan-400/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${tab.color} opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-25 transition-opacity`}
              />

              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl select-none group-hover:scale-110 transition-transform">
                  {tab.icon}
                </span>
                <span
                  className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>

              <div className="font-extrabold text-xs text-white group-hover:text-amber-300 transition-colors">
                {tab.title}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {tab.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Container */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
        {activeGame === 'runner' && <KolyaRunner />}
        {activeGame === 'flappy' && <KolyaFlappy />}
        {activeGame === 'memory' && <KolyaMemory />}
        {activeGame === 'sweeper' && <KolyaMinesweeper />}
        {activeGame === 'clicker' && <KolyaClicker />}
        {activeGame === 'meme' && <KolyaMemeStudio />}
      </div>
    </div>
  );
};
