import React, { useState, useEffect } from 'react';
import {
  Dices,
  Printer,
  Smartphone,
  Trophy,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Target,
  Award,
  BookOpen,
  LogOut,
  Keyboard,
} from 'lucide-react';
import { DrawnBall, PlayerBingoCard, GameMode, ScoreRecord } from './types';
import { generateBingoCards } from './utils/bingoData';
import { playSound } from './utils/audio';
import {
  getSavedParticipants,
  saveParticipants,
  getSavedCardsPerParticipant,
  saveCardsPerParticipant,
  generateCardsForParticipants,
} from './utils/participants';
import {
  getSessionRecords,
  saveScoreRecord,
  deleteSessionRecord,
  clearSessionRecords,
  resetSessionScoreboard,
  GAME_MODE_LABELS,
} from './utils/scoreboard';
import { BingoWheel } from './components/BingoWheel';
import { MasterBoard } from './components/MasterBoard';
import { PrintableCards } from './components/PrintableCards';
import { DigitalCards } from './components/DigitalCards';
import { Scoreboard } from './components/Scoreboard';
import { BingoClaimModal } from './components/BingoClaimModal';
import { LandingPage } from './components/LandingPage';
import { InstructionsModal } from './components/InstructionsModal';
import { Footer } from './components/Footer';
import { LanguageToggle } from './components/LanguageToggle';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  // Session Active state: starts on attractive Landing Page inviting families & apoderados
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'wheel' | 'print' | 'digital' | 'scoreboard'>('wheel');
  const [drawnBalls, setDrawnBalls] = useState<DrawnBall[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<GameMode>('full_card');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showExitSessionConfirm, setShowExitSessionConfirm] = useState<boolean>(false);

  // Scoreboard records for the active session (each session resets)
  const [records, setRecords] = useState<ScoreRecord[]>(() => getSessionRecords());

  // Participants and cards per participant persisted across sessions
  const [participants, setParticipants] = useState<string[]>(() => getSavedParticipants());
  const [cardsPerParticipant, setCardsPerParticipant] = useState<number>(() => getSavedCardsPerParticipant());

  // Initialize player cards using stored participants and cards-per-participant
  const [cards, setCards] = useState<PlayerBingoCard[]>(() =>
    generateCardsForParticipants(getSavedParticipants(), getSavedCardsPerParticipant())
  );

  // Start a fresh session
  const handleStartSession = () => {
    resetSessionScoreboard();
    setRecords([]);
    setDrawnBalls([]);
    setSessionActive(true);
    setActiveTab('wheel');
  };

  const handleExitSession = () => {
    setShowExitSessionConfirm(false);
    setSessionActive(false);
  };

  const handleUpdateParticipants = (newParticipants: string[]) => {
    setParticipants(newParticipants);
    saveParticipants(newParticipants);
  };

  const handleUpdateCardsPerParticipant = (count: number) => {
    setCardsPerParticipant(count);
    saveCardsPerParticipant(count);
  };

  const handleDrawBall = (ball: DrawnBall) => {
    setDrawnBalls((prev) => [...prev, ball]);
  };

  const handleResetGame = () => {
    setDrawnBalls([]);
    setShowResetConfirm(false);
    playSound('pop', soundEnabled);
  };

  // Record a verified win into the Session Scoreboard
  const handleRecordWin = (
    playerName: string,
    mode: GameMode,
    ballsCount: number,
    pattern?: string
  ) => {
    saveScoreRecord({
      playerName,
      mode,
      ballsDrawnCount: ballsCount,
      winningPattern: pattern,
    });
    setRecords(getSessionRecords());
  };

  // Manually type and register a win directly from the Scoreboard
  const handleManualAddRecord = (playerName: string, mode: GameMode, ballsCount: number) => {
    saveScoreRecord({
      playerName,
      mode,
      ballsDrawnCount: ballsCount,
    });
    setRecords(getSessionRecords());
  };

  const handleClearHistory = () => {
    clearSessionRecords();
    setRecords([]);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = deleteSessionRecord(id);
    setRecords(updated);
  };

  // Global Keyboard shortcuts: Space for spin, Enter for Cantar Bingo
  useEffect(() => {
    if (!sessionActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        playSound('pop', soundEnabled);
        setIsClaimModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessionActive, soundEnabled]);

  // If session is NOT active, display the Landing Page
  if (!sessionActive) {
    return (
      <>
        <LandingPage
          onStartSession={handleStartSession}
          onOpenInstructions={() => setIsInstructionsOpen(true)}
          soundEnabled={soundEnabled}
        />
        <InstructionsModal
          isOpen={isInstructionsOpen}
          onClose={() => setIsInstructionsOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-100/40 text-slate-800 pb-16">
      {/* Top Navigation & App Header (Hidden when printing) */}
      <header className="print:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Clean Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 text-2xl select-none">
              🦁
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Fredoka'] leading-none">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                  {t.activeSessionBadge}
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action buttons: Language Toggle, Instructions, Big ¡Cantar Bingo! button, and Session exit */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Toggle with Chile 🇨🇱 and UK 🇬🇧 Flags */}
            <LanguageToggle soundEnabled={soundEnabled} />

            {/* Instructions Button */}
            <button
              id="header-instructions-btn"
              onClick={() => {
                playSound('click', soundEnabled);
                setIsInstructionsOpen(true);
              }}
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 font-black text-xs shadow-xs border-2 border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>{t.instructionsBtn}</span>
            </button>

            {/* Prominent BIG "¡Cantar Bingo!" Button with Enter hint */}
            <button
              id="header-bingo-button"
              onClick={() => {
                playSound('pop', soundEnabled);
                setIsClaimModalOpen(true);
              }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm sm:text-base shadow-md shadow-rose-500/30 flex items-center gap-2 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer border-b-2 border-rose-700 animate-pulse"
              title={t.claimBingoBtn}
            >
              <Trophy className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>{t.claimBingoBtn}</span>
              <span className="hidden md:inline-block text-[10px] font-mono bg-black/25 px-1.5 py-0.5 rounded text-rose-100 font-black">
                {t.enterKeyHint}
              </span>
            </button>

            {/* Exit / New Session Button */}
            <button
              id="header-exit-session-btn"
              onClick={() => setShowExitSessionConfirm(true)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title={t.exitSessionBtn}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="w-full sm:w-auto flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 text-xs font-black overflow-x-auto">
            <button
              id="tab-wheel-btn"
              onClick={() => {
                setActiveTab('wheel');
                playSound('click', soundEnabled);
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'wheel'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>{t.tabWheel}</span>
            </button>

            <button
              id="tab-scoreboard-btn"
              onClick={() => {
                setActiveTab('scoreboard');
                playSound('click', soundEnabled);
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'scoreboard'
                  ? 'bg-yellow-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.tabScoreboard} ({records.length})</span>
            </button>

            <button
              id="tab-print-btn"
              onClick={() => {
                setActiveTab('print');
                playSound('click', soundEnabled);
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'print'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{t.tabPrint}</span>
            </button>

            <button
              id="tab-digital-btn"
              onClick={() => {
                setActiveTab('digital');
                playSound('click', soundEnabled);
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'digital'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.tabDigital}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 1: Ruleta 3D, Bombo y Tablero Maestro */}
        {activeTab === 'wheel' && (
          <div className="space-y-8 animate-fadeIn">
            {/* The Main Spinning Tumbler with 3D Three.js Cage */}
            <BingoWheel
              drawnBalls={drawnBalls}
              onDrawBall={handleDrawBall}
              onResetGame={() => setShowResetConfirm(true)}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              activeMode={activeMode}
              onModeChange={setActiveMode}
              onOpenBingoClaim={() => setIsClaimModalOpen(true)}
            />

            {/* Master Board of 75 numbers */}
            <MasterBoard drawnBalls={drawnBalls} />

            {/* Helper tips card for families and apoderados */}
            <div className="bg-amber-100/60 border-2 border-amber-300/80 rounded-3xl p-5 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">💡</span>
                <div>
                  <h4 className="font-black text-sm font-['Fredoka'] text-amber-900">
                    {t.tipsTitle}
                  </h4>
                  <p className="mt-0.5 text-amber-900/90 leading-relaxed font-semibold">
                    1. {t.tipsTip1}
                    <br />
                    2. {t.tipsTip2}
                    <br />
                    3. {t.tipsTip3}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('print')}
                className="flex-shrink-0 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t.tipsGoToPrintBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Scoreboard & Session Records */}
        {activeTab === 'scoreboard' && (
          <div className="animate-fadeIn">
            <Scoreboard
              records={records}
              onClearHistory={handleClearHistory}
              onDeleteRecord={handleDeleteRecord}
              onManualAddRecord={handleManualAddRecord}
              currentBallsCount={drawnBalls.length}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* TAB 3: Printable Cards Generator & Print Layout */}
        {activeTab === 'print' && (
          <div className="animate-fadeIn">
            <PrintableCards
              cards={cards}
              onUpdateCards={setCards}
              participants={participants}
              onUpdateParticipants={handleUpdateParticipants}
              cardsPerParticipant={cardsPerParticipant}
              onUpdateCardsPerParticipant={handleUpdateCardsPerParticipant}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* TAB 4: Digital On-Screen Cards */}
        {activeTab === 'digital' && (
          <div className="animate-fadeIn">
            <DigitalCards
              cards={cards}
              drawnBalls={drawnBalls}
              soundEnabled={soundEnabled}
              activeMode={activeMode}
              onOpenVerifier={() => setIsClaimModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* App Footer */}
      <Footer className="mt-12" />

      {/* Hidden printable container rendered when user prints from any screen */}
      <div className="hidden print:block">
        <PrintableCards
          cards={cards}
          onUpdateCards={setCards}
          participants={participants}
          onUpdateParticipants={handleUpdateParticipants}
          cardsPerParticipant={cardsPerParticipant}
          onUpdateCardsPerParticipant={handleUpdateCardsPerParticipant}
          soundEnabled={false}
        />
      </div>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />

      {/* Dedicated Bingo Claim & Verification Modal with Fireworks and Fiesta */}
      <BingoClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        cards={cards}
        drawnBalls={drawnBalls}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        onRecordWin={handleRecordWin}
        soundEnabled={soundEnabled}
      />

      {/* Reset Ball Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-300 shadow-2xl text-center space-y-4">
            <div className="text-4xl">🔄</div>
            <h3 className="text-xl font-black text-slate-900 font-['Fredoka']">
              {t.resetModalTitle}
            </h3>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {t.resetModalDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 font-extrabold text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t.resetModalCancel}
              </button>
              <button
                onClick={handleResetGame}
                className="py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 font-extrabold text-xs text-white shadow-xs transition-colors cursor-pointer"
              >
                {t.resetModalConfirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Session Confirmation Dialog */}
      {showExitSessionConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-300 shadow-2xl text-center space-y-4">
            <div className="text-4xl">🏠</div>
            <h3 className="text-xl font-black text-slate-900 font-['Fredoka']">
              {t.exitModalTitle}
            </h3>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {t.exitModalDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowExitSessionConfirm(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 font-extrabold text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t.exitModalCancel}
              </button>
              <button
                onClick={handleExitSession}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white shadow-xs transition-colors cursor-pointer"
              >
                {t.exitModalConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
