import React, { useState } from 'react';
import { PlayerBingoCard, BingoLetter, DrawnBall, GameMode } from '../types';
import { LETTER_RANGES, checkCardStatus } from '../utils/bingoData';
import { playSound } from '../utils/audio';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DigitalCardsProps {
  cards: PlayerBingoCard[];
  drawnBalls: DrawnBall[];
  soundEnabled: boolean;
  activeMode: GameMode;
  onOpenVerifier: () => void;
}

const STICKERS = ['⭐', '🦁', '🎈', '🍓', '🚀', '🦖', '🦄', '❤️'];

export const DigitalCards: React.FC<DigitalCardsProps> = ({
  cards,
  drawnBalls,
  soundEnabled,
  activeMode,
  onOpenVerifier,
}) => {
  const { t, lang } = useLanguage();
  const [selectedSticker, setSelectedSticker] = useState('⭐');
  const [markedMap, setMarkedMap] = useState<Record<string, Record<string, string>>>({});
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];
  const drawnSet = new Set(drawnBalls.map((b) => b.number));

  const toggleMark = (cardId: string, cellVal: number | 'FREE') => {
    if (cellVal === 'FREE') return;

    // Check if the number has actually been drawn
    if (!drawnSet.has(cellVal)) {
      playSound('error', soundEnabled);
      const msg =
        lang === 'es'
          ? `¡El número ${cellVal} aún no sale del bombo!`
          : lang === 'it'
          ? `Il numero ${cellVal} non è ancora uscito dalla gabbia!`
          : `Number ${cellVal} has not been drawn yet!`;
      setWarningMessage(msg);
      setTimeout(() => setWarningMessage(null), 3000);
      return;
    }

    playSound('pop', soundEnabled);
    setMarkedMap((prev) => {
      const cardMarks = { ...(prev[cardId] || {}) };
      const key = String(cellVal);
      if (cardMarks[key]) {
        delete cardMarks[key];
      } else {
        cardMarks[key] = selectedSticker;
      }
      return { ...prev, [cardId]: cardMarks };
    });
  };

  return (
    <div className="space-y-6">
      {/* Top sticker selector and advice */}
      <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
            <span>📱</span> {t.digitalTitle}
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            {t.digitalSubtitle}
          </p>
        </div>

        {/* Sticker picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">{t.digitalChooseToken}:</span>
          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-2xl border border-amber-200">
            {STICKERS.map((stk) => (
              <button
                key={stk}
                onClick={() => {
                  setSelectedSticker(stk);
                  playSound('click', soundEnabled);
                }}
                className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer ${
                  selectedSticker === stk
                    ? 'bg-amber-400 scale-110 shadow-xs'
                    : 'hover:bg-amber-200/60'
                }`}
              >
                {stk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Warning message notification */}
      {warningMessage && (
        <div className="p-3 bg-rose-100 border-2 border-rose-300 text-rose-800 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {warningMessage}
          </span>
          <button
            onClick={() => setWarningMessage(null)}
            className="text-rose-600 hover:text-rose-900 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const cardMarks = markedMap[card.id] || {};
          const drawnList = drawnBalls.map((b) => b.number);
          const check = checkCardStatus(card, drawnList, activeMode);

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-md space-y-4 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦁</span>
                  <div>
                    <div className="text-base font-black text-slate-900 font-['Fredoka'] leading-none">
                      {card.playerName}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 mt-0.5">
                      {lang === 'es' ? `Cartón #${card.cardIndex}` : lang === 'it' ? `Cartella #${card.cardIndex}` : `Card #${card.cardIndex}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {check.isWin && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                      ¡BINGO!
                    </span>
                  )}
                  {check.completedLines > 0 && !check.isBingo && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-white">
                      {check.completedLines}{' '}
                      {check.completedLines === 1
                        ? lang === 'es'
                          ? 'Línea'
                          : lang === 'it'
                          ? 'Riga'
                          : 'Line'
                        : lang === 'es'
                        ? 'Líneas'
                        : lang === 'it'
                        ? 'Righe'
                        : 'Lines'}
                    </span>
                  )}
                  <button
                    onClick={onOpenVerifier}
                    className="px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
                  >
                    {t.verifyWinnerBtn}
                  </button>
                </div>
              </div>

              {/* 5x5 Grid */}
              <div className="w-full">
                {/* Letters Header */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {letters.map((lettr) => {
                    const range = LETTER_RANGES[lettr];
                    return (
                      <div
                        key={lettr}
                        className="py-1.5 rounded-xl font-black text-base text-center font-['Fredoka'] text-white shadow-xs"
                        style={{ backgroundColor: range.color }}
                      >
                        {lettr}
                      </div>
                    );
                  })}
                </div>

                {/* Rows */}
                <div className="grid grid-rows-5 gap-2">
                  {[0, 1, 2, 3, 4].map((rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-2">
                      {letters.map((colLetter) => {
                        const cellVal = card.grid[colLetter][rowIndex];
                        const isFree = cellVal === 'FREE';
                        const isMarked = isFree || Boolean(cardMarks[String(cellVal)]);
                        const stickerIcon = isFree ? '⭐' : cardMarks[String(cellVal)];

                        return (
                          <button
                            key={colLetter}
                            onClick={() => toggleMark(card.id, cellVal)}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-lg transition-all transform active:scale-95 cursor-pointer relative select-none ${
                              isMarked
                                ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-900 shadow-xs'
                                : 'bg-slate-50 border-2 border-slate-200 text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            {isFree ? (
                              <div className="flex flex-col items-center justify-center leading-none">
                                <span className="text-xl">⭐</span>
                                <span className="text-[8px] font-black uppercase text-amber-700">
                                  {t.freeSpaceLabel}
                                </span>
                              </div>
                            ) : (
                              <>
                                <span>{cellVal}</span>
                                {isMarked && (
                                  <span className="absolute -top-1.5 -right-1.5 text-sm filter drop-shadow-xs">
                                    {stickerIcon}
                                  </span>
                                )}
                              </>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
