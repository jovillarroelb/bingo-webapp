export type BingoLetter = 'B' | 'I' | 'N' | 'G' | 'O';

export interface DrawnBall {
  number: number;
  letter: BingoLetter;
  timestamp: number;
  nickname?: string;
}

export interface BingoCardColumn {
  letter: BingoLetter;
  numbers: (number | 'FREE')[];
}

export interface PlayerBingoCard {
  id: string;
  cardIndex: number;
  playerName: string;
  grid: Record<BingoLetter, (number | 'FREE')[]>;
  colorTheme: string;
  marks?: Record<string, boolean>; // for digital play
}

export type InkMode = 'color' | 'bw';
export type CardsPerPage = 2 | 4;

export type GameMode = 'line_row' | 'line_col' | 'full_card';

export interface ScoreRecord {
  id: string;
  playerName: string;
  mode: GameMode;
  timestamp: number;
  ballsDrawnCount: number;
  cardIndex?: number;
  winningPattern?: string;
}

export type Language = 'es' | 'en' | 'it';

export interface PlayerScoreSummary {
  name: string;
  totalWins: number;
  winsByMode: Record<GameMode, number>;
  lastWinTimestamp?: number;
}
