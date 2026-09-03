import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gauge, Sparkles, Activity, AlertCircle, Check, Share2 } from 'lucide-react';

interface AnalysisResult {
  name: string;
  percentage: number;
  status: string;
  charisma: number;
  cocaColaLevel: number;
  collagenLevel: number;
  diagnosis: string;
  recommendation: string;
}

export const Kolyameter: React.FC = () => {
  const [name, setName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Deterministic pseudo-random based on name string
  const calculateKolya = (inputName: string): AnalysisResult => {
    const clean = inputName.trim().toLowerCase();
    const isActuallyKolya =
      clean === 'коля' ||
      clean === 'николай' ||
      clean === 'колян' ||
      clean === 'колюня' ||
      clean === 'никола' ||
      clean === 'колясик' ||
      clean === 'nikolay' ||
      clean === 'kolya';

    if (isActuallyKolya) {
      return {
        name: inputName.trim(),
        percentage: 146,
        status: 'КРИТИЧЕСКИЙ ПЕРЕИЗБЫТОК КОЛИ (146%)',
        charisma: 100,
        cocaColaLevel: 100,
        collagenLevel: 100,
        diagnosis: 'Абсолютный и чистейший Николай во плоти. Вокруг искрит переменный ток харизмы, все проблемы испаряются при взгляде.',
        recommendation: 'Срочно выпить баночку Кока-Коли, пожать руку друзьям и продолжать сиять. Вы великолепны!',
      };
    }

    // Hash the name
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = (hash << 5) - hash + clean.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    const percentage = 15 + (absHash % 75); // 15% to 89%
    const charisma = 40 + (absHash % 55);
    const cocaColaLevel = 30 + ((absHash * 3) % 65);
    const collagenLevel = 25 + ((absHash * 7) % 70);

    let status = 'Умеренное содержание Коли';
    let diagnosis = 'В организме присутствуют выраженные микроэлементы Николая.';
    let recommendation = 'Рекомендуется раз в день обнимать Колю для подзарядки.';

    if (percentage > 70) {
      status = 'Высокая концентрация Коля-гена!';
      diagnosis = 'Пациент почти на три четверти состоит из праздника, шуток и позитива.';
      recommendation = 'Срочно угостить друзей Пино-Колядой и станцевать под Меладзе.';
    } else if (percentage < 35) {
      status = 'Острый дефицит Николая в крови';
      diagnosis = 'Обнаружена легкая меланхолия и нехватка газированных шуток.';
      recommendation = 'Курс интенсивной Коляборации: 3 серии смеха до колик в животике.';
    }

    return {
      name: inputName.trim(),
      percentage,
      status,
      charisma,
      cocaColaLevel,
      collagenLevel,
      diagnosis,
      recommendation,
    };
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isScanning) return;

    setIsScanning(true);
    setResult(null);
    sounds.playScan();

    setTimeout(() => {
      const res = calculateKolya(name);
      setResult(res);
      setIsScanning(false);
      sounds.playFanfare();

      if (res.percentage >= 70) {
        confetti({
          particleCount: 70,
          spread: 80,
        });
      }
    }, 1500);
  };

  const handleShare = () => {
    if (!result) return;
    sounds.playFanfare();
    confetti({ particleCount: 40, spread: 50 });
    const text = `🔬 Коляриметр 2026: Результаты сканирования\nОбъект: ${result.name}\nУровень Коли: ${result.percentage}%\nСтатус: ${result.status}\n\nДиагноз: ${result.diagnosis}\nРецепт: ${result.recommendation}\n\nПроверь себя в Коляпедии!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Gauge className="w-4 h-4" /> Био-лаборатория Коляпедии
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Коля<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">риметр</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Введите имя любого человека или друга, чтобы узнать точный процент содержания Коли в его крови!
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleScan}
        className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя (напр. Коля, Саня, Настя)..."
            required
            className="flex-1 px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
          />
          <button
            type="submit"
            disabled={isScanning || !name.trim()}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-500/25 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <Activity className="w-5 h-5 animate-spin" /> Сканирование...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> СКАНИРОВАТЬ
              </>
            )}
          </button>
        </div>

        {/* Quick chip suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
          <span>Быстрый тест:</span>
          {['Коля', 'Николай', 'Саня', 'Артем', 'Катя', 'Кот Борис'].map((suggest) => (
            <button
              key={suggest}
              type="button"
              onClick={() => {
                sounds.playPop();
                setName(suggest);
              }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              {suggest}
            </button>
          ))}
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className="bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-scaleUp">
          {/* Header of Report */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Официальный протокол испытаний
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">
                Объект: <span className="text-emerald-300">{result.name}</span>
              </h3>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                {result.percentage}%
              </div>
              <div className="text-xs text-slate-400 font-semibold">Уровень Коли</div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center font-bold text-emerald-300 text-sm">
            ⚡ {result.status}
          </div>

          {/* Biomarkers Bars */}
          <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Биомаркеры Николая
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-400">Харизма и обаяние</span>
                <span>{result.charisma}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.charisma, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-400">Концентрация Кока-Коли</span>
                <span>{result.cocaColaLevel}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.cocaColaLevel, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-teal-400">Запас Коля-гена (молодость)</span>
                <span>{result.collagenLevel}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.collagenLevel, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Clinical diagnosis & recommendation */}
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/50">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                Клиническое заключение:
              </span>
              <p className="text-slate-200">{result.diagnosis}</p>
            </div>

            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <span className="text-xs font-bold text-amber-400 uppercase block mb-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Врачебный рецепт:
              </span>
              <p className="text-amber-200/90">{result.recommendation}</p>
            </div>
          </div>

          {/* Share button */}
          <div className="pt-2 text-center">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Результат скопирован!' : 'Поделиться результатом'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
