import { BingoLetter, PlayerBingoCard, GameMode } from '../types';

export const LETTER_RANGES: Record<BingoLetter, { min: number; max: number; label: string; color: string; bgLight: string; textClass: string }> = {
  B: { min: 1, max: 15, label: 'B', color: '#EF4444', bgLight: '#FEF2F2', textClass: 'text-red-600' },
  I: { min: 16, max: 30, label: 'I', color: '#F97316', bgLight: '#FFF7ED', textClass: 'text-orange-600' },
  N: { min: 31, max: 45, label: 'N', color: '#10B981', bgLight: '#ECFDF5', textClass: 'text-emerald-600' },
  G: { min: 46, max: 60, label: 'G', color: '#3B82F6', bgLight: '#EFF6FF', textClass: 'text-blue-600' },
  O: { min: 61, max: 75, label: 'O', color: '#8B5CF6', bgLight: '#F5F3FF', textClass: 'text-purple-600' },
};

export const NUMBER_NICKNAMES: Record<number, { title: string; emoji: string }> = {
  1: { title: 'El Solecito', emoji: '☀️' },
  2: { title: 'El Patito', emoji: '🦆' },
  3: { title: 'El Tridente', emoji: '🔱' },
  4: { title: 'La Sillita', emoji: '🪑' },
  5: { title: 'La Estrella', emoji: '⭐' },
  6: { title: 'El Trompo', emoji: '🌀' },
  7: { title: 'El Bastón', emoji: '🦯' },
  8: { title: 'Los Lentes', emoji: '👓' },
  9: { title: 'El Globito', emoji: '🎈' },
  10: { title: 'La Corona', emoji: '👑' },
  11: { title: 'Los Palitos', emoji: '🥢' },
  12: { title: 'La Docena de Huevos', emoji: '🥚' },
  13: { title: 'La Suerte', emoji: '🍀' },
  14: { title: 'El Corazón', emoji: '❤️' },
  15: { title: 'La Niña Bonita', emoji: '🎀' },
  16: { title: 'El Cohete', emoji: '🚀' },
  17: { title: 'El Arcoíris', emoji: '🌈' },
  18: { title: 'El Barquito', emoji: '⛵' },
  19: { title: 'El Helado', emoji: '🍦' },
  20: { title: 'La Fiesta', emoji: '🥳' },
  21: { title: 'La Flor', emoji: '🌸' },
  22: { title: 'Los Dos Patitos', emoji: '🦆🦆' },
  23: { title: 'El Payasito', emoji: '🤡' },
  24: { title: 'Nochebuena', emoji: '🎁' },
  25: { title: 'Navidad', emoji: '🎄' },
  26: { title: 'El Dinosaurio', emoji: '🦖' },
  27: { title: 'La Fresa', emoji: '🍓' },
  28: { title: 'La Bicicleta', emoji: '🚲' },
  29: { title: 'El Cachorrito', emoji: '🐶' },
  30: { title: 'La Manzana', emoji: '🍎' },
  31: { title: 'El Gatito', emoji: '🐱' },
  32: { title: 'La Palmera', emoji: '🌴' },
  33: { title: 'La Sonrisa', emoji: '😁' },
  34: { title: 'La Mariposa', emoji: '🦋' },
  35: { title: 'El Dulce', emoji: '🍭' },
  36: { title: 'El Robot', emoji: '🤖' },
  37: { title: 'La Guitarra', emoji: '🎸' },
  38: { title: 'El Osito', emoji: '🧸' },
  39: { title: 'El Tren', emoji: '🚂' },
  40: { title: 'El Dragón', emoji: '🐉' },
  41: { title: 'El Tambor', emoji: '🥁' },
  42: { title: 'El Delfín', emoji: '🐬' },
  43: { title: 'El Auto de Carreras', emoji: '🏎️' },
  44: { title: 'El Cuarteto Alegre', emoji: '🎶' },
  45: { title: 'El Castillo', emoji: '🏰' },
  46: { title: 'El Pastelito', emoji: '🧁' },
  47: { title: 'El Pirata', emoji: '🏴‍☠️' },
  48: { title: 'El León Valiente', emoji: '🦁' },
  49: { title: 'El Pulpo', emoji: '🐙' },
  50: { title: 'Medio Siglo / Cumple', emoji: '🎂' },
  51: { title: 'El Astronauta', emoji: '👨‍🚀' },
  52: { title: 'La Sandía', emoji: '🍉' },
  53: { title: 'El Mago', emoji: '🧙‍♂️' },
  54: { title: 'La Abejita', emoji: '🐝' },
  55: { title: 'Los Mellizos', emoji: '👯' },
  56: { title: 'El Unicornio', emoji: '🦄' },
  57: { title: 'La Pizza', emoji: '🍕' },
  58: { title: 'El Avión', emoji: '✈️' },
  59: { title: 'El Oso Panda', emoji: '🐼' },
  60: { title: 'El Diamante', emoji: '💎' },
  61: { title: 'El Pingüino', emoji: '🐧' },
  62: { title: 'La Sirena', emoji: '🧜‍♀️' },
  63: { title: 'El Coala', emoji: '🐨' },
  64: { title: 'El Globo Aerostático', emoji: '🎈' },
  65: { title: 'La Tortuga', emoji: '🐢' },
  66: { title: 'Las Dos Cerezas', emoji: '🍒' },
  67: { title: 'El Planeta Saturno', emoji: '🪐' },
  68: { title: 'El Safari', emoji: '🦒' },
  69: { title: 'El Remolino Mágico', emoji: '🌀' },
  70: { title: 'La Medalla de Oro', emoji: '🥇' },
  71: { title: 'El Reloj Cuco', emoji: '⏰' },
  72: { title: 'El Faro de Luz', emoji: '🏮' },
  73: { title: 'El Helado de Chocolate', emoji: '🍫' },
  74: { title: 'La Luna Llena', emoji: '🌕' },
  75: { title: '¡La Última Bola!', emoji: '🏁' },
};

export function getLetterForNumber(num: number): BingoLetter {
  if (num <= 15) return 'B';
  if (num <= 30) return 'I';
  if (num <= 45) return 'N';
  if (num <= 60) return 'G';
  return 'O';
}

function pickRandomSorted(min: number, max: number, count: number): number[] {
  const pool: number[] = [];
  for (let i = min; i <= max; i++) pool.push(i);
  
  // Fisher-Yates shuffle sample
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}

export const CHILD_THEMES = [
  { name: 'Aventura Espacial', emoji: '🚀', border: 'border-blue-400', headerBg: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700' },
  { name: 'Selva Feliz', emoji: '🦁', border: 'border-emerald-400', headerBg: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  { name: 'Estrellita Dulce', emoji: '⭐', border: 'border-amber-400', headerBg: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800' },
  { name: 'Dino Parque', emoji: '🦖', border: 'border-rose-400', headerBg: 'bg-rose-600', badge: 'bg-rose-100 text-rose-700' },
  { name: 'Fantasía Mágica', emoji: '🦄', border: 'border-purple-400', headerBg: 'bg-purple-600', badge: 'bg-purple-100 text-purple-700' },
  { name: 'Fondo Marino', emoji: '🐬', border: 'border-cyan-400', headerBg: 'bg-cyan-600', badge: 'bg-cyan-100 text-cyan-800' },
];

export function generateSingleBingoCard(cardIndex: number, playerName?: string): PlayerBingoCard {
  const bNums = pickRandomSorted(1, 15, 5);
  const iNums = pickRandomSorted(16, 30, 5);
  const nNums = pickRandomSorted(31, 45, 4); // 4 numbers, middle is FREE
  const gNums = pickRandomSorted(46, 60, 5);
  const oNums = pickRandomSorted(61, 75, 5);

  const nColumnWithFree: (number | 'FREE')[] = [
    nNums[0],
    nNums[1],
    'FREE',
    nNums[2],
    nNums[3],
  ];

  const theme = CHILD_THEMES[cardIndex % CHILD_THEMES.length];

  return {
    id: `card-${cardIndex + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    cardIndex: cardIndex + 1,
    playerName: playerName || `Jugador #${cardIndex + 1}`,
    grid: {
      B: bNums,
      I: iNums,
      N: nColumnWithFree,
      G: gNums,
      O: oNums,
    },
    colorTheme: theme.name,
    marks: { FREE: true },
  };
}

export function generateBingoCards(count: number, customNames: string[] = []): PlayerBingoCard[] {
  const cards: PlayerBingoCard[] = [];
  for (let i = 0; i < count; i++) {
    const name = customNames[i] || `Cartón #${i + 1}`;
    cards.push(generateSingleBingoCard(i, name));
  }
  return cards;
}

export interface CardCheckResult {
  isWin: boolean;
  isBingo: boolean;
  mode: GameMode;
  winningPatternDescription?: string;
  completedRows: number[];
  completedCols: number[];
  completedLines: number;
  totalMarkedCount: number;
  unmarkedCount: number;
  missingNumbers: number[];
  matrix: boolean[][];
}

export function checkCardStatus(
  card: PlayerBingoCard,
  drawnNumbers: number[],
  mode: GameMode = 'full_card'
): CardCheckResult {
  const drawnSet = new Set(drawnNumbers);
  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];
  
  // Build 5x5 boolean matrix [row][col]
  const matrix: boolean[][] = Array.from({ length: 5 }, () => Array(5).fill(false));
  const missingNumbers: number[] = [];
  let markedCount = 0;

  for (let colIdx = 0; colIdx < 5; colIdx++) {
    const letter = letters[colIdx];
    const colNums = card.grid[letter];
    for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
      const val = colNums[rowIdx];
      if (val === 'FREE' || drawnSet.has(val)) {
        matrix[rowIdx][colIdx] = true;
        markedCount++;
      } else {
        missingNumbers.push(val);
      }
    }
  }

  // Check rows
  const completedRows: number[] = [];
  for (let r = 0; r < 5; r++) {
    if (matrix[r].every(Boolean)) {
      completedRows.push(r);
    }
  }

  // Check columns
  const completedCols: number[] = [];
  for (let c = 0; c < 5; c++) {
    let colFull = true;
    for (let r = 0; r < 5; r++) {
      if (!matrix[r][c]) {
        colFull = false;
        break;
      }
    }
    if (colFull) {
      completedCols.push(c);
    }
  }

  // Check diagonals
  let diag1 = true;
  let diag2 = true;
  for (let i = 0; i < 5; i++) {
    if (!matrix[i][i]) diag1 = false;
    if (!matrix[i][4 - i]) diag2 = false;
  }
  let completedLines = completedRows.length + completedCols.length + (diag1 ? 1 : 0) + (diag2 ? 1 : 0);

  const isBingo = markedCount === 25;

  let isWin = false;
  let winningPatternDescription = '';

  if (mode === 'line_row') {
    if (completedRows.length > 0) {
      isWin = true;
      const rowLabels = completedRows.map((r) => `Fila ${r + 1}`).join(', ');
      winningPatternDescription = `¡Línea Horizontal (${rowLabels})!`;
    }
  } else if (mode === 'line_col') {
    if (completedCols.length > 0) {
      isWin = true;
      const colLabels = completedCols.map((c) => `Columna ${letters[c]}`).join(', ');
      winningPatternDescription = `¡Línea Vertical (${colLabels})!`;
    }
  } else {
    // 'full_card'
    if (isBingo) {
      isWin = true;
      winningPatternDescription = '¡Cartón Lleno Completo (25 números)!';
    }
  }

  return {
    isWin,
    isBingo,
    mode,
    winningPatternDescription,
    completedRows,
    completedCols,
    completedLines,
    totalMarkedCount: markedCount,
    unmarkedCount: 25 - markedCount,
    missingNumbers,
    matrix,
  };
}
