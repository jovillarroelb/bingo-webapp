import React from 'react';
import {
  X,
  BookOpen,
  Keyboard,
  Printer,
  Dices,
  Target,
  Trophy,
  PartyPopper,
  Sparkles,
  FileDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title={lang === 'es' ? 'Cerrar instrucciones' : 'Close instructions'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-2xl shadow-md">
            📖
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
              {t.instructionsModalTitle}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              {t.instructionsModalSubtitle}
            </p>
          </div>
        </div>

        {/* Section: Atajos de Teclado (Importante) */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl text-white shadow-md space-y-2">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Keyboard className="w-4 h-4 text-yellow-200" />
            <span>{t.instructionsShortcutsTitle}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            <div className="bg-white/20 backdrop-blur-xs p-2.5 rounded-xl flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-md bg-white text-slate-900 font-mono text-xs shadow-xs font-black">
                {t.spaceKeyHint}
              </kbd>
              <span>{t.instructionsShortcutSpace}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xs p-2.5 rounded-xl flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-md bg-white text-slate-900 font-mono text-xs shadow-xs font-black">
                {t.enterKeyHint}
              </kbd>
              <span>{t.instructionsShortcutEnter}</span>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-700">
          {/* Step 1: Imprimir Cartones en PDF */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <FileDown className="w-4 h-4 text-amber-600" />
              <span>{t.instructionsStep1Title}</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              {t.instructionsStep1Desc}
            </p>
          </div>

          {/* Step 2: La Ruleta y el Bombo 3D */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <Dices className="w-4 h-4 text-blue-600" />
              <span>{t.instructionsStep2Title}</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              {t.instructionsStep2Desc}
            </p>
          </div>

          {/* Step 3: Las 3 Modalidades de Juego */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <Target className="w-4 h-4 text-purple-600" />
              <span>{t.instructionsStep3Title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>↔️</span> {t.modeLineRow}
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  {lang === 'es'
                    ? 'Completar 5 números seguidos de izquierda a derecha. Ideal para partidas rápidas.'
                    : 'Complete 5 consecutive numbers horizontally. Great for quick games.'}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>↕️</span> {t.modeLineCol}
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  {lang === 'es'
                    ? 'Completar 5 números seguidos de arriba a abajo.'
                    : 'Complete 5 consecutive numbers vertically.'}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>🏆</span> {t.modeFullCard}
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  {lang === 'es'
                    ? 'Completar las 25 casillas (Bingo clásico). El premio mayor de la jornada.'
                    : 'Complete all 25 numbers on the card. The grand prize round.'}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Cantar Bingo y Verificar */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                4
              </span>
              <Trophy className="w-4 h-4 text-rose-600" />
              <span>{t.instructionsStep4Title}</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              {t.instructionsStep4Desc}
            </p>
          </div>

          {/* Step 5: Scoreboard por Sesión */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                5
              </span>
              <PartyPopper className="w-4 h-4 text-emerald-600" />
              <span>{t.instructionsStep5Title}</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              {t.instructionsStep5Desc}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all cursor-pointer"
          >
            {t.instructionsCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
