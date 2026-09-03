import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Flag, RotateCcw, Trophy, ShieldAlert } from 'lucide-react';

interface Cell {
  row: number;
  col: number;
  isCollapsus: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentCount: number;
}

const GRID_SIZE = 6;
const TOTAL_MINES = 5;

function createBoard(): Cell[][] {
  const newGrid: Cell[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push({
        row: r,
        col: c,
        isCollapsus: false,
        isRevealed: false,
        isFlagged: false,
        adjacentCount: 0,
      });
    }
    newGrid.push(row);
  }

  let placed = 0;
  while (placed < TOTAL_MINES) {
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    if (!newGrid[r][c].isCollapsus) {
      newGrid[r][c].isCollapsus = true;
      placed++;
    }
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!newGrid[r][c].isCollapsus) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              if (newGrid[nr][nc].isCollapsus) count++;
            }
          }
        }
        newGrid[r][c].adjacentCount = count;
      }
    }
  }

  return newGrid;
}

export const KolyaMinesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>(createBoard);
  const [flagMode, setFlagMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [flagsPlaced, setFlagsPlaced] = useState(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_sweeper_wins')) || 0;
    } catch {
      return 0;
    }
  });

  const initBoard = () => {
    sounds.playPop();
    setGrid(createBoard());
    setGameOver(false);
    setIsWon(false);
    setFlagsPlaced(0);
  };

  const revealCell = (r: number, c: number, currentGrid: Cell[][]) => {
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
    const cell = currentGrid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.adjacentCount === 0 && !cell.isCollapsus) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) {
            revealCell(r + dr, c + dc, currentGrid);
          }
        }
      }
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameOver || isWon || grid[r][c].isRevealed) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c];

    if (flagMode) {
      sounds.playPop();
      if (!cell.isFlagged && flagsPlaced >= TOTAL_MINES) return;
      cell.isFlagged = !cell.isFlagged;
      setFlagsPlaced((prev) => (cell.isFlagged ? prev + 1 : prev - 1));
      setGrid(newGrid);
      return;
    }

    if (cell.isFlagged) return;

    if (cell.isCollapsus) {
      sounds.playBoing();
      newGrid.forEach((row) =>
        row.forEach((item) => {
          if (item.isCollapsus) item.isRevealed = true;
        })
      );
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    sounds.playFizz();
    revealCell(r, c, newGrid);

    let unrevealedSafe = 0;
    for (let rowIdx = 0; rowIdx < GRID_SIZE; rowIdx++) {
      for (let colIdx = 0; colIdx < GRID_SIZE; colIdx++) {
        const item = newGrid[rowIdx][colIdx];
        if (!item.isCollapsus && !item.isRevealed) {
          unrevealedSafe++;
        }
      }
    }

    setGrid(newGrid);

    if (unrevealedSafe === 0) {
      setIsWon(true);
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 80 });
      const nextStreak = bestStreak + 1;
      setBestStreak(nextStreak);
      try {
        localStorage.setItem('koliapedia_sweeper_wins', String(nextStreak));
      } catch {
        // ignore
      }
    }
  };

  const handleCellContextMenu = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || isWon || grid[r][c].isRevealed) return;

    sounds.playPop();
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c];
    if (!cell.isFlagged && flagsPlaced >= TOTAL_MINES) return;

    cell.isFlagged = !cell.isFlagged;
    setFlagsPlaced((prev) => (cell.isFlagged ? prev + 1 : prev - 1));
    setGrid(newGrid);
  };

  const getNumberColor = (count: number) => {
    switch (count) {
      case 1: return 'text-cyan-400 font-extrabold';
      case 2: return 'text-emerald-400 font-extrabold';
      case 3: return 'text-amber-400 font-black';
      case 4: return 'text-rose-400 font-black';
      default: return 'text-purple-400 font-black';
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top dashboard */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span className="text-base">🌀</span> {TOTAL_MINES - flagsPlaced} Коляпсусов
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              setFlagMode(!flagMode);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              flagMode
                ? 'bg-amber-500 border-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Flag className="w-3.5 h-3.5" /> {flagMode ? 'Режим флажка: ВКЛ' : 'Флажок'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {bestStreak > 0 && (
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-end gap-1">
                <Trophy className="w-3 h-3 text-amber-400" /> Победы
              </div>
              <div className="text-sm font-black text-slate-200">{bestStreak}</div>
            </div>
          )}

          <button
            onClick={initBoard}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Заново
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto select-none">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              onContextMenu={(e) => handleCellContextMenu(e, r, c)}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm md:text-base font-black transition-all duration-150 ${
                cell.isRevealed
                  ? cell.isCollapsus
                    ? 'bg-rose-950 border-2 border-rose-500 text-rose-300 animate-bounce'
                    : 'bg-slate-800/90 border border-slate-700/60 shadow-inner'
                  : 'bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 active:scale-95 shadow-sm'
              }`}
            >
              {cell.isRevealed ? (
                cell.isCollapsus ? (
                  '🌀'
                ) : cell.adjacentCount > 0 ? (
                  <span className={getNumberColor(cell.adjacentCount)}>{cell.adjacentCount}</span>
                ) : (
                  <span className="text-xs opacity-40">🥤</span>
                )
              ) : cell.isFlagged ? (
                '🚩'
              ) : null}
            </button>
          ))
        )}
      </div>

      {/* Defeat Banner */}
      {gameOver && (
        <div className="bg-slate-900/95 border-2 border-rose-500/60 rounded-3xl p-6 text-center space-y-3 shadow-2xl animate-scaleUp max-w-sm mx-auto">
          <div className="text-4xl animate-bounce">🌀</div>
          <h4 className="text-xl font-black text-rose-400">Коляпсус активирован!</h4>
          <p className="text-xs text-slate-300">
            Коля сказал: «Сейчас приду» и пространство схлопнулось! Попробуйте снова!
          </p>
          <button
            onClick={initBoard}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/25"
          >
            Попробовать снова
          </button>
        </div>
      )}

      {/* Win Banner */}
      {isWon && (
        <div className="bg-slate-900/95 border-2 border-emerald-500/60 rounded-3xl p-6 text-center space-y-3 shadow-2xl animate-scaleUp max-w-sm mx-auto">
          <div className="text-4xl animate-bounce">🏆</div>
          <h4 className="text-xl font-black text-emerald-300">Все Коляпсусы обезврежены!</h4>
          <p className="text-xs text-slate-300">
            Идеальная логика! Вселенная Николая спасена от задержек и сбоев.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={initBoard}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
            >
              Новый раунд
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
        <span>Подсказка: на компьютере флажок можно ставить правой кнопкой мыши!</span>
      </div>
    </div>
  );
};
