import React, { useState } from 'react';
import { KOLYA_ENTRIES, type KolyaEntry } from '../data/koliapediaData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Dices, Sparkles, Share2, Heart, Check, ArrowRight } from 'lucide-react';

interface KolyaRouletteProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenCard: (entry: KolyaEntry) => void;
}

export const KolyaRoulette: React.FC<KolyaRouletteProps> = ({
  favorites,
  onToggleFavorite,
  onOpenCard,
}) => {
  const [currentEntry, setCurrentEntry] = useState<KolyaEntry | null>(() => {
    // Initial random entry
    const rand = Math.floor(Math.random() * KOLYA_ENTRIES.length);
    return KOLYA_ENTRIES[rand];
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sounds.playCollider();

    let counter = 0;
    const totalSteps = 18;
    const interval = setInterval(() => {
      sounds.playPop();
      const randomIdx = Math.floor(Math.random() * KOLYA_ENTRIES.length);
      setCurrentEntry(KOLYA_ENTRIES[randomIdx]);
      counter++;

      if (counter >= totalSteps) {
        clearInterval(interval);
        setIsSpinning(false);
        sounds.playFanfare();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }, 90);
  };

  const handleShare = () => {
    if (!currentEntry) return;
    sounds.playFanfare();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
    });
    const text = `🎯 Мой Коля дня: ${currentEntry.title} (${currentEntry.emoji})\n«${currentEntry.tagline}»\n\nУзнай своего Колю в Коляпедии!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFav = currentEntry ? favorites.includes(currentEntry.id) : false;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-24 md:pb-12 animate-fadeIn text-center">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Dices className="w-4 h-4" /> Генератор судьбы
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Коля <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Дня</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Нажми кнопку ниже, чтобы вселенная выбрала твой персональный коля-вайб на сегодня!
        </p>
      </div>

      {/* Main Roulette Box */}
      {currentEntry && (
        <div
          className={`relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl p-6 md:p-8 transition-all duration-300 ${
            isSpinning ? 'scale-95 blur-[1px]' : 'scale-100 hover:border-slate-600'
          }`}
        >
          <div
            className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${currentEntry.rarityColor} opacity-20 rounded-full blur-3xl pointer-events-none`}
          />

          {/* Top meta */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase bg-gradient-to-r ${currentEntry.rarityColor}`}
            >
              {currentEntry.rarity}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentEntry.categoryName}
            </span>
          </div>

          {/* Center Emoji + Title */}
          <div className="my-6">
            <div
              className={`inline-block text-7xl md:text-8xl p-5 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-xl mb-4 select-none ${
                isSpinning ? 'animate-bounce' : 'animate-float'
              }`}
            >
              {currentEntry.emoji}
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {currentEntry.title}
            </h3>
            <p className="text-xs italic text-slate-400 mt-1">{currentEntry.scientificName}</p>
            <p className="text-sm md:text-base font-semibold text-amber-300 mt-3 max-w-md mx-auto">
              «{currentEntry.tagline}»
            </p>
          </div>

          {/* Description snippet */}
          <p className="text-xs md:text-sm text-slate-300 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 max-w-lg mx-auto leading-relaxed text-left">
            {currentEntry.description}
          </p>

          {/* Quick interactive action buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenCard(currentEntry)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
            >
              Полное досье <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                onToggleFavorite(currentEntry.id);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border ${
                isFav
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              {isFav ? 'В избранном' : 'В избранное'}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Скопировано!' : 'Поделиться'}
            </button>
          </div>
        </div>
      )}

      {/* Main Spin Trigger Button */}
      <div className="pt-2">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="relative group px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:via-rose-400 hover:to-purple-500 text-white font-black text-lg md:text-xl rounded-2xl shadow-xl shadow-rose-500/30 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-3">
            <Dices className={`w-6 h-6 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
            {isSpinning ? 'Связь с космосом...' : 'КРУТИТЬ РУЛЕТКУ КОЛИ'}
            <Sparkles className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};
