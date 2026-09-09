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
  Layers,
  FileDown,
  CheckCircle2,
} from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Cerrar instrucciones"
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
              Guía e Instrucciones del Bingo Familiar
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              Todo lo que necesitas saber para organizar una partida entre familias y apoderados
            </p>
          </div>
        </div>

        {/* Section: Atajos de Teclado (Importante) */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl text-white shadow-md space-y-2">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Keyboard className="w-4 h-4 text-yellow-200" />
            <span>Atajos de Teclado Rápidos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            <div className="bg-white/20 backdrop-blur-xs p-2.5 rounded-xl flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-md bg-white text-slate-900 font-mono text-xs shadow-xs font-black">
                Espacio ␣
              </kbd>
              <span>¡Girar el bombo y sacar bola!</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xs p-2.5 rounded-xl flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-md bg-white text-slate-900 font-mono text-xs shadow-xs font-black">
                Enter ↵
              </kbd>
              <span>¡Cantar Bingo y verificar!</span>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-700">
          {/* Step 1: Imprimir Cartones en PDF */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                1
              </span>
              <FileDown className="w-4 h-4 text-amber-600" />
              <span>Generar e Imprimir los Cartones en PDF</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Dirígete a la pestaña <strong>"🖨️ Imprimir Cartones"</strong>. Puedes ingresar los nombres de los participantes (se guardan automáticamente), elegir cuántos cartones recibe cada persona (1 a 4 cartones), y presionar el botón <strong>"DESCARGAR PDF DE CARTONES"</strong>. El PDF viene optimizado en alta definición con líneas de corte para tijera.
            </p>
          </div>

          {/* Step 2: La Ruleta y el Bombo 3D */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              <Dices className="w-4 h-4 text-blue-600" />
              <span>Girar el Bombo 3D y Cantar Bolitas</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Presiona el botón <strong>"¡GIRAR Y SACAR BOLA!"</strong> o pulsa la tecla <strong>Espacio</strong>. La ruleta 3D girará y extraerá una de las 75 bolitas con su letra B-I-N-G-O y su simpático apodo infantil (ej: "B-7 El Cohete"). También puedes activar el <strong>Modo Automático</strong> con temporizador para jugar sin tocar la pantalla.
            </p>
          </div>

          {/* Step 3: Las 3 Modalidades de Juego */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              <Target className="w-4 h-4 text-purple-600" />
              <span>Seleccionar la Modalidad de Juego</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>↔️</span> Fila Horizontal
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  Completar 5 números seguidos de izquierda a derecha. Ideal para partidas rápidas.
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>↕️</span> Columna Vertical
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  Completar 5 números seguidos de arriba a abajo.
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                <div className="font-black text-purple-950 flex items-center gap-1">
                  <span>🏆</span> Todo el Cartón
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  Completar las 25 casillas (Bingo clásico). El premio mayor de la jornada.
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Cantar Bingo y Verificar */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                4
              </span>
              <Trophy className="w-4 h-4 text-rose-600" />
              <span>¡Cantar Bingo! y Comprobación con Fiesta</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Cuando alguien complete su cartón, pulsa el botón grande <strong>"¡Cantar Bingo!"</strong> o la tecla <strong>Enter</strong>. Se abrirá la ventana de verificación donde podrás <strong>teclear el nombre del ganador</strong> (o seleccionarlo con un clic). Si el Bingo es correcto, la aplicación activará <strong>fuegos artificiales reales en pantalla y fanfarria</strong>.
            </p>
          </div>

          {/* Step 5: Scoreboard por Sesión */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-slate-900 font-['Fredoka'] text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                5
              </span>
              <PartyPopper className="w-4 h-4 text-emerald-600" />
              <span>Scoreboard y Registro de la Sesión</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Al verificar un triunfo o teclear el nombre en el Scoreboard, la victoria queda anotada en el podio de campeones de la partida. <strong>Cada sesión resetea una sesión</strong>, garantizando que cada encuentro comience desde cero para una competencia limpia y emocionante.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all cursor-pointer"
          >
            ¡Entendido, vamos a jugar!
          </button>
        </div>
      </div>
    </div>
  );
};
