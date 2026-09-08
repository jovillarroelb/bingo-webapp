import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Sparkles, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerBingoCard, DrawnBall, BingoLetter } from '../types';
import { checkCardStatus, LETTER_RANGES } from '../utils/bingoData';
import { playSound } from '../utils/audio';

interface CardVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: PlayerBingoCard[];
  drawnBalls: DrawnBall[];
  soundEnabled: boolean;
}

export const CardVerifierModal: React.FC<CardVerifierModalProps> = ({
  isOpen,
  onClose,
  cards,
  drawnBalls,
  soundEnabled,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');

  if (!isOpen) return null;

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];
  const drawnNumbers = drawnBalls.map((b) => b.number);
  const result = selectedCard ? checkCardStatus(selectedCard, drawnNumbers) : null;
  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];

  const handleCelebrateWin = () => {
    playSound('fanfare', soundEnabled);
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#EF4444', '#F97316', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-amber-300 relative space-y-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center pt-2">
          <div className="text-3xl mb-1">🎉</div>
          <h3 className="text-2xl font-black text-slate-900 font-['Fredoka']">
            ¡Comprobar Cartón Cantado!
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            Verifica al instante si el niño completó Línea o ¡BINGO!
          </p>
        </div>

        {/* Card selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            ¿Quién cantó victoria?:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  setSelectedCardId(card.id);
                  playSound('click', soundEnabled);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex-shrink-0 cursor-pointer transition-all ${
                  selectedCard?.id === card.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {card.playerName}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Status Banner */}
        {result && (
          <div
            className={`p-4 rounded-2xl border-2 text-center space-y-2 ${
              result.isBingo
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                : result.completedLines > 0
                ? 'bg-blue-50 border-blue-400 text-blue-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {result.isBingo ? (
                <>
                  <Trophy className="w-6 h-6 text-emerald-600 animate-bounce" />
                  <span className="text-xl font-black font-['Fredoka']">
                    ¡¡SIII, ES BINGO VERDADERO!! 🏆
                  </span>
                </>
              ) : result.completedLines > 0 ? (
                <>
                  <Star className="w-6 h-6 text-blue-600 fill-blue-600 animate-spin" />
                  <span className="text-xl font-black font-['Fredoka']">
                    ¡¡LÍNEA CONSEGUIDA!! ⭐ ({result.completedLines}{' '}
                    {result.completedLines === 1 ? 'línea' : 'líneas'})
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-base font-extrabold font-['Fredoka']">
                    ¡Casi casi! Aún falta un poquito
                  </span>
                </>
              )}
            </div>

            <p className="text-xs font-semibold">
              {result.isBingo
                ? `¡Felicidades a ${selectedCard?.playerName}! ¡Ha completado todas las 25 casillas!`
                : result.completedLines > 0
                ? `¡Genial! Ya tiene ${result.completedLines} línea(s) completa(s). ¡Faltan ${result.unmarkedCount} números para el BINGO total!`
                : `Lleva ${result.totalMarkedCount} de 25 números acertados. ¡Sigan atentos al bombo!`}
            </p>

            {(result.isBingo || result.completedLines > 0) && (
              <button
                onClick={handleCelebrateWin}
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>¡Lanzar más confeti y música!</span>
              </button>
            )}
          </div>
        )}

        {/* Visual Card preview with hits */}
        {selectedCard && (
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
              <span>Casillas acertadas de {selectedCard.playerName}:</span>
              <span className="text-emerald-700 font-extrabold">
                {result?.totalMarkedCount || 0} / 25
              </span>
            </div>

            {/* 5x5 preview */}
            <div className="grid grid-cols-5 gap-1 text-center font-bold text-xs">
              {letters.map((l) => (
                <div
                  key={l}
                  className="py-1 rounded-lg text-white font-extrabold text-xs"
                  style={{ backgroundColor: LETTER_RANGES[l].color }}
                >
                  {l}
                </div>
              ))}

              {[0, 1, 2, 3, 4].map((row) =>
                letters.map((col) => {
                  const val = selectedCard.grid[col][row];
                  const isFree = val === 'FREE';
                  const isHit = isFree || (typeof val === 'number' && drawnNumbers.includes(val));

                  return (
                    <div
                      key={`${col}-${row}`}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-extrabold select-none transition-all ${
                        isHit
                          ? 'bg-emerald-500 text-white shadow-xs scale-95'
                          : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isFree ? '⭐' : val}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-sm hover:bg-slate-800 transition-all cursor-pointer"
          >
            Continuar jugando
          </button>
        </div>
      </motion.div>
    </div>
  );
};
