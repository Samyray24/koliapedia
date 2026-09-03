import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { Volume2 } from 'lucide-react';

interface SoundItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  action: () => void;
}

export const Soundboard: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const triggerSound = (item: SoundItem) => {
    setActiveSound(item.id);
    item.action();
    setTimeout(() => {
      setActiveSound(null);
    }, 600);
  };

  const soundList: SoundItem[] = [
    {
      id: 'fizz',
      name: 'Пшик Кока-Коли',
      desc: 'Открытие ледяной баночки с Николаем',
      icon: '🥤',
      color: 'from-red-500 to-rose-600',
      action: () => sounds.playFizz(),
    },
    {
      id: 'collider',
      name: 'Разгон Коляйдера',
      desc: 'Ускорение до сверхсветовой скорости пятницы',
      icon: '⚛️',
      color: 'from-cyan-500 to-blue-600',
      action: () => sounds.playCollider(),
    },
    {
      id: 'fanfare',
      name: 'Победные фанфары',
      desc: 'Коля вошел в комнату и победил',
      icon: '🎺',
      color: 'from-amber-400 to-yellow-600',
      action: () => sounds.playFanfare(),
    },
    {
      id: 'boing',
      name: 'Боинг-прыжок',
      desc: 'Коля преодолел любые препятствия',
      icon: '🤸',
      color: 'from-emerald-500 to-teal-600',
      action: () => sounds.playBoing(),
    },
    {
      id: 'melancholy',
      name: 'Вайб Мелан-Коли',
      desc: 'Грустный осенний аккорд у окна',
      icon: '🌧️',
      color: 'from-indigo-500 to-purple-600',
      action: () => sounds.playMelancholy(),
    },
    {
      id: 'scan',
      name: 'Сигнал Коляриметра',
      desc: 'Квантовый датчик харизмы',
      icon: '📡',
      color: 'from-teal-400 to-emerald-600',
      action: () => sounds.playScan(),
    },
    {
      id: 'pop',
      name: 'Коля-Поп',
      desc: 'Быстрый щелчок позитива',
      icon: '✨',
      color: 'from-pink-500 to-rose-500',
      action: () => sounds.playPop(),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Volume2 className="w-4 h-4" /> Интерактивная аудио-панель
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Коля-<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Саундборд</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Нажимайте на кнопки, чтобы воспроизводить фирменные мемные звуки вселенной Коли!
        </p>
      </div>

      {/* Grid of Sound Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {soundList.map((item) => {
          const isPlaying = activeSound === item.id;
          return (
            <button
              key={item.id}
              onClick={() => triggerSound(item)}
              className={`relative overflow-hidden p-5 rounded-2xl border text-left transition-all duration-200 group active:scale-95 ${
                isPlaying
                  ? 'border-white ring-2 ring-violet-400 bg-slate-800 scale-102 shadow-xl'
                  : 'border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800/80 shadow-lg'
              }`}
            >
              {/* Background gradient pill */}
              <div
                className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl pointer-events-none group-hover:opacity-25 transition-opacity`}
              />

              <div className="flex items-start gap-4">
                <div
                  className={`text-4xl p-3 rounded-2xl bg-slate-800 border border-slate-700 select-none shadow-sm transition-transform ${
                    isPlaying ? 'scale-125 rotate-6' : 'group-hover:scale-110'
                  }`}
                >
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h4>
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-violet-400 animate-pulse' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center pt-4 text-xs text-slate-500">
        💡 Все звуки генерируются прямо в браузере в реальном времени с помощью Web Audio API синтезатора без скачивания внешних файлов!
      </div>
    </div>
  );
};
