import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Brain, RotateCcw, Trophy, Check, Share2, Timer } from 'lucide-react';

interface Card {
  id: number;
  pairId: string;
  name: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const PAIRS = [
  { pairId: 'coca', name: 'Кока-Коля', emoji: '🥤' },
  { pairId: 'pina', name: 'Пино-Коляда', emoji: '🍹' },
  { pairId: 'shoko', name: 'Шо-Коляд', emoji: '🍫' },
  { pairId: 'bro', name: 'Бро-Коли', emoji: '🥦' },
  { pairId: 'collider', name: 'Коляйдер', emoji: '⚛️' },
  { pairId: 'melan', name: 'Мелан-Коля', emoji: '🌧️' },
  { pairId: 'tesla', name: 'Николь-Тесла', emoji: '⚡' },
  { pairId: 'collagen', name: 'Коля-ген', emoji: '✨' },
];

function createShuffledDeck(): Card[] {
  const deck: Card[] = [];
  let id = 1;

  PAIRS.forEach((pair) => {
    deck.push({ id: id++, pairId: pair.pairId, name: pair.name, emoji: pair.emoji, isFlipped: false, isMatched: false });
    deck.push({ id: id++, pairId: pair.pairId, name: pair.name, emoji: pair.emoji, isFlipped: false, isMatched: false });
  });

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const KolyaMemory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(createShuffledDeck);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_memory_best')) || 0;
    } catch {
      return 0;
    }
  });
  const [copied, setCopied] = useState(false);

  // Restart game
  const initGame = () => {
    sounds.playPop();
    setCards(createShuffledDeck());
    setFlippedIndices([]);
    setMoves(0);
    setSeconds(0);
    setIsWon(false);
  };

  // Timer
  useEffect(() => {
    if (isWon || cards.length === 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isWon, cards.length]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched || isWon) {
      return;
    }

    sounds.playPop();
    const newFlipped = [...flippedIndices, index];

    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const firstIdx = newFlipped[0];
      const secondIdx = newFlipped[1];
      const firstCard = cards[firstIdx];
      const secondCard = cards[index];
      setMoves((m) => m + 1);

      if (firstCard.pairId === secondCard.pairId) {
        if (firstCard.pairId === 'coca') {
          sounds.playFizz();
        } else {
          sounds.playFanfare();
        }

        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            );
            const allMatched = updated.every((c) => c.isMatched);
            if (allMatched) {
              setIsWon(true);
              sounds.playFanfare();
              confetti({ particleCount: 100, spread: 90 });
              const currentMoves = moves + 1;
              if (bestMoves === 0 || currentMoves < bestMoves) {
                setBestMoves(currentMoves);
                try {
                  localStorage.setItem('koliapedia_memory_best', String(currentMoves));
                } catch {
                  // ignore
                }
              }
            }
            return updated;
          });
          setFlippedIndices([]);
        }, 350);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleShare = () => {
    sounds.playFanfare();
    confetti({ particleCount: 40, spread: 50 });
    const text = `🧠 Я нашёл всех парных Коль в «Коля-Мемори» за ${moves} ходов и ${seconds} сек!\nСможешь быстрее? Проверь в Коляпедии! 🥤✨`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top dashboard */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Ходы</div>
            <div className="text-2xl font-black text-amber-400">{moves}</div>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-lg">
            <Timer className="w-4 h-4" />
            <span>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {bestMoves > 0 && (
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-end gap-1">
                <Trophy className="w-3 h-3 text-amber-400" /> Рекорд ходов
              </div>
              <div className="text-sm font-black text-slate-200">{bestMoves}</div>
            </div>
          )}

          <button
            onClick={initGame}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Заново
          </button>
        </div>
      </div>

      {/* Cards 4x4 Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto">
        {cards.map((card, idx) => {
          const showFront = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              disabled={showFront || flippedIndices.length === 2}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1.5 text-center transition-all duration-300 transform select-none relative ${
                card.isMatched
                  ? 'bg-emerald-950/60 border-2 border-emerald-500/80 shadow-lg shadow-emerald-500/20 scale-95'
                  : showFront
                  ? 'bg-slate-800 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 rotate-y-180'
                  : 'bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-700/80 hover:border-slate-500 hover:scale-105 active:scale-95 shadow-md'
              }`}
            >
              {showFront ? (
                <div className="animate-scaleUp flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl">{card.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-200 mt-1 line-clamp-1">
                    {card.name}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-amber-400">
                  <Brain className="w-6 h-6 opacity-40 mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                    КОЛЯ
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Win Modal / Banner */}
      {isWon && (
        <div className="bg-slate-900/95 border-2 border-emerald-500/60 rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-scaleUp max-w-md mx-auto">
          <div className="text-5xl animate-bounce">🎉</div>
          <div>
            <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
              Коляборация восстановлена!
            </span>
            <h3 className="text-2xl font-black text-white mt-1">Все пары найдены!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Вы справились за <strong>{moves} ходов</strong> и{' '}
              <strong>{seconds} секунд</strong>. Мозг Николая функционирует на 100%!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={initGame}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/25"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Играть снова
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-cyan-300 font-bold rounded-xl text-xs border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Скопировано!' : 'Поделиться'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
