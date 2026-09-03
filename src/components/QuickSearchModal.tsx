import React, { useState, useEffect } from 'react';
import { KOLYA_ENTRIES, type KolyaEntry } from '../data/koliapediaData';
import { sounds } from '../utils/audio';
import { Search, X, ArrowRight, Gamepad2, HelpCircle, Gauge } from 'lucide-react';
import type { TabType } from './Navbar';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntry: (entry: KolyaEntry) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEntry,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEntries = query.trim()
    ? KOLYA_ENTRIES.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.tagline.toLowerCase().includes(query.toLowerCase()) ||
          e.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : KOLYA_ENTRIES.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Search input header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Быстрый поиск по Коляпедии (Ctrl+K)..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm md:text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jump Links */}
        <div className="p-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-bold px-1 uppercase text-[10px]">Разделы:</span>
          <button
            onClick={() => {
              sounds.playPop();
              onNavigateTab('game');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-rose-400" /> Игротека
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onNavigateTab('quiz');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Тест
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onNavigateTab('kolyameter');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0"
          >
            <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Коляриметр
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => {
                sounds.playPop();
                onSelectEntry(entry);
                onClose();
              }}
              className="p-3 rounded-2xl hover:bg-slate-800/80 flex items-center justify-between gap-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform">
                  {entry.emoji}
                </span>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                    {entry.title}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">{entry.tagline}</div>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              Ничего не найдено по запросу «{query}»
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Навигация клавишами на ПК</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
            ESC чтобы закрыть
          </span>
        </div>
      </div>
    </div>
  );
};
