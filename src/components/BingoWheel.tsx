import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Shuffle,
  Clock,
  Target,
  Trophy,
  Keyboard,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BingoLetter, DrawnBall, GameMode } from '../types';
import { LETTER_RANGES, NUMBER_NICKNAMES, getLetterForNumber } from '../utils/bingoData';
import { GAME_MODE_LABELS } from '../utils/scoreboard';
import { playSound } from '../utils/audio';
import { ThreeBingoRoulette } from './ThreeBingoRoulette';

interface BingoWheelProps {
  drawnBalls: DrawnBall[];
  onDrawBall: (ball: DrawnBall) => void;
  onResetGame: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  activeMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onOpenBingoClaim: () => void;
}

export const BingoWheel: React.FC<BingoWheelProps> = ({
  drawnBalls,
  onDrawBall,
  onResetGame,
  soundEnabled,
  setSoundEnabled,
  activeMode,
  onModeChange,
  onOpenBingoClaim,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoDraw, setAutoDraw] = useState(false);
  const [autoSpeed, setAutoSpeed] = useState<number>(7); // seconds
  const [countdown, setCountdown] = useState<number>(7);

  const drawnSet = new Set(drawnBalls.map((b) => b.number));
  const remainingCount = 75 - drawnBalls.length;
  const currentBall = drawnBalls[drawnBalls.length - 1] || null;

  // Handle drawing a new ball
  const handleDraw = () => {
    if (isSpinning || remainingCount <= 0) return;

    const availableNumbers: number[] = [];
    for (let i = 1; i <= 75; i++) {
      if (!drawnSet.has(i)) {
        availableNumbers.push(i);
      }
    }

    if (availableNumbers.length === 0) return;

    setIsSpinning(true);
    playSound('spin', soundEnabled);

    // Three.js animation spin duration
    setTimeout(() => {
      const selectedNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      const letter = getLetterForNumber(selectedNumber);
      const nicknameInfo = NUMBER_NICKNAMES[selectedNumber];

      const newBall: DrawnBall = {
        number: selectedNumber,
        letter,
        timestamp: Date.now(),
        nickname: nicknameInfo ? `${nicknameInfo.emoji} ${nicknameInfo.title}` : undefined,
      };

      onDrawBall(newBall);
      setIsSpinning(false);
      playSound('ball', soundEnabled);

      // Mini confetti celebration
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.45 },
          colors: ['#EF4444', '#F97316', '#10B981', '#3B82F6', '#8B5CF6'],
        });
      } catch {
        // ignore
      }
    }, 1100);
  };

  // Keyboard Shortcuts: Space to spin, Enter to Claim Bingo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Do not trigger hotkeys if user is currently typing in an input or textarea
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Spacebar: Girar y sacar bola
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!isSpinning && remainingCount > 0) {
          handleDraw();
        }
      }

      // Enter: Cantar Bingo
      if (e.key === 'Enter') {
        e.preventDefault();
        playSound('pop', soundEnabled);
        onOpenBingoClaim();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, remainingCount, drawnBalls.length, soundEnabled]);

  // Auto-draw timer logic
  useEffect(() => {
    if (!autoDraw || remainingCount <= 0) {
      setCountdown(autoSpeed);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleDraw();
          return autoSpeed;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoDraw, autoSpeed, remainingCount, isSpinning, drawnBalls.length]);

  return (
    <div id="bingo-wheel-container" className="space-y-6">
      {/* Top Action & Mode Selector Bar */}
      <div className="bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Active Game Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Target className="w-4 h-4 text-amber-500" />
            <span>Modalidad de Juego:</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['line_row', 'line_col', 'full_card'] as GameMode[]).map((mode) => {
              const info = GAME_MODE_LABELS[mode];
              const isSelected = activeMode === mode;

              return (
                <button
                  key={mode}
                  onClick={() => {
                    onModeChange(mode);
                    playSound('click', soundEnabled);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={info.desc}
                >
                  <span>{info.emoji}</span>
                  <span>{info.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Action Icons: Sound, Reset */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            id="toggle-sound-btn"
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('click', !soundEnabled);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            title="Efectos de sonido"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sonidos' : 'Silencio'}</span>
          </button>

          {/* Reset game */}
          <button
            id="reset-game-btn"
            onClick={onResetGame}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
            title="Reiniciar partida y vaciar bombo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Arena: 3D Roulette (Three.js) & Announced Ball Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 3D Roulette Tumbler */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Bombo 3D Three.js
            </span>
            <span className="text-xs font-bold text-slate-500">
              Quedan <strong className="text-slate-900">{remainingCount}</strong> de 75 bolas
            </span>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="w-full my-1">
            <ThreeBingoRoulette
              isSpinning={isSpinning}
              currentBall={currentBall}
              onCageClick={handleDraw}
              remainingCount={remainingCount}
            />
          </div>

          {/* ACTION BUTTONS: ¡Girar y sacar bola! (Espacio) AND ¡Cantar Bingo! (Enter) */}
          <div className="w-full space-y-2.5 pt-2">
            {/* Primary Spin Button with Space hint */}
            <button
              id="draw-ball-main-btn"
              onClick={handleDraw}
              disabled={isSpinning || remainingCount <= 0}
              className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl text-white font-black text-lg sm:text-xl shadow-lg transition-all transform flex items-center justify-center gap-3 cursor-pointer ${
                remainingCount <= 0
                  ? 'bg-slate-300 shadow-none cursor-not-allowed text-slate-500'
                  : isSpinning
                  ? 'bg-amber-500 scale-[0.98]'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.01] active:scale-[0.98] shadow-emerald-500/25 border-b-4 border-emerald-700'
              }`}
            >
              <Shuffle className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span>
                  {remainingCount <= 0
                    ? '¡Fin del Juego! Todas las bolas salieron'
                    : isSpinning
                    ? 'Revolviendo bolitas 3D...'
                    : '¡GIRAR Y SACAR BOLA!'}
                </span>
                {remainingCount > 0 && !isSpinning && (
                  <span className="hidden sm:inline-block text-[11px] font-black bg-black/20 text-emerald-100 px-2 py-0.5 rounded-lg font-mono">
                    Espacio ␣
                  </span>
                )}
              </div>
            </button>

            {/* BIG "¡Cantar Bingo!" BUTTON WITH ENTER HINT (REQUESTED BY USER) */}
            <button
              id="claim-bingo-main-btn"
              onClick={() => {
                playSound('pop', soundEnabled);
                onOpenBingoClaim();
              }}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-lg sm:text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-b-4 border-rose-700 animate-pulse"
              title="Cantar y verificar si alguien ganó (también puedes pulsar Enter)"
            >
              <Trophy className="w-6 h-6 text-yellow-300 animate-bounce" />
              <div className="flex items-center gap-2.5 flex-wrap justify-center">
                <span>¡Cantar Bingo!</span>
                <span className="text-[11px] font-black bg-black/25 text-rose-100 px-2 py-0.5 rounded-lg font-mono">
                  Tecla Enter ↵
                </span>
              </div>
            </button>

            {/* Auto play controls */}
            <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <button
                  id="auto-draw-toggle-btn"
                  onClick={() => {
                    setAutoDraw(!autoDraw);
                    playSound('click', soundEnabled);
                  }}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    autoDraw
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {autoDraw ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{autoDraw ? 'Pausar automático' : 'Modo Automático'}</span>
                </button>
                {autoDraw && (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Siguiente en {countdown}s
                  </span>
                )}
              </div>

              {/* Speed selector */}
              <div className="flex items-center gap-1">
                <span className="text-slate-500 text-[11px] font-semibold mr-1">Pausa entre bolas:</span>
                {[5, 7, 10].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      setAutoSpeed(sec);
                      setCountdown(sec);
                      playSound('click', soundEnabled);
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${
                      autoSpeed === sec
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Big Announced Ball Showcase */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Última bola cantada
            </div>
            {currentBall && (
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Bola #{drawnBalls.length}
              </span>
            )}
          </div>

          {/* Central Ball Showcase */}
          <div className="py-6 flex flex-col items-center justify-center flex-1">
            <AnimatePresence mode="wait">
              {currentBall ? (
                <motion.div
                  key={currentBall.number}
                  initial={{ scale: 0.3, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 180 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* The Gigantic Ball Sphere */}
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative border-4 border-white select-none"
                    style={{
                      backgroundColor: LETTER_RANGES[currentBall.letter].color,
                      boxShadow: `0 20px 40px -10px ${LETTER_RANGES[currentBall.letter].color}80`,
                    }}
                  >
                    {/* Gloss shine reflection */}
                    <div className="absolute top-2 left-5 w-14 h-8 bg-white/30 rounded-full rotate-[-25deg] blur-[1px]"></div>

                    <span className="text-xl sm:text-2xl font-black font-['Fredoka'] tracking-widest opacity-90 leading-none mb-1">
                      {currentBall.letter}
                    </span>
                    <span className="text-5xl sm:text-7xl font-black leading-none font-['Fredoka'] drop-shadow-md">
                      {currentBall.number}
                    </span>
                  </div>

                  {/* Child Nickname & Illustration Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-4 px-4 py-2 rounded-2xl bg-amber-50 border-2 border-amber-200 text-slate-800 shadow-sm flex items-center gap-2 max-w-sm"
                  >
                    <span className="text-2xl" role="img" aria-label="nickname">
                      {NUMBER_NICKNAMES[currentBall.number]?.emoji || '⭐'}
                    </span>
                    <div className="text-left">
                      <div className="text-base font-extrabold text-slate-900 font-['Fredoka'] leading-tight">
                        {NUMBER_NICKNAMES[currentBall.number]?.title || `Número ${currentBall.number}`}
                      </div>
                      <div className="text-[11px] font-bold text-amber-700">
                        Columna {currentBall.letter} • ({LETTER_RANGES[currentBall.letter].min} a{' '}
                        {LETTER_RANGES[currentBall.letter].max})
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-slate-400 py-8">
                  <div className="w-36 h-36 rounded-full border-4 border-dashed border-amber-300/80 bg-amber-50/50 flex flex-col items-center justify-center mb-3">
                    <span className="text-4xl animate-bounce">🎈</span>
                    <span className="text-xs font-bold text-amber-700 mt-1">¡Listo para jugar!</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600 max-w-xs">
                    Pulsa <strong className="text-emerald-600">"¡GIRAR Y SACAR BOLA!"</strong> o pulsa la tecla <strong className="text-slate-900">Espacio</strong> para comenzar la partida familiar.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Recent Balls Strip */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Últimas 5 bolitas:</span>
              <span className="text-xs font-extrabold text-slate-700">
                Total cantadas: <span className="text-rose-600 font-black">{drawnBalls.length}</span> / 75
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 min-h-[46px]">
              {drawnBalls.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Aún no hay bolitas cantadas</span>
              ) : (
                drawnBalls
                  .slice(-5)
                  .reverse()
                  .map((ball) => (
                    <motion.div
                      key={ball.number}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0 w-10 h-10 rounded-full flex flex-col items-center justify-center text-white font-extrabold shadow-sm border border-white"
                      style={{
                        backgroundColor: LETTER_RANGES[ball.letter].color,
                      }}
                      title={`${ball.letter}-${ball.number}: ${NUMBER_NICKNAMES[ball.number]?.title || ''}`}
                    >
                      <span className="text-[9px] leading-none opacity-80">{ball.letter}</span>
                      <span className="text-xs font-bold leading-tight">{ball.number}</span>
                    </motion.div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
