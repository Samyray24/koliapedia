import React from 'react';
import { Sparkles, Radio } from 'lucide-react';

export const DesktopTicker: React.FC = () => {
  const newsItems = [
    '🥤 Экстренно: В атмосфере зафиксирован рекордный выброс Кока-Коли и хорошего настроения!',
    '🍹 Пино-Коляда признана официальным напитком беззаботных выходных!',
    '⚛️ Большой Адронный Коляйдер разогнал Колю до скорости света в пятницу вечером!',
    '🥦 Опрос показал: Бро-Коли — самый верный и питательный друг на планете!',
    '✨ Ученые подтвердили: регулярный контакт с Колей повышает уровень Коля-гена на 300%!',
    '📜 Согласно Прото-Коле, понедельник временно отменяется в пользу субботы!',
    '🍫 Шо-Коляд растопил все дедлайны и холодные сердца!',
  ];

  return (
    <div className="hidden md:flex items-center gap-3 bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs text-slate-300 overflow-hidden select-none">
      <div className="flex items-center gap-1.5 text-rose-400 font-extrabold flex-shrink-0 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
        <Radio className="w-3 h-3 animate-pulse" />
        <span className="uppercase text-[10px] tracking-wider">Коля-Информ</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap w-full relative">
        <div className="inline-block animate-marquee hover:pause-marquee">
          {newsItems.map((news, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 mx-6 font-medium text-slate-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{news}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
