import React, { useEffect, useState } from 'react';
import type { KolyaEntry } from '../data/koliapediaData';
import { sounds } from '../utils/audio';
import { X, Sparkles, AlertTriangle, Heart, Zap, Smile, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CardModalProps {
  entry: KolyaEntry | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  entry,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!entry) return null;

  const handleShare = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    const text = `📖 Из Коляпедии:\n✨ ${entry.title} (${entry.scientificName})\n«${entry.tagline}»\n\n${entry.quote}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header with background gradient */}
        <div className={`relative p-6 bg-gradient-to-r ${entry.rarityColor} text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            title="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-black/30 backdrop-blur-sm border border-white/20 uppercase tracking-wider">
              {entry.rarity}
            </span>
            <span className="text-xs text-white/90 bg-white/20 px-2.5 py-1 rounded-full">
              {entry.categoryName}
            </span>
          </div>

          <div className="flex items-start gap-4 mt-2">
            <div className="text-5xl p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-inner select-none">
              {entry.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-snug">{entry.title}</h2>
              <p className="text-xs italic text-white/80 mt-0.5">{entry.scientificName}</p>
              <p className="text-sm font-medium text-white/90 mt-1">{entry.tagline}</p>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Научное описание
            </h4>
            <p className="leading-relaxed text-slate-300 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
              {entry.description}
            </p>
          </div>

          {/* Stats bars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Характеристики Коли
            </h4>
            <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/40">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" /> Концентрация Коли
                  </span>
                  <span>{entry.stats.kolyaLevel}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${entry.stats.kolyaLevel}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Zap className="w-3.5 h-3.5" /> Харизма
                  </span>
                  <span>{entry.stats.charisma}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${entry.stats.charisma}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Smile className="w-3.5 h-3.5" /> Веселье и угар
                  </span>
                  <span>{entry.stats.fun}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${entry.stats.fun}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" /> Опасность для живота
                  </span>
                  <span>{entry.stats.danger}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${entry.stats.danger}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="border-l-4 border-amber-400 pl-4 py-1 italic text-slate-300 text-sm bg-amber-500/10 rounded-r-xl p-3">
            {entry.quote}
          </div>

          {/* Effects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Эффекты при контакте
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.effects.map((effect, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-1"
                >
                  ⚡ {effect}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sounds.playPop();
              onToggleFavorite(entry.id);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            {isFavorite ? 'В избранном' : 'В избранное'}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Скопировано!' : 'Поделиться шуткой'}
          </button>
        </div>
      </div>
    </div>
  );
};
