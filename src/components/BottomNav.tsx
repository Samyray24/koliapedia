import React from 'react';
import type { TabType } from './Navbar';
import { sounds } from '../utils/audio';
import { BookOpen, Dices, HelpCircle, Gauge, Wine, Volume2, Gamepad2 } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'encyclopedia' as TabType, label: 'Коляпедия', icon: BookOpen },
    { id: 'game' as TabType, label: 'Игра', icon: Gamepad2 },
    { id: 'roulette' as TabType, label: 'Коля дня', icon: Dices },
    { id: 'quiz' as TabType, label: 'Тест', icon: HelpCircle },
    { id: 'kolyameter' as TabType, label: 'Коляриметр', icon: Gauge },
    { id: 'toast' as TabType, label: 'Тосты', icon: Wine },
    { id: 'soundboard' as TabType, label: 'Звуки', icon: Volume2 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-1 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playPop();
              setActiveTab(tab.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all relative flex-shrink-0 ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-all ${isActive ? 'bg-cyan-500/10 scale-110' : ''}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[9px] mt-0.5">{tab.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-400" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
