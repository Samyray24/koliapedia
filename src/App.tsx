import { useState, useEffect, useCallback } from 'react';
import { Navbar, type TabType } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Encyclopedia } from './components/Encyclopedia';
import { KolyaRoulette } from './components/KolyaRoulette';
import { KolyaQuiz } from './components/KolyaQuiz';
import { Kolyameter } from './components/Kolyameter';
import { ToastGenerator } from './components/ToastGenerator';
import { Soundboard } from './components/Soundboard';
import { KolyaGame } from './components/KolyaGame';
import { CardModal } from './components/CardModal';
import { BackgroundEffects } from './components/BackgroundEffects';
import { DesktopTicker } from './components/DesktopTicker';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Can3DViewer } from './components/Can3DViewer';
import type { KolyaEntry } from './data/koliapediaData';
import { sounds } from './utils/audio';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('encyclopedia');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<KolyaEntry | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCanModalOpen, setIsCanModalOpen] = useState(false);

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('koliapedia_favorites');
      return saved ? JSON.parse(saved) : ['koka-kolya', 'pino-kolyada'];
    } catch {
      return ['koka-kolya', 'pino-kolyada'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('koliapedia_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  // Global PC Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ctrl+K or Cmd+K for Quick Search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      // 1-7 for tab navigation
      if (e.key === '1') { setActiveTab('encyclopedia'); sounds.playPop(); }
      else if (e.key === '2') { setActiveTab('game'); sounds.playPop(); }
      else if (e.key === '3') { setActiveTab('roulette'); sounds.playPop(); }
      else if (e.key === '4') { setActiveTab('quiz'); sounds.playPop(); }
      else if (e.key === '5') { setActiveTab('kolyameter'); sounds.playPop(); }
      else if (e.key === '6') { setActiveTab('toast'); sounds.playPop(); }
      else if (e.key === '7') { setActiveTab('soundboard'); sounds.playPop(); }
      else if (e.key === 'c' || e.key === 'C' || e.key === 'с' || e.key === 'С') {
        sounds.playPop();
        setIsCanModalOpen(true);
      }
      else if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') {
        const newState = sounds.toggleSound();
        setSoundEnabled(newState);
        if (newState) sounds.playPop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Background Interactive Soda Bubbles & Mouse Glow */}
      <BackgroundEffects />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCan={() => setIsCanModalOpen(true)}
      />

      {/* Desktop Marquee Ticker */}
      <DesktopTicker />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-4 md:pt-6 relative z-10">
        {activeTab === 'encyclopedia' && (
          <Encyclopedia
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'game' && <KolyaGame />}

        {activeTab === 'roulette' && (
          <KolyaRoulette
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenCard={(entry) => setSelectedEntry(entry)}
          />
        )}

        {activeTab === 'quiz' && <KolyaQuiz />}

        {activeTab === 'kolyameter' && <Kolyameter />}

        {activeTab === 'toast' && <ToastGenerator />}

        {activeTab === 'soundboard' && <Soundboard />}
      </main>

      {/* Interactive 3D WebGL Can Viewer */}
      <Can3DViewer
        isOpen={isCanModalOpen}
        onClose={() => setIsCanModalOpen(false)}
      />

      {/* Quick Search Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEntry={(entry) => setSelectedEntry(entry)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Card Modal when opened via Roulette or external trigger */}
      <CardModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        isFavorite={selectedEntry ? favorites.includes(selectedEntry.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Footer */}
      <footer className="hidden md:block py-6 border-t border-slate-900 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Коляпедия 2026 PRO</span>
            <span>•</span>
            <span className="text-slate-400">Сделано с любовью и Коля-геном</span>
          </div>

          <div className="text-[11px] text-slate-500 hidden lg:flex items-center gap-3">
            <span>Горячие клавиши на ПК:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">1-7</kbd> вкладки
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">Ctrl+K</kbd> поиск
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">M</kbd> звук
          </div>

          <div className="text-slate-400 flex items-center gap-1">
            Все совпадения с реальными Николаями абсолютно запланированы ✨
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
