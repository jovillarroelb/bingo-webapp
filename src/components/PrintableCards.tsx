import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  RefreshCw,
  Users,
  Scissors,
  Sparkles,
  Palette,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Copy,
  Layers,
} from 'lucide-react';
import { PlayerBingoCard, BingoLetter, CardsPerPage, InkMode } from '../types';
import { LETTER_RANGES } from '../utils/bingoData';
import { playSound } from '../utils/audio';
import { generateBingoPdf } from '../utils/pdfGenerator';
import {
  generateCardsForParticipants,
  DEFAULT_PARTICIPANTS,
} from '../utils/participants';

interface PrintableCardsProps {
  cards: PlayerBingoCard[];
  onUpdateCards: (newCards: PlayerBingoCard[]) => void;
  participants: string[];
  onUpdateParticipants: (newParticipants: string[]) => void;
  cardsPerParticipant: number;
  onUpdateCardsPerParticipant: (count: number) => void;
  soundEnabled: boolean;
}

export const PrintableCards: React.FC<PrintableCardsProps> = ({
  cards,
  onUpdateCards,
  participants,
  onUpdateParticipants,
  cardsPerParticipant,
  onUpdateCardsPerParticipant,
  soundEnabled,
}) => {
  const [cardsPerPage, setCardsPerPage] = useState<CardsPerPage>(2);
  const [inkMode, setInkMode] = useState<InkMode>('color');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];

  // Regenerate cards keeping participants & cardsPerParticipant
  const handleRegenerate = () => {
    playSound('pop', soundEnabled);
    const newCards = generateCardsForParticipants(participants, cardsPerParticipant);
    onUpdateCards(newCards);
  };

  // Change cards per participant
  const handleCardsPerParticipantChange = (count: number) => {
    playSound('click', soundEnabled);
    onUpdateCardsPerParticipant(count);
    const newCards = generateCardsForParticipants(participants, count);
    onUpdateCards(newCards);
  };

  // Update specific participant name
  const handleUpdateParticipantName = (index: number, newName: string) => {
    const updated = [...participants];
    updated[index] = newName;
    onUpdateParticipants(updated);
    const newCards = generateCardsForParticipants(updated, cardsPerParticipant);
    onUpdateCards(newCards);
  };

  // Add a new participant
  const handleAddParticipant = () => {
    playSound('pop', soundEnabled);
    const newName = `Jugador ${participants.length + 1}`;
    const updated = [...participants, newName];
    onUpdateParticipants(updated);
    const newCards = generateCardsForParticipants(updated, cardsPerParticipant);
    onUpdateCards(newCards);
  };

  // Remove a participant
  const handleRemoveParticipant = (index: number) => {
    if (participants.length <= 1) return;
    playSound('pop', soundEnabled);
    const updated = participants.filter((_, i) => i !== index);
    onUpdateParticipants(updated);
    const newCards = generateCardsForParticipants(updated, cardsPerParticipant);
    onUpdateCards(newCards);
  };

  // Reset to default family participants
  const handleResetParticipants = () => {
    playSound('pop', soundEnabled);
    onUpdateParticipants(DEFAULT_PARTICIPANTS);
    const newCards = generateCardsForParticipants(DEFAULT_PARTICIPANTS, cardsPerParticipant);
    onUpdateCards(newCards);
  };

  // Generate and download PDF
  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    playSound('pop', soundEnabled);

    try {
      setTimeout(() => {
        const doc = generateBingoPdf({
          cards,
          cardsPerPage,
          inkMode,
        });

        const fileName = `Cartones_Bingo_Familiar_${cards.length}_cartones.pdf`;
        doc.save(fileName);

        setIsGeneratingPdf(false);
        setPdfSuccessMessage(`¡PDF generado con éxito! Archivo: "${fileName}"`);
        playSound('fanfare', soundEnabled);

        setTimeout(() => setPdfSuccessMessage(null), 5000);
      }, 150);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setIsGeneratingPdf(false);
      alert('Hubo un problema generando el PDF. Intentando imprimir directamente...');
      window.print();
    }
  };

  const handleNativePrint = () => {
    playSound('pop', soundEnabled);
    window.print();
  };

  // Group cards into pages for preview
  const pages: PlayerBingoCard[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  const totalCards = cards.length;

  return (
    <div id="printable-cards-section" className="space-y-6">
      {/* Top Configuration & Print Header (Hidden during actual print) */}
      <div className="print:hidden bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
              <span>📄</span> Generador de Cartones PDF e Imprimibles
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Configura cuántos cartones recibe cada niño, descarga tu <strong>archivo PDF listo para imprimir</strong> en alta calidad o imprime directo.
            </p>
          </div>

          {/* Action Buttons: PDF Generator and Browser Print */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Primary PDF button */}
            <button
              id="generate-pdf-btn"
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] border-b-4 border-rose-700 disabled:opacity-75"
            >
              <FileDown className={`w-5 h-5 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
              <span>{isGeneratingPdf ? 'Generando PDF...' : 'DESCARGAR PDF DE CARTONES'}</span>
            </button>

            {/* Direct Browser Print button */}
            <button
              id="print-direct-btn"
              onClick={handleNativePrint}
              className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
              title="Imprimir directamente en tu impresora"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Imprimir directo</span>
            </button>
          </div>
        </div>

        {/* Success notification banner */}
        {pdfSuccessMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{pdfSuccessMessage}</span>
          </div>
        )}

        {/* Section 1: Participant Management & Persistence */}
        <div className="bg-amber-50/70 p-4 sm:p-5 rounded-2xl border-2 border-amber-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-sm font-black text-slate-900 font-['Fredoka'] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Nombres de los Participantes (Guardados de la última sesión):</span>
              </span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Los cambios se guardan automáticamente en este navegador para futuras partidas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddParticipant}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Jugador</span>
              </button>

              <button
                onClick={handleResetParticipants}
                className="px-2.5 py-1.5 rounded-xl text-amber-800 hover:bg-amber-200/60 font-bold text-xs transition-colors cursor-pointer"
                title="Restaurar nombres originales de la familia"
              >
                Restaurar
              </button>
            </div>
          </div>

          {/* Participant input tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {participants.map((name, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-amber-300 shadow-xs group focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200"
              >
                <span className="text-xs font-black text-amber-600 w-5 text-center">
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleUpdateParticipantName(idx, e.target.value)}
                  placeholder={`Jugador #${idx + 1}`}
                  className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden"
                />
                {participants.length > 1 && (
                  <button
                    onClick={() => handleRemoveParticipant(idx)}
                    className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                    title="Eliminar jugador"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Cards per participant and sheet format options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
          {/* Cartones por Participante Selector */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-500" />
                <span>Cartones por jugador:</span>
              </label>
              <span className="text-[10px] font-black text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-md">
                {cardsPerParticipant} c/u
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleCardsPerParticipantChange(num)}
                  className={`py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    cardsPerParticipant === num
                      ? 'bg-rose-500 text-white shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num} {num === 1 ? 'cartón' : 'cartones'}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 font-semibold leading-tight pt-0.5">
              Total: <strong>{totalCards} cartones</strong> ({participants.length} jugadores × {cardsPerParticipant})
            </p>
          </div>

          {/* Cards per sheet */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Cartones por hoja:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCardsPerPage(2)}
                className={`py-1.5 px-2 rounded-xl text-center font-extrabold cursor-pointer transition-all ${
                  cardsPerPage === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                2 (Grandes, 5 años)
              </button>
              <button
                onClick={() => setCardsPerPage(4)}
                className={`py-1.5 px-2 rounded-xl text-center font-extrabold cursor-pointer transition-all ${
                  cardsPerPage === 4
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                4 (Estándar)
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold leading-tight pt-0.5">
              Genera <strong>{pages.length} hojas</strong> en el PDF
            </p>
          </div>

          {/* Ink Mode: Color vs B/W */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-slate-700 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Estilo de impresión:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInkMode('color')}
                className={`py-1.5 px-2 rounded-xl text-center font-extrabold cursor-pointer transition-all ${
                  inkMode === 'color'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🎨 Todo Color
              </button>
              <button
                onClick={() => setInkMode('bw')}
                className={`py-1.5 px-2 rounded-xl text-center font-extrabold cursor-pointer transition-all ${
                  inkMode === 'bw'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🖨️ Ahorro Tinta
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold leading-tight pt-0.5">
              {inkMode === 'color' ? 'Bordes e insignias alegres' : 'Escala de grises económica'}
            </p>
          </div>

          {/* Shuffle new numbers */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-2">
            <span className="text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Nuevos números:</span>
            </span>
            <button
              onClick={handleRegenerate}
              className="w-full py-2 px-3 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-purple-700" />
              <span>Revolver cuadrículas</span>
            </button>
            <p className="text-[10px] text-slate-500 font-semibold leading-tight">
              Genera nuevas combinaciones aleatorias
            </p>
          </div>
        </div>
      </div>

      {/* Printable Preview Area / Actual Printed Content */}
      <div id="printable-sheets-container" className="space-y-8">
        {pages.map((pageCards, pageIndex) => (
          <div
            key={pageIndex}
            className="print-page bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-md print:shadow-none print:border-none print:p-0 print:m-0 break-inside-avoid page-break-after-always"
          >
            {/* Sheet Sub-header for preview */}
            <div className="print:hidden flex items-center justify-between text-xs font-bold text-slate-400 mb-4 pb-2 border-b border-slate-100">
              <span>
                Página {pageIndex + 1} de {pages.length} ({cardsPerPage} cartones por hoja)
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Scissors className="w-3.5 h-3.5" /> Líneas de corte para recortar
              </span>
            </div>

            {/* Grid of Cards on this page */}
            <div
              className={`grid gap-6 sm:gap-8 ${
                cardsPerPage === 2 ? 'grid-cols-1 md:grid-cols-2 print:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 print:grid-cols-2'
              }`}
            >
              {pageCards.map((card) => {
                const isBW = inkMode === 'bw';

                return (
                  <div
                    key={card.id}
                    className={`bingo-print-card relative bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${
                      isBW
                        ? 'border-2 border-dashed border-slate-900'
                        : 'border-3 border-amber-400 shadow-sm'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-label="card mascot">
                          {isBW ? '⭐' : '🎈'}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-black text-slate-900 font-['Fredoka'] leading-none">
                            {card.playerName}
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                            Cartón #{card.cardIndex} • ¡Bingo Familiar!
                          </div>
                        </div>
                      </div>

                      <div
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isBW ? 'border border-slate-900 text-slate-900' : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        BINGO 75
                      </div>
                    </div>

                    {/* 5x5 Bingo Grid */}
                    <div className="w-full">
                      {/* B-I-N-G-O Letters Row */}
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        {letters.map((lettr) => {
                          const range = LETTER_RANGES[lettr];
                          return (
                            <div
                              key={lettr}
                              className={`py-1.5 rounded-xl font-black text-base sm:text-lg text-center font-['Fredoka'] shadow-xs flex flex-col items-center justify-center ${
                                isBW ? 'bg-slate-900 text-white' : 'text-white'
                              }`}
                              style={{
                                backgroundColor: isBW ? '#0f172a' : range.color,
                              }}
                            >
                              <span>{lettr}</span>
                              <span className="text-[9px] font-bold opacity-80 leading-none">
                                {range.min}-{range.max}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* 5 Rows of Numbers */}
                      <div className="grid grid-rows-5 gap-1.5 sm:gap-2">
                        {[0, 1, 2, 3, 4].map((rowIndex) => (
                          <div key={rowIndex} className="grid grid-cols-5 gap-1.5 sm:gap-2">
                            {letters.map((colLetter) => {
                              const cellValue = card.grid[colLetter][rowIndex];
                              const isFree = cellValue === 'FREE';

                              return (
                                <div
                                  key={colLetter}
                                  className={`aspect-square rounded-xl flex flex-col items-center justify-center font-black transition-colors ${
                                    isFree
                                      ? isBW
                                        ? 'bg-slate-100 border-2 border-slate-900 text-slate-900'
                                        : 'bg-amber-100 border-2 border-amber-400 text-amber-800'
                                      : isBW
                                      ? 'bg-white border-2 border-slate-700 text-slate-900'
                                      : 'bg-slate-50 border-2 border-slate-200 text-slate-800'
                                  } ${cardsPerPage === 2 ? 'text-xl sm:text-2xl' : 'text-base sm:text-xl'}`}
                                >
                                  {isFree ? (
                                    <div className="flex flex-col items-center justify-center">
                                      <span className="text-xl sm:text-2xl leading-none">⭐</span>
                                      <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">
                                        GRATIS
                                      </span>
                                    </div>
                                  ) : (
                                    <span>{cellValue}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer for kids */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>🌽 Tapa tus números con porotos o fichas</span>
                      <span>⭐ Centro gratis</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cut line guides between cards */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-300 flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold select-none">
              <Scissors className="w-4 h-4" />
              <span>Línea para recortar cartones con tijera</span>
              <Scissors className="w-4 h-4 rotate-180" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
