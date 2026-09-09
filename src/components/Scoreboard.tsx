import React, { useState } from 'react';
import { Trophy, Medal, Trash2, Calendar, Award, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScoreRecord, PlayerScoreSummary, GameMode } from '../types';
import { GAME_MODE_LABELS, getLeaderboard } from '../utils/scoreboard';
import { playSound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { getGameModeLabel } from '../i18n/translations';

interface ScoreboardProps {
  records: ScoreRecord[];
  onClearHistory: () => void;
  onDeleteRecord: (id: string) => void;
  onManualAddRecord: (playerName: string, mode: GameMode, ballsCount: number) => void;
  currentBallsCount: number;
  soundEnabled: boolean;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  records,
  onClearHistory,
  onDeleteRecord,
  onManualAddRecord,
  currentBallsCount,
  soundEnabled,
}) => {
  const { t, lang } = useLanguage();
  const [typedName, setTypedName] = useState('');
  const [selectedMode, setSelectedMode] = useState<GameMode>('full_card');
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  const leaderboard: PlayerScoreSummary[] = getLeaderboard(records);

  const handleRegisterTypedWinner = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = typedName.trim();
    if (!clean) return;

    onManualAddRecord(clean, selectedMode, currentBallsCount || 1);
    setTypedName('');
    setShowSuccessBadge(true);
    playSound('fanfare', soundEnabled);

    setTimeout(() => {
      setShowSuccessBadge(false);
    }, 4000);
  };

  const formatDate = (timestamp: number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleTimeString(lang === 'es' ? 'es-CL' : lang === 'it' ? 'it-IT' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return t.scoreboardRecentTime;
    }
  };

  return (
    <div id="scoreboard-section" className="space-y-6 animate-fadeIn">
      {/* Scoreboard Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-md text-2xl">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] leading-tight">
                {t.scoreboardTitle}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                {t.activeSessionBadge}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              {t.scoreboardSubtitle}
            </p>
          </div>
        </div>

        {records.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t.scoreboardClearConfirm)) {
                playSound('pop', soundEnabled);
                onClearHistory();
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto border border-rose-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.scoreboardResetBtn} ({records.length})</span>
          </button>
        )}
      </div>

      {/* FORM: Teclear el nombre para que quede registrado en el scoreboard */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 p-5 rounded-3xl border-2 border-amber-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm font-black text-slate-900 font-['Fredoka'] flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-amber-600" />
            <span>{t.scoreboardManualTitle}:</span>
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {t.scoreboardManualDesc}
          </span>
        </div>

        <form onSubmit={handleRegisterTypedWinner} className="flex flex-col md:flex-row items-stretch gap-2.5">
          {/* Text Input for Typing Name */}
          <div className="flex-1 relative">
            <input
              type="text"
              id="typed-winner-name-input"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder={t.scoreboardManualPlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-amber-300 font-bold text-slate-900 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 shadow-xs"
            />
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border-2 border-amber-200">
            {(['line_row', 'line_col', 'full_card'] as GameMode[]).map((mode) => {
              const label = getGameModeLabel(mode, lang);
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setSelectedMode(mode);
                    playSound('click', soundEnabled);
                  }}
                  className={`px-2.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedMode === mode
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {GAME_MODE_LABELS[mode].emoji} {label}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!typedName.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.scoreboardManualSubmit}</span>
          </button>
        </form>

        {showSuccessBadge && (
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{t.scoreboardSuccessNotice}</span>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-amber-300 text-center space-y-3">
          <div className="text-5xl animate-bounce">🎈</div>
          <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
            {t.scoreboardEmptyTitle}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-md mx-auto">
            {t.scoreboardEmptyDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Podio / Leaderboard */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>{t.scoreboardPodiumTitle} ({leaderboard.length} {t.scoreboardPlayersCount})</span>
            </h3>

            <div className="space-y-2.5">
              {leaderboard.map((player, idx) => {
                const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '⭐';
                const medalBg =
                  idx === 0
                    ? 'bg-amber-100 border-amber-300'
                    : idx === 1
                    ? 'bg-slate-100 border-slate-300'
                    : idx === 2
                    ? 'bg-orange-100 border-orange-300'
                    : 'bg-slate-50 border-slate-200';

                return (
                  <div
                    key={player.name}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between ${medalBg} transition-transform hover:scale-[1.01]`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{medalEmoji}</span>
                      <div>
                        <div className="text-sm font-black text-slate-900 font-['Fredoka']">
                          {player.name}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 flex gap-2 mt-0.5">
                          <span>↔️ {player.winsByMode.line_row} {t.scoreboardModeRowShort}</span>
                          <span>↕️ {player.winsByMode.line_col} {t.scoreboardModeColShort}</span>
                          <span>🏆 {player.winsByMode.full_card} {t.scoreboardModeFullShort}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900 font-['Fredoka']">
                        {player.totalWins}
                      </div>
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        {player.totalWins === 1 ? t.scoreboardWinSingular : t.scoreboardWinPlural}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Historical Matches Timeline for this Session */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>{t.scoreboardRecentTitle} ({records.length})</span>
            </h3>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {records.map((rec) => {
                const modeInfo = GAME_MODE_LABELS[rec.mode];
                const modeLabel = getGameModeLabel(rec.mode, lang);

                return (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{modeInfo.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-900 font-['Fredoka']">
                            {rec.playerName}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                            {modeLabel}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {formatDate(rec.timestamp)} •{' '}
                          {t.scoreboardCompletedInBalls} <strong className="text-slate-800">{rec.ballsDrawnCount} {t.scoreboardBallsWord}</strong>
                          {rec.winningPattern ? ` • ${rec.winningPattern}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteRecord(rec.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title={t.scoreboardDeleteRecordTooltip}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
