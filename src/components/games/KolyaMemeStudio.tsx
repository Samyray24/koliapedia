import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Download, RefreshCw, Palette } from 'lucide-react';

interface MemePreset {
  id: string;
  name: string;
  topText: string;
  bottomText: string;
  emoji: string;
  bgGrad: [string, string];
}

const PRESETS: MemePreset[] = [
  {
    id: 'cola',
    name: 'Кока-Коля',
    topText: 'КОГДА СПРОСИЛИ КТО ПРИДЁТ НА ПРАЗДНИК',
    bottomText: 'А КОКА-КОЛЯ УЖЕ ТУТ',
    emoji: '🥤',
    bgGrad: ['#e11d48', '#881337'],
  },
  {
    id: 'kolyapsus',
    name: 'Коляпсус',
    topText: 'КОЛЯ СКАЗАЛ «ВЫХОЖУ ЧЕРЕЗ 5 МИНУТ»',
    bottomText: 'ПРОШЛО 45 СВЕТОВЫХ ЛЕТ',
    emoji: '🌀',
    bgGrad: ['#7c3aed', '#2e1065'],
  },
  {
    id: 'collider',
    name: 'Коляйдер',
    topText: 'РАЗОГНАЛСЯ В ПЯТНИЦУ В 18:00',
    bottomText: 'ДО СКОРОСТИ СВЕТА В КАРАОКЕ',
    emoji: '⚛️',
    bgGrad: ['#0284c7', '#082f49'],
  },
  {
    id: 'bro',
    name: 'Бро-Коли',
    topText: 'ДРУГИЕ ОВОЩИ ГОВОРЯТ О ДИЕТЕ',
    bottomText: 'А БРО-КОЛИ ВСЕГДА ПРИКРОЕТ СПИНУ',
    emoji: '🥦',
    bgGrad: ['#059669', '#064e3b'],
  },
  {
    id: 'shoko',
    name: 'Шо-Коляд',
    topText: '85% ЭЛИТНОГО ОЧАРОВАНИЯ',
    bottomText: 'ТАЕТ ПРЯМО В СЕРДЕЧКЕ',
    emoji: '🍫',
    bgGrad: ['#92400e', '#451a03'],
  },
];

export const KolyaMemeStudio: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<MemePreset>(PRESETS[0]);
  const [topText, setTopText] = useState(PRESETS[0].topText);
  const [bottomText, setBottomText] = useState(PRESETS[0].bottomText);
  const [activeSticker, setActiveSticker] = useState('👑');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, selectedPreset.bgGrad[0]);
    grad.addColorStop(1, selectedPreset.bgGrad[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Center big emoji
    ctx.font = '110px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedPreset.emoji, w / 2, h / 2 - 10);

    // Sticker
    if (activeSticker) {
      ctx.font = '50px sans-serif';
      ctx.fillText(activeSticker, w / 2 + 55, h / 2 - 65);
    }

    // Top and Bottom text styling
    ctx.font = 'bold 22px "Rubik", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Draw Top Text
    ctx.strokeText(topText, w / 2, 45);
    ctx.fillText(topText, w / 2, 45);

    // Draw Bottom Text
    ctx.strokeText(bottomText, w / 2, h - 35);
    ctx.fillText(bottomText, w / 2, h - 35);

    // Watermark
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('⚡ КОЛЯПЕДИЯ 2026', w / 2, h - 14);
  }, [selectedPreset, topText, bottomText, activeSticker]);

  useEffect(() => {
    drawMeme();
  }, [drawMeme]);

  const handleApplyPreset = (preset: MemePreset) => {
    sounds.playPop();
    setSelectedPreset(preset);
    setTopText(preset.topText);
    setBottomText(preset.bottomText);
  };

  const handleDownload = () => {
    sounds.playFanfare();
    confetti({ particleCount: 50, spread: 60 });
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `koliapedia-meme-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto select-none">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Palette className="w-3.5 h-3.5" /> Студия коля-мемов
        </div>
        <h3 className="text-2xl font-black text-white">Генератор Мемов про Колю</h3>
        <p className="text-xs text-slate-400 mt-1">
          Создавайте авторские мемы, меняйте текст, стикеры и скачивайте картинку прямо на ПК!
        </p>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleApplyPreset(p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              selectedPreset.id === p.id
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-500 text-white shadow-md scale-105'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{p.emoji}</span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Meme Canvas Preview */}
      <div className="flex justify-center">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-900">
          <canvas
            ref={canvasRef}
            width={440}
            height={360}
            className="w-full max-w-[440px] block"
          />
        </div>
      </div>

      {/* Text inputs */}
      <div className="space-y-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div>
          <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
            Верхний текст мема:
          </label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value.toUpperCase())}
            className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
            Нижний текст мема:
          </label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value.toUpperCase())}
            className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Sticker choice */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400 font-semibold">Стикер на Коле:</span>
          <div className="flex items-center gap-1.5">
            {['👑', '🕶️', '⚡', '🥤', '🍕', ''].map((st, i) => (
              <button
                key={i}
                onClick={() => {
                  sounds.playPop();
                  setActiveSticker(st);
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-base border transition-all ${
                  activeSticker === st
                    ? 'bg-pink-500/20 border-pink-500 scale-110'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {st || '❌'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black text-sm rounded-xl shadow-lg shadow-pink-500/30 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" /> СКАЧАТЬ МЕМ (PNG)
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            const rand = PRESETS[Math.floor(Math.random() * PRESETS.length)];
            handleApplyPreset(rand);
          }}
          className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Случайный
        </button>
      </div>
    </div>
  );
};
