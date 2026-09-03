import React, { useState } from 'react';
import { TOAST_OCCASIONS, TOAST_TEMPLATES } from '../data/koliapediaData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Wine, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

export const ToastGenerator: React.FC = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('bday');
  const [currentToastIndex, setCurrentToastIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const toastsList = TOAST_TEMPLATES[selectedOccasion] || TOAST_TEMPLATES.bday;
  const currentToast = toastsList[currentToastIndex % toastsList.length];

  const handleNextToast = () => {
    sounds.playPop();
    setCurrentToastIndex((prev) => (prev + 1) % toastsList.length);
  };

  const handleCopyToast = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
    });
    navigator.clipboard.writeText(currentToast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Wine className="w-4 h-4" /> Генератор коля-тостов
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Поздравления для <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Коли</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Выберите повод и скопируйте душевное, смешное и эпичное поздравление с коля-терминами!
        </p>
      </div>

      {/* Occasion Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {TOAST_OCCASIONS.map((occ) => {
          const isActive = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => {
                sounds.playPop();
                setSelectedOccasion(occ.id);
                setCurrentToastIndex(0);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-600/25 scale-105'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {occ.name}
            </button>
          );
        })}
      </div>

      {/* Toast Display Card */}
      <div className="bg-slate-900/90 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 select-none pointer-events-none">
          🥂
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-800">
          <span>Вариант {currentToastIndex + 1} из {toastsList.length}</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> 100% авторский юмор
          </span>
        </div>

        {/* Toast Body */}
        <p className="text-base md:text-lg text-slate-200 leading-relaxed italic bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
          «{currentToast}»
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleNextToast}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700 text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Другой вариант
          </button>

          <button
            onClick={handleCopyToast}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black rounded-xl shadow-lg shadow-rose-500/25 text-sm transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Скопировано!' : 'Скопировать тост для Коли'}
          </button>
        </div>
      </div>
    </div>
  );
};
