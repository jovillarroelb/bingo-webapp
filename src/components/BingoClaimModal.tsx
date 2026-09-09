import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trophy,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
  PartyPopper,
  User,
  Search,
  ArrowLeft,
  Dices,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DrawnBall, GameMode, BingoLetter } from '../types';
import { LETTER_RANGES, NUMBER_NICKNAMES, getNumberNickname } from '../utils/bingoData';
import { GAME_MODE_LABELS } from '../utils/scoreboard';
import { playSound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { getGameModeLabel } from '../i18n/translations';

interface BingoClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards?: any[];
  drawnBalls: DrawnBall[];
  activeMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onRecordWin: (playerName: string, mode: GameMode, ballsCount: number, pattern?: string) => void;
  soundEnabled: boolean;
}

export const BingoClaimModal: React.FC<BingoClaimModalProps> = ({
  isOpen,
  onClose,
  drawnBalls,
  activeMode,
  onModeChange,
  onRecordWin,
  soundEnabled,
}) => {
  const { t, lang } = useLanguage();
  const [typedPlayerName, setTypedPlayerName] = useState<string>('');
  const [step, setStep] = useState<'input' | 'verify' | 'result_ok' | 'result_mal'>('input');
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setHasRecorded(false);
      setSearchQuery('');
      setTypedPlayerName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const drawnMap = new Map<number, number>();
  drawnBalls.forEach((b, idx) => {
    drawnMap.set(b.number, idx + 1);
  });

  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];
  const searchNum = parseInt(searchQuery.trim(), 10);
  const isSearchValid = !isNaN(searchNum) && searchNum >= 1 && searchNum <= 75;
  const currentWinnerName = typedPlayerName.trim() || t.claimDefaultChampionName;

  // Fireworks celebration sequence
  const launchFireworks = () => {
    playSound('fireworks', soundEnabled);
    playSound('fanfare', soundEnabled);

    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ['#EC4899', '#F97316', '#FBBF24', '#06D6A0', '#4F46E5'],
      });
    }, 280);
  };

  // Host manual verification: OK (Green)
  const handleConfirmOk = () => {
    launchFireworks();
    if (!hasRecorded) {
      const patternDesc = `${t.claimManualVerifiedDesc} (${getGameModeLabel(activeMode, lang)})`;

      onRecordWin(currentWinnerName, activeMode, drawnBalls.length, patternDesc);
      setHasRecorded(true);
    }
    setStep('result_ok');
  };

  // Host manual verification: MAL (Red)
  const handleConfirmMal = () => {
    playSound('error', soundEnabled);
    setStep('result_mal');
  };

  const handleClose = () => {
    setStep('input');
    setHasRecorded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className={`bg-white rounded-3xl w-full p-4 sm:p-6 shadow-2xl border-4 border-amber-300 relative space-y-4 max-h-[94vh] overflow-y-auto ${
          step === 'verify' ? 'max-w-3xl' : 'max-w-lg'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Enter Winner Name & Choose Mode */}
        {step === 'input' && (
          <div className="space-y-4">
            {/* Modal Header */}
            <div className="text-center pt-1">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 text-3xl mb-2 animate-bounce">
                🎉
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
                {t.claimModalTitle}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {t.claimStep1Subtitle}
              </p>
            </div>

            {/* Game Mode Selector */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <span>🎯</span> {t.claimGameModeLabel}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['line_row', 'line_col', 'full_card'] as GameMode[]).map((mode) => {
                  const info = GAME_MODE_LABELS[mode];
                  const modeText = getGameModeLabel(mode, lang);
                  const isCurrent = activeMode === mode;

                  return (
                    <button
                      key={mode}
                      onClick={() => {
                        onModeChange(mode);
                        playSound('click', soundEnabled);
                      }}
                      className={`py-2 px-2 rounded-xl text-center font-extrabold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        isCurrent
                          ? 'bg-amber-500 text-white shadow-xs scale-[1.02]'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm">{info.emoji}</span>
                      <span className="leading-tight">{modeText}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 text-center font-semibold pt-0.5">
                {activeMode === 'full_card'
                  ? t.modeFullCardDesc
                  : activeMode === 'line_row'
                  ? t.modeLineRowDesc
                  : t.modeLineColDesc}
              </p>
            </div>

            {/* Winner Name Input - Clean, direct, NO card selection */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-300 space-y-2">
              <label className="text-xs font-black text-slate-900 font-['Fredoka'] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{t.claimWinnerNameLabel}</span>
                </span>
                <span className="text-[10px] text-amber-800 font-bold">
                  {t.claimRecordedBadge}
                </span>
              </label>

              <input
                type="text"
                id="claim-player-name-input"
                autoFocus
                value={typedPlayerName}
                onChange={(e) => setTypedPlayerName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setStep('verify');
                    playSound('click', soundEnabled);
                  }
                }}
                placeholder={t.claimWinnerNamePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-amber-400 font-bold text-slate-900 text-base focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-200 shadow-xs"
              />
              <p className="text-[11px] text-slate-500 font-semibold">
                {t.claimHostGuideText}
              </p>
            </div>

            {/* Button to show Master Board and manually verify */}
            <button
              id="modal-verify-bingo-btn"
              onClick={() => {
                setStep('verify');
                playSound('click', soundEnabled);
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-lg shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2.5 transition-transform transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer border-b-4 border-rose-700"
            >
              <Sparkles className="w-6 h-6" />
              <span>{t.claimVerifyBtn}</span>
            </button>

            {/* Footer close */}
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              {t.claimCloseBtn}
            </button>
          </div>
        )}

        {/* STEP 2: Show Master Board & Host Manual Verification (OK / MAL) */}
        {step === 'verify' && (
          <div className="space-y-4">
            {/* Top Navigation & Winner candidate display */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setStep('input')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.claimBackToEdit}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {t.claimReviewingWinner}:
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-black text-sm border border-amber-300">
                  👑 {currentWinnerName}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-200">
                  {getGameModeLabel(activeMode, lang)}
                </span>
              </div>
            </div>

            {/* Host guidance banner */}
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎲</span>
                <div>
                  <h4 className="text-xs font-black text-amber-950 font-['Fredoka']">
                    {t.claimHostVerifyGuide}
                  </h4>
                  <p className="text-[11px] text-amber-800 font-semibold">
                    {t.claimHostCheckNumbersText}
                  </p>
                </div>
              </div>

              {/* Quick number check search */}
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    max="75"
                    placeholder={t.claimSearchHint}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 pr-2 py-1 text-xs font-bold rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 w-36"
                  />
                </div>
                {isSearchValid && (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${
                      drawnMap.has(searchNum)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {drawnMap.has(searchNum)
                      ? `${t.claimSearchDrawnBadge} (#${drawnMap.get(searchNum)})`
                      : t.claimSearchNotDrawnBadge}
                  </span>
                )}
              </div>
            </div>

            {/* The Master Board (All 75 numbers categorized by letter) */}
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200 space-y-2 max-h-[38vh] overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                <span>{t.masterBoardTitle}</span>
                <span className="font-extrabold text-amber-700">
                  {drawnBalls.length} / 75 {t.claimBallsDrawnOutOf}
                </span>
              </div>

              <div className="space-y-2 overflow-x-auto pb-1">
                {letters.map((letter) => {
                  const range = LETTER_RANGES[letter];
                  const numbers: number[] = [];
                  for (let n = range.min; n <= range.max; n++) numbers.push(n);

                  return (
                    <div key={letter} className="flex items-center gap-1.5 min-w-[540px]">
                      {/* Letter badge */}
                      <div
                        className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm text-white shadow-xs font-['Fredoka']"
                        style={{ backgroundColor: range.color }}
                      >
                        {letter}
                      </div>

                      {/* Number row */}
                      <div className="flex-1 grid grid-cols-15 gap-1">
                        {numbers.map((num) => {
                          const isDrawn = drawnMap.has(num);
                          const isHighlighted = isSearchValid && searchNum === num;
                          const { title: nickname, emoji } = getNumberNickname(num, lang);

                          return (
                            <div
                              key={num}
                              title={`${letter}-${num}${nickname ? `: ${emoji} ${nickname}` : ''}${
                                isDrawn
                                  ? ` (${t.masterBoardOrderDrawn}${drawnMap.get(num)})`
                                  : ` (${t.masterBoardNotYetDrawn})`
                              }`}
                              className={`relative aspect-square rounded-lg flex flex-col items-center justify-center font-black text-xs transition-all select-none ${
                                isDrawn
                                  ? 'text-white shadow-xs transform scale-100 font-black'
                                  : 'bg-white text-slate-400 border border-slate-200'
                              } ${
                                isHighlighted
                                  ? 'ring-3 ring-amber-400 ring-offset-1 scale-110 z-10'
                                  : ''
                              }`}
                              style={{
                                backgroundColor: isDrawn ? range.color : undefined,
                              }}
                            >
                              <span>{num}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manual Verification Actions: OK (Green) and MAL (Red) as requested */}
            <div className="pt-1 space-y-2">
              <div className="text-center text-xs font-bold text-slate-600">
                {t.claimMatchesBoardQuestion}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* OK Button (Green) */}
                <button
                  id="claim-verify-ok-btn"
                  onClick={handleConfirmOk}
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-transform transform hover:scale-[1.02] active:scale-[0.98] border-b-4 border-emerald-800"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.claimManualVerifyOkBtn}</span>
                </button>

                {/* MAL Button (Red) */}
                <button
                  id="claim-verify-fail-btn"
                  onClick={handleConfirmMal}
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer transition-transform transform hover:scale-[1.02] active:scale-[0.98] border-b-4 border-rose-800"
                >
                  <XCircle className="w-5 h-5" />
                  <span>{t.claimManualVerifyFailBtn}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3A: RESULT OK (Fuegos artificiales, Scoreboard & Celebración) */}
        {step === 'result_ok' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-50 border-3 border-emerald-400 text-emerald-950 shadow-md text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-9 h-9 text-amber-500 animate-bounce" />
              <span className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-emerald-800">
                {t.claimValidWinTitle}
              </span>
            </div>

            <div className="bg-white/95 rounded-2xl p-4 border border-emerald-300 text-lg font-black text-emerald-900 shadow-xs">
              👑 {t.claimCongrats} {currentWinnerName}!
              <div className="text-xs font-bold text-emerald-700 mt-1">
                {getGameModeLabel(activeMode, lang)} •{' '}
                {t.claimAchievedWithBalls.replace('{0}', String(drawnBalls.length))}
              </div>
            </div>

            <p className="text-xs font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.claimRegisteredNotice}</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={launchFireworks}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <PartyPopper className="w-4 h-4" />
                <span>{t.claimMoreFireworksBtn}</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                {t.claimCloseBtn}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3B: RESULT MAL (Bingo incorrecto, feedback y seguir jugando) */}
        {step === 'result_mal' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-3xl bg-amber-50 border-3 border-amber-300 text-amber-950 text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-8 h-8 text-rose-500" />
              <span className="text-xl sm:text-2xl font-black font-['Fredoka'] text-amber-900">
                {t.claimIncorrectTitle}
              </span>
            </div>

            <p className="text-xs font-semibold text-amber-900 leading-relaxed max-w-md mx-auto">
              {t.claimIncorrectDesc}
            </p>

            <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2">
              <Dices className="w-4 h-4 text-amber-600" />
              <span>
                {t.claimNoVictoryRecordedNotice}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setStep('verify')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs border border-slate-300 shadow-xs cursor-pointer"
              >
                {t.claimCheckAgainBtn}
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
              >
                {t.claimContinueSpinningBtn}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
