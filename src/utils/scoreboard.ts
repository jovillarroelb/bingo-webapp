import { ScoreRecord, PlayerScoreSummary, GameMode } from '../types';

const SCOREBOARD_SESSION_STORAGE_KEY = 'bingo_familiar_session_records_v1';
const SCOREBOARD_GLOBAL_STORAGE_KEY = 'bingo_familiar_global_records_v1';

export const GAME_MODE_LABELS: Record<GameMode, { label: string; short: string; emoji: string; desc: string }> = {
  line_row: {
    label: 'Fila Horizontal',
    short: 'Fila',
    emoji: '↔️',
    desc: 'Completar cualquier fila de 5 casillas de izquierda a derecha',
  },
  line_col: {
    label: 'Columna Vertical',
    short: 'Columna',
    emoji: '↕️',
    desc: 'Completar cualquier columna de 5 casillas de arriba a abajo',
  },
  full_card: {
    label: 'Todo el Cartón (Bingo Completo)',
    short: 'Cartón Lleno',
    emoji: '🏆',
    desc: 'Completar todas las 25 casillas del cartón',
  },
};

// Start or reset a session: each session resets the session records
export function resetSessionScoreboard(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SCOREBOARD_SESSION_STORAGE_KEY);
  } catch (err) {
    console.warn('Error resetting session scoreboard:', err);
  }
}

// Get the current session records
export function getSessionRecords(): ScoreRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(SCOREBOARD_SESSION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading session records:', err);
    return [];
  }
}

// Save a record in the current session (and mirror to history)
export function saveScoreRecord(
  record: Omit<ScoreRecord, 'id' | 'timestamp'>
): ScoreRecord {
  const currentSessionRecords = getSessionRecords();
  const cleanPlayerName = record.playerName.trim() || 'Campeón Anónimo';

  const newRecord: ScoreRecord = {
    ...record,
    playerName: cleanPlayerName,
    id: `win-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
  };

  const updatedSession = [newRecord, ...currentSessionRecords];
  try {
    sessionStorage.setItem(SCOREBOARD_SESSION_STORAGE_KEY, JSON.stringify(updatedSession));
  } catch (err) {
    console.warn('Error saving session record:', err);
  }

  // Also persist to global history in localStorage if desired
  try {
    const globalRaw = localStorage.getItem(SCOREBOARD_GLOBAL_STORAGE_KEY);
    const globalList: ScoreRecord[] = globalRaw ? JSON.parse(globalRaw) : [];
    localStorage.setItem(
      SCOREBOARD_GLOBAL_STORAGE_KEY,
      JSON.stringify([newRecord, ...globalList].slice(0, 100))
    );
  } catch {
    // ignore
  }

  return newRecord;
}

export function deleteSessionRecord(id: string): ScoreRecord[] {
  const records = getSessionRecords().filter((r) => r.id !== id);
  try {
    sessionStorage.setItem(SCOREBOARD_SESSION_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.warn('Error updating session records:', err);
  }
  return records;
}

export function clearSessionRecords(): void {
  try {
    sessionStorage.removeItem(SCOREBOARD_SESSION_STORAGE_KEY);
  } catch (err) {
    console.warn('Error clearing session records:', err);
  }
}

export function getLeaderboard(records: ScoreRecord[]): PlayerScoreSummary[] {
  const map = new Map<string, PlayerScoreSummary>();

  records.forEach((rec) => {
    const name = rec.playerName.trim();
    if (!map.has(name)) {
      map.set(name, {
        name,
        totalWins: 0,
        winsByMode: {
          line_row: 0,
          line_col: 0,
          full_card: 0,
        },
        lastWinTimestamp: rec.timestamp,
      });
    }

    const summary = map.get(name)!;
    summary.totalWins += 1;
    summary.winsByMode[rec.mode] = (summary.winsByMode[rec.mode] || 0) + 1;
    if (!summary.lastWinTimestamp || rec.timestamp > summary.lastWinTimestamp) {
      summary.lastWinTimestamp = rec.timestamp;
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    if (b.totalWins !== a.totalWins) {
      return b.totalWins - a.totalWins;
    }
    return (b.lastWinTimestamp || 0) - (a.lastWinTimestamp || 0);
  });
}
