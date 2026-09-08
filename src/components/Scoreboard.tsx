import React from 'react';
import { Trophy, Medal, Trash2, Calendar, Award, RefreshCw } from 'lucide-react';
import { ScoreRecord, PlayerScoreSummary } from '../types';
import { GAME_MODE_LABELS, getLeaderboard } from '../utils/scoreboard';
import { playSound } from '../utils/audio';

interface ScoreboardProps {
  records: ScoreRecord[];
  onClearHistory: () => void;
  onDeleteRecord: (id: string) => void;
  soundEnabled: boolean;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  records,
  onClearHistory,
  onDeleteRecord,
  soundEnabled,
}) => {
  const leaderboard: PlayerScoreSummary[] = getLeaderboard(records);

  const formatDate = (timestamp: number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Reciente';
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
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] leading-tight">
              Scoreboard y Registro Histórico
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              Historial de partidas ganadas por los niños y la familia
            </p>
          </div>
        </div>

        {records.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('¿Seguro que quieres borrar todo el registro histórico de partidas?')) {
                playSound('pop', soundEnabled);
                onClearHistory();
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Borrar Historial</span>
          </button>
        )}
      </div>

      {records.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-amber-300 text-center space-y-3">
          <div className="text-5xl animate-bounce">🎈</div>
          <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
            ¡Aún no hay campeones registrados!
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-md mx-auto">
            Cuando un jugador cante victoria en la partida, pulsa el botón{' '}
            <strong className="text-rose-600 font-extrabold">"🎉 ¡BINGO!"</strong> para verificar
            su cartón y registrar automáticamente su triunfo con fiesta y fuegos artificiales.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Podio / Leaderboard */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Podio de Campeones</span>
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
                          <span>↔️ {player.winsByMode.line_row} Fila</span>
                          <span>↕️ {player.winsByMode.line_col} Col</span>
                          <span>🏆 {player.winsByMode.full_card} Todo</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900 font-['Fredoka']">
                        {player.totalWins}
                      </div>
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        {player.totalWins === 1 ? 'Victoria' : 'Victorias'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Historical Matches Timeline */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>Registro de Partidas Jugadas ({records.length})</span>
            </h3>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {records.map((rec) => {
                const modeInfo = GAME_MODE_LABELS[rec.mode];

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
                            {modeInfo.short}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {formatDate(rec.timestamp)} • Completó en{' '}
                          <strong className="text-slate-800">{rec.ballsDrawnCount} bolas</strong>
                          {rec.winningPattern ? ` • ${rec.winningPattern}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteRecord(rec.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Eliminar este registro"
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
