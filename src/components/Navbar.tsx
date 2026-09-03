import React from 'react';
import { sounds } from '../utils/audio';
import { BookOpen, Dices, HelpCircle, Gauge, Wine, Volume2, VolumeX, Gamepad2, Search, Maximize2 } from 'lucide-react';

export type TabType = 'encyclopedia' | 'game' | 'roulette' | 'quiz' | 'kolyameter' | 'toast' | 'soundboard';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenSearch: () => void;
  onOpenCan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenSearch,
  onOpenCan,
}) => {
  const toggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      sounds.playPop();
    }
  };

  const toggleFullscreen = () => {
    sounds.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const navTabs = [
    { id: 'encyclopedia' as TabType, label: 'Коляпедия', icon: BookOpen, shortcut: '1' },
    { id: 'game' as TabType, label: 'Игротека', icon: Gamepad2, shortcut: '2' },
    { id: 'roulette' as TabType, label: 'Коля Дня', icon: Dices, shortcut: '3' },
    { id: 'quiz' as TabType, label: 'Тест', icon: HelpCircle, shortcut: '4' },
    { id: 'kolyameter' as TabType, label: 'Коляриметр', icon: Gauge, shortcut: '5' },
    { id: 'toast' as TabType, label: 'Тосты', icon: Wine, shortcut: '6' },
    { id: 'soundboard' as TabType, label: 'Звуки', icon: Volume2, shortcut: '7' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => {
            sounds.playFizz();
            setActiveTab('encyclopedia');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-500 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl">
              🥤
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors font-display">
                Коляпедия
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Вселенная шуток про Колю
            </p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playPop();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`Перейти: ${tab.label} (Клавиша ${tab.shortcut})`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="hidden xl:inline text-[9px] font-mono opacity-50 px-1 py-0.2 rounded bg-black/20">
                  {tab.shortcut}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Quick Can Opener, Quick Search, Fullscreen & Sound */}
        <div className="flex items-center gap-2">
          {/* Quick Can Opener Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenCan();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-md shadow-rose-600/25 active:scale-95 transition-all group"
            title="Открыть баночку Кока-Коли со звуком и эффектами"
          >
            <span className="text-base group-hover:scale-125 transition-transform">🥤</span>
            <span className="hidden sm:inline">Открыть Колу</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-medium transition-all shadow-sm group"
            title="Быстрый поиск по Коляпедии (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="hidden sm:inline">Поиск</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Fullscreen button on PC */}
          <button
            onClick={toggleFullscreen}
            className="hidden md:flex p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
            title="Полноэкранный режим (F11)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-all relative ${
              soundEnabled
                ? 'bg-slate-900 border-slate-700 text-cyan-400 hover:text-cyan-300 hover:border-slate-600 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Звук ВКЛ (нажмите M для выключения)' : 'Звук ВЫКЛ (нажмите M)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
