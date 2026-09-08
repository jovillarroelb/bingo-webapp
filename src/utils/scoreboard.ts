import { ScoreRecord, PlayerScoreSummary, GameMode } from '../types';

const SCOREBOARD_STORAGE_KEY = 'bingo_familiar_scoreboard_v1';

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

export function getScoreRecords(): ScoreRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SCOREBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading scoreboard from localStorage:', err);
    return [];
  }
}

export function saveScoreRecord(
  record: Omit<ScoreRecord, 'id' | 'timestamp'>
): ScoreRecord {
  const records = getScoreRecords();
  const newRecord: ScoreRecord = {
    ...record,
    id: `win-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
  };

  const updated = [newRecord, ...records];
  try {
    localStorage.setItem(SCOREBOARD_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving scoreboard to localStorage:', err);
  }

  return newRecord;
}

export function deleteScoreRecord(id: string): ScoreRecord[] {
  const records = getScoreRecords().filter((r) => r.id !== id);
  try {
    localStorage.setItem(SCOREBOARD_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.warn('Error updating scoreboard in localStorage:', err);
  }
  return records;
}

export function clearScoreboard(): void {
  try {
    localStorage.removeItem(SCOREBOARD_STORAGE_KEY);
  } catch (err) {
    console.warn('Error clearing scoreboard:', err);
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
