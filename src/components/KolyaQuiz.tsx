import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS, type QuizResult } from '../data/koliapediaData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { HelpCircle, RefreshCw, Share2, Check, Award, Sparkles, ChevronRight } from 'lucide-react';

export const KolyaQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (archetype: string) => {
    sounds.playPop();
    const updatedAnswers = [...answers, archetype];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate winner
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });

      let topArchetype = 'coca';
      let maxCount = 0;
      Object.entries(counts).forEach(([arch, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topArchetype = arch;
        }
      });

      const finalResult = QUIZ_RESULTS[topArchetype] || QUIZ_RESULTS.coca;
      setResult(finalResult);

      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    sounds.playBoing();
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleShareResult = () => {
    if (!result) return;
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
    });
    const text = `🏆 Я прошёл тест «Какой ты Коля сегодня?» в Коляпедии!\n\nМой результат: ${result.title} (${result.emoji})\n«${result.subtitle}»\n${result.quote}\n\nПройди тест и узнай своего Колю!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4" /> Тест личности
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Какой ты Коля <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">сегодня?</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Ответь на 5 вопросов и получи свой официальный сертификат коля-сущности!
        </p>
      </div>

      {!result ? (
        /* Quiz Question Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              <span>Вопрос {currentQuestionIndex + 1} из {QUIZ_QUESTIONS.length}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <h3 className="text-lg md:text-2xl font-extrabold text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.archetype)}
                className="w-full text-left p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all duration-200 group flex items-center justify-between gap-3 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-700/50 group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                  <span className="text-sm md:text-base font-medium text-slate-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-slate-900/90 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-6 animate-scaleUp">
          {/* Certificate Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Award className="w-4 h-4" /> Официальный вердикт Коляпедии
          </div>

          <div className="my-4">
            <div className="inline-block text-8xl p-5 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl mb-4 animate-float select-none">
              {result.emoji}
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {result.title}
            </h3>
            <p className="text-base md:text-lg font-bold text-cyan-400 mt-2">
              {result.subtitle}
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-left text-sm space-y-4 max-w-lg mx-auto">
            <p className="text-slate-200 leading-relaxed">
              {result.description}
            </p>

            <div className="border-l-4 border-amber-400 pl-3 py-1 text-amber-300 font-semibold italic text-xs">
              {result.quote}
            </div>

            <div className="pt-2 border-t border-slate-700/50 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span><strong>Совместимость:</strong> {result.compatibility}</span>
            </div>
          </div>

          {/* Result Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShareResult}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/25 transition-all text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Результат скопирован!' : 'Поделиться результатом'}
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl border border-slate-700 transition-all text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Пройти заново
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
