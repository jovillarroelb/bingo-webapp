import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trophy,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  PartyPopper,
  Crown,
  ChevronRight,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerBingoCard, DrawnBall, GameMode } from '../types';
import { checkCardStatus, LETTER_RANGES, CardCheckResult } from '../utils/bingoData';
import { GAME_MODE_LABELS } from '../utils/scoreboard';
import { playSound } from '../utils/audio';

interface BingoClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: PlayerBingoCard[];
  drawnBalls: DrawnBall[];
  activeMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onRecordWin: (playerName: string, mode: GameMode, ballsCount: number, pattern?: string) => void;
  soundEnabled: boolean;
}

export const BingoClaimModal: React.FC<BingoClaimModalProps> = ({
  isOpen,
  onClose,
  cards,
  drawnBalls,
  activeMode,
  onModeChange,
  onRecordWin,
  soundEnabled,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');
  const [verificationResult, setVerificationResult] = useState<CardCheckResult | null>(null);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];
  const drawnNumbers = drawnBalls.map((b) => b.number);
  const letters = ['B', 'I', 'N', 'G', 'O'] as const;

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

      // Multiple fireworks bursts across screen
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

  // Perform Verification
  const handleVerify = () => {
    if (!selectedCard) return;

    const result = checkCardStatus(selectedCard, drawnNumbers, activeMode);
    setVerificationResult(result);

    if (result.isWin) {
      launchFireworks();
      if (!hasRecorded) {
        onRecordWin(
          selectedCard.playerName,
          activeMode,
          drawnBalls.length,
          result.winningPatternDescription
        );
        setHasRecorded(true);
      }
    } else {
      playSound('error', soundEnabled);
    }
  };

  const handleResetModal = () => {
    setVerificationResult(null);
    setHasRecorded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-amber-300 relative space-y-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-1">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 text-3xl mb-2 animate-bounce">
            🎉
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-['Fredoka']">
            ¡Alguien gritó BINGO!
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Selecciona quién cantó y verificaremos su cartón al instante
          </p>
        </div>

        {/* 1. Game Mode Selector */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <span>🎯</span> Modalidad de Juego a comprobar:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {(['line_row', 'line_col', 'full_card'] as GameMode[]).map((mode) => {
              const info = GAME_MODE_LABELS[mode];
              const isCurrent = activeMode === mode;

              return (
                <button
                  key={mode}
                  onClick={() => {
                    onModeChange(mode);
                    setVerificationResult(null);
                    setHasRecorded(false);
                    playSound('click', soundEnabled);
                  }}
                  className={`py-2 px-2 rounded-xl text-center font-extrabold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isCurrent
                      ? 'bg-amber-500 text-white shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{info.emoji}</span>
                  <span className="leading-tight">{info.short}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500 text-center font-semibold pt-0.5">
            {GAME_MODE_LABELS[activeMode].desc}
          </p>
        </div>

        {/* 2. Player selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>¿Quién cantó Bingo?:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cards.map((card) => {
              const isSelected = selectedCard?.id === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setSelectedCardId(card.id);
                    setVerificationResult(null);
                    setHasRecorded(false);
                    playSound('click', soundEnabled);
                  }}
                  className={`p-2 rounded-xl text-left font-extrabold text-xs transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="truncate font-black">{card.playerName}</div>
                  <div className="text-[10px] font-bold text-slate-400">Cartón #{card.cardIndex}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Primary Verify Button */}
        {!verificationResult && (
          <button
            onClick={handleVerify}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-lg shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-transform transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer border-b-4 border-rose-700"
          >
            <Sparkles className="w-5 h-5" />
            <span>¡VERIFICAR SI ES BINGO!</span>
          </button>
        )}

        {/* 4. Verification Result Display with Fiesta & Fireworks */}
        <AnimatePresence>
          {verificationResult && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={`p-4 sm:p-5 rounded-2xl border-3 text-center space-y-3 ${
                verificationResult.isWin
                  ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 shadow-md'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              {verificationResult.isWin ? (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-8 h-8 text-amber-500 animate-bounce" />
                    <span className="text-2xl font-black font-['Fredoka'] text-emerald-800">
                      ¡¡SÍIII, ES BINGO VÁLIDO!! 🏆
                    </span>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2.5 border border-emerald-300 text-sm font-black text-emerald-900">
                    👑 ¡Felicidades, {selectedCard.playerName}!
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">
                      {verificationResult.winningPatternDescription} • Logrado con{' '}
                      {drawnBalls.length} bolas
                    </div>
                  </div>

                  <p className="text-xs font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Guardado automáticamente en el Scoreboard Histórico!</span>
                  </p>

                  <button
                    onClick={launchFireworks}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <PartyPopper className="w-4 h-4" />
                    <span>¡Lanzar más fuegos artificiales!</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                    <span className="text-lg font-black font-['Fredoka'] text-amber-900">
                      ¡Aún no es Bingo! Falta un poquito
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                    Para ganar en la modalidad{' '}
                    <strong>{GAME_MODE_LABELS[activeMode].label}</strong>,{' '}
                    {selectedCard.playerName} lleva acertadas{' '}
                    <strong className="text-slate-900">
                      {verificationResult.totalMarkedCount} de 25 casillas
                    </strong>
                    .
                  </p>

                  <div className="bg-white/80 p-2 rounded-xl border border-amber-200 text-[11px] font-bold text-slate-600">
                    💡 ¡Ánimo! Sigan girando el bombo para sacar más bolitas.
                  </div>

                  <button
                    onClick={() => setVerificationResult(null)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 text-white font-extrabold text-xs cursor-pointer"
                  >
                    Probar con otro jugador
                  </button>
                </>
              )}

              {/* Visual mini-matrix preview */}
              <div className="pt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 mb-1">
                  Revisión visual de casillas de {selectedCard.playerName}:
                </div>
                <div className="grid grid-cols-5 gap-1 max-w-[200px] mx-auto">
                  {letters.map((l) => (
                    <div
                      key={l}
                      className="text-[9px] font-black text-white rounded-sm py-0.5"
                      style={{ backgroundColor: LETTER_RANGES[l].color }}
                    >
                      {l}
                    </div>
                  ))}

                  {[0, 1, 2, 3, 4].map((r) =>
                    letters.map((c, cIdx) => {
                      const val = selectedCard.grid[c][r];
                      const isFree = val === 'FREE';
                      const isHit = isFree || (typeof val === 'number' && drawnNumbers.includes(val));

                      return (
                        <div
                          key={`${c}-${r}`}
                          className={`aspect-square text-[10px] font-black rounded-sm flex items-center justify-center select-none ${
                            isHit
                              ? 'bg-emerald-500 text-white font-black'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isFree ? '⭐' : val}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer close */}
        <div className="pt-2">
          <button
            onClick={handleResetModal}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
          >
            Cerrar y seguir jugando
          </button>
        </div>
      </motion.div>
    </div>
  );
};
