import React from 'react';
import {
  Play,
  BookOpen,
  Sparkles,
  Printer,
  Trophy,
  Dices,
  Keyboard,
  Users,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartSession: () => void;
  onOpenInstructions: () => void;
  soundEnabled: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartSession,
  onOpenInstructions,
  soundEnabled,
}) => {
  const handleStart = () => {
    playSound('fanfare', soundEnabled);
    onStartSession();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200/50 flex flex-col justify-between text-slate-800 relative overflow-hidden">
      {/* Decorative festive floating circles/balloons */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-rose-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 text-2xl select-none">
            🦁
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Fredoka'] leading-none">
              ¡Bingo Familiar!
            </h1>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">
              Edición especial para compartir entre familias y apoderados
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onOpenInstructions();
          }}
          className="px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs shadow-xs border border-amber-300/80 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Instrucciones</span>
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center relative z-10">
        {/* Festive Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-amber-300 text-amber-900 shadow-xs text-xs font-black uppercase tracking-wider mb-5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>¡Bienvenidos Apoderados, Niños y Familias!</span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>

        {/* Big Catchy Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-['Fredoka'] tracking-tight leading-tight max-w-3xl">
          ¡Una tarde inolvidable de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500">Bingo Familiar</span>!
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-lg font-bold text-slate-600 max-w-2xl leading-relaxed">
          Diseñado para jugar juntos en casa o en actividades del curso. Prepara tus porotos, imprime tus cartones en PDF y diviértete con la ruleta 3D interactiva.
        </p>

        {/* Central Single Session Start Call to Action */}
        <div className="mt-8 sm:mt-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-3 border-amber-300 space-y-4 text-center">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700">
              Acceso Inmediato y Libre
            </span>
            <p className="text-xs text-slate-500 font-bold">
              Sin contraseñas ni registros: pulsa el botón para comenzar una nueva partida con tu grupo
            </p>
          </div>

          {/* THE SINGLE SESSION START BUTTON REQUESTED BY USER */}
          <button
            id="start-session-main-btn"
            onClick={handleStart}
            className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-b-4 border-emerald-700 animate-pulse"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>INICIAR SESIÓN DE JUEGO</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cada sesión resetea una sesión fresca para jugar</span>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full text-left">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg mb-2">
                🎲
              </div>
              <h3 className="font-black text-slate-900 font-['Fredoka'] text-sm">
                Ruleta y Bombo 3D
              </h3>
              <p className="text-slate-500 text-[11px] font-semibold mt-1">
                Física interactiva Three.js con apodos animados y modo automático.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-black text-amber-700 flex items-center gap-1">
              <Keyboard className="w-3 h-3" /> Atajo: Barra Espaciadora
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-lg mb-2">
                🖨️
              </div>
              <h3 className="font-black text-slate-900 font-['Fredoka'] text-sm">
                Cartones PDF
              </h3>
              <p className="text-slate-500 text-[11px] font-semibold mt-1">
                Descarga en PDF listo para imprimir, con corte de tijera y cartones por persona.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-black text-rose-700">
              PDF de alta calidad
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg mb-2">
                🎉
              </div>
              <h3 className="font-black text-slate-900 font-['Fredoka'] text-sm">
                ¡Cantar Bingo!
              </h3>
              <p className="text-slate-500 text-[11px] font-semibold mt-1">
                Verifica de inmediato con animación de fiesta y fuegos artificiales reales.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-black text-purple-700 flex items-center gap-1">
              <Keyboard className="w-3 h-3" /> Atajo: Tecla Enter
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center text-lg mb-2">
                🏆
              </div>
              <h3 className="font-black text-slate-900 font-['Fredoka'] text-sm">
                Scoreboard Tecleable
              </h3>
              <p className="text-slate-500 text-[11px] font-semibold mt-1">
                Teclea el nombre del ganador para el podio. Cada sesión resetea la cuenta.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-black text-yellow-700">
              Registro por sesión
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer className="mt-8" />
    </div>
  );
};
