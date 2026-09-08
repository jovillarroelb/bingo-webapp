import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { BingoLetter, DrawnBall } from '../types';
import { LETTER_RANGES, NUMBER_NICKNAMES } from '../utils/bingoData';

interface MasterBoardProps {
  drawnBalls: DrawnBall[];
}

export const MasterBoard: React.FC<MasterBoardProps> = ({ drawnBalls }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Map of drawn numbers with extraction index
  const drawnMap = new Map<number, number>();
  drawnBalls.forEach((b, idx) => {
    drawnMap.set(b.number, idx + 1);
  });

  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];

  const searchNum = parseInt(searchQuery.trim(), 10);
  const isSearchValid = !isNaN(searchNum) && searchNum >= 1 && searchNum <= 75;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-5">
      {/* Header and Quick Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-['Fredoka'] flex items-center gap-2">
            <span>📋</span> Tablero Maestro de Control (1 a 75)
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            Revisa de un vistazo todos los números que ya han salido del bombo
          </p>
        </div>

        {/* Quick query finder */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              min="1"
              max="75"
              placeholder="¿Salió el número...?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 w-44"
            />
          </div>

          {isSearchValid && (
            <div
              className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                drawnMap.has(searchNum)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {drawnMap.has(searchNum) ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>¡Ya salió! (Bola #{drawnMap.get(searchNum)})</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Aún en el bombo</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Column stats */}
      <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
        {letters.map((letter) => {
          const range = LETTER_RANGES[letter];
          let drawnInCol = 0;
          for (let n = range.min; n <= range.max; n++) {
            if (drawnMap.has(n)) drawnInCol++;
          }

          return (
            <div
              key={letter}
              className="py-1 px-2 rounded-xl flex flex-col items-center justify-center"
              style={{ backgroundColor: range.bgLight }}
            >
              <span className="font-extrabold text-sm" style={{ color: range.color }}>
                {letter}
              </span>
              <span className="text-[11px] text-slate-600">
                {drawnInCol} / 15
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid of 5 letter rows */}
      <div className="space-y-3 overflow-x-auto pb-2">
        {letters.map((letter) => {
          const range = LETTER_RANGES[letter];
          const numbers: number[] = [];
          for (let n = range.min; n <= range.max; n++) numbers.push(n);

          return (
            <div key={letter} className="flex items-center gap-2 min-w-[620px]">
              {/* Row Header Letter */}
              <div
                className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl text-white shadow-sm font-['Fredoka']"
                style={{ backgroundColor: range.color }}
              >
                {letter}
              </div>

              {/* Number cells */}
              <div className="flex-1 grid grid-cols-15 gap-1.5">
                {numbers.map((num) => {
                  const isDrawn = drawnMap.has(num);
                  const isHighlighted = isSearchValid && searchNum === num;
                  const nickname = NUMBER_NICKNAMES[num]?.title;
                  const emoji = NUMBER_NICKNAMES[num]?.emoji;

                  return (
                    <div
                      key={num}
                      title={`${letter}-${num}${nickname ? `: ${emoji} ${nickname}` : ''}${
                        isDrawn ? ` (Extraída en orden #${drawnMap.get(num)})` : ' (No extraída)'
                      }`}
                      className={`relative aspect-square rounded-xl flex flex-col items-center justify-center font-black text-xs sm:text-sm transition-all select-none ${
                        isDrawn
                          ? 'text-white shadow-sm transform scale-100 hover:scale-110'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      } ${
                        isHighlighted
                          ? 'ring-4 ring-amber-400 ring-offset-2 scale-110 z-10'
                          : ''
                      }`}
                      style={{
                        backgroundColor: isDrawn ? range.color : undefined,
                      }}
                    >
                      <span>{num}</span>
                      {isDrawn && (
                        <span className="text-[9px] opacity-75 font-normal -mt-0.5">
                          #{drawnMap.get(num)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
