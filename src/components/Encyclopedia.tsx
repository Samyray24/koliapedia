import React, { useState, useMemo } from 'react';
import { KOLYA_ENTRIES, CATEGORIES, type KolyaEntry } from '../data/koliapediaData';
import { CardModal } from './CardModal';
import { sounds } from '../utils/audio';
import { Search, Heart, Sparkles, Utensils, HeartPulse, Atom, Crown, Film, Trophy, ArrowRight } from 'lucide-react';

interface EncyclopediaProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const Encyclopedia: React.FC<EncyclopediaProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<KolyaEntry | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
      case 'Atom': return <Atom className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Film': return <Film className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const filteredEntries = useMemo(() => {
    return KOLYA_ENTRIES.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.tagline.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.scientificName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === 'all' || entry.category === activeCategory;

      const matchesFavorites = !onlyFavorites || favorites.includes(entry.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [search, activeCategory, onlyFavorites, favorites]);

  const handleCardClick = (entry: KolyaEntry) => {
    if (entry.id === 'koka-kolya') {
      sounds.playFizz();
    } else if (entry.id === 'kolyader') {
      sounds.playCollider();
    } else if (entry.id === 'melan-kolya') {
      sounds.playMelancholy();
    } else {
      sounds.playPop();
    }
    setSelectedEntry(entry);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900 border border-purple-500/20 p-6 md:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Официальный реестр коля-науки
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Коляпедия <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400">2026</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Первая в мире фундаментальная шуточная энциклопедия, посвященная Николаям: от освежающей <strong className="text-rose-400">Кока-Коли</strong> и тропической <strong className="text-yellow-400">Пино-Коляды</strong> до <strong className="text-cyan-400">Большого Адронного Коляйдера</strong>!
          </p>

          {/* Search bar inside Hero */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по Коляпедии (напр. Кока-Коля, колики, бро-коли)..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow-inner transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              >
                Очистить
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playPop();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Favorite filter toggle */}
        <button
          onClick={() => {
            sounds.playPop();
            setOnlyFavorites(!onlyFavorites);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
            onlyFavorites
              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
          Любимые ({favorites.length})
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredEntries.map((entry) => {
          const isFav = favorites.includes(entry.id);
          return (
            <div
              key={entry.id}
              onClick={() => handleCardClick(entry)}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between"
            >
              {/* Top Row: Rarity + Favorite button */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${entry.rarityColor} shadow-sm`}
                  >
                    {entry.rarity}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playPop();
                      onToggleFavorite(entry.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Emoji + Title */}
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="text-3xl p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform select-none shadow-sm">
                    {entry.emoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-xs italic text-slate-400">{entry.scientificName}</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-medium text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                  {entry.tagline}
                </p>
              </div>

              {/* Bottom Row: Quick Stats Preview & Action */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3 font-semibold">
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {entry.stats.kolyaLevel}% Коли
                  </span>
                </div>
                <div className="flex items-center gap-1 text-purple-400 group-hover:translate-x-1 transition-transform font-bold">
                  Подробнее <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">Коля не обнаружен!</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
            По вашему запросу «{search}» ничего не найдено. Попробуйте сбросить фильтры или вбить другое слово.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* Modal */}
      <CardModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        isFavorite={selectedEntry ? favorites.includes(selectedEntry.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
