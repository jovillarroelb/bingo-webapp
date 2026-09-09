import { BingoLetter, PlayerBingoCard, GameMode, Language } from '../types';

export const LETTER_RANGES: Record<BingoLetter, { min: number; max: number; label: string; color: string; bgLight: string; textClass: string }> = {
  B: { min: 1, max: 15, label: 'B', color: '#EF4444', bgLight: '#FEF2F2', textClass: 'text-red-600' },
  I: { min: 16, max: 30, label: 'I', color: '#F97316', bgLight: '#FFF7ED', textClass: 'text-orange-600' },
  N: { min: 31, max: 45, label: 'N', color: '#10B981', bgLight: '#ECFDF5', textClass: 'text-emerald-600' },
  G: { min: 46, max: 60, label: 'G', color: '#3B82F6', bgLight: '#EFF6FF', textClass: 'text-blue-600' },
  O: { min: 61, max: 75, label: 'O', color: '#8B5CF6', bgLight: '#F5F3FF', textClass: 'text-purple-600' },
};

export interface NumberNicknameItem {
  title: string;
  emoji: string;
  titles: Record<Language, string>;
}

export const NUMBER_NICKNAMES: Record<number, NumberNicknameItem> = {
  1: { title: 'El Solecito', emoji: '☀️', titles: { es: 'El Solecito', en: 'Little Sun', it: 'Il Sole' } },
  2: { title: 'El Patito', emoji: '🦆', titles: { es: 'El Patito', en: 'The Little Duck', it: 'Il Paperotto' } },
  3: { title: 'El Tridente', emoji: '🔱', titles: { es: 'El Tridente', en: 'The Trident', it: 'Il Tridente' } },
  4: { title: 'La Sillita', emoji: '🪑', titles: { es: 'La Sillita', en: 'The Little Chair', it: 'La Seggiolina' } },
  5: { title: 'La Estrella', emoji: '⭐', titles: { es: 'La Estrella', en: 'The Star', it: 'La Stella' } },
  6: { title: 'El Trompo', emoji: '🌀', titles: { es: 'El Trompo', en: 'The Spinning Top', it: 'La Trottola' } },
  7: { title: 'El Bastón', emoji: '🦯', titles: { es: 'El Bastón', en: 'The Walking Stick', it: 'Il Bastone' } },
  8: { title: 'Los Lentes', emoji: '👓', titles: { es: 'Los Lentes', en: 'The Glasses', it: 'Gli Occhiali' } },
  9: { title: 'El Globito', emoji: '🎈', titles: { es: 'El Globito', en: 'The Little Balloon', it: 'Il Palloncino' } },
  10: { title: 'La Corona', emoji: '👑', titles: { es: 'La Corona', en: 'The Crown', it: 'La Corona' } },
  11: { title: 'Los Palitos', emoji: '🥢', titles: { es: 'Los Palitos', en: 'The Chopsticks', it: 'Le Bacchette' } },
  12: { title: 'La Docena de Huevos', emoji: '🥚', titles: { es: 'La Docena de Huevos', en: 'Dozen Eggs', it: 'La Dozzina d’Uova' } },
  13: { title: 'La Suerte', emoji: '🍀', titles: { es: 'La Suerte', en: 'Lucky Clover', it: 'La Buona Sorte' } },
  14: { title: 'El Corazón', emoji: '❤️', titles: { es: 'El Corazón', en: 'The Heart', it: 'Il Cuore' } },
  15: { title: 'La Niña Bonita', emoji: '🎀', titles: { es: 'La Niña Bonita', en: 'The Pretty Bow', it: 'Il Fiocchetto' } },
  16: { title: 'El Cohete', emoji: '🚀', titles: { es: 'El Cohete', en: 'The Rocket', it: 'Il Razzo' } },
  17: { title: 'El Arcoíris', emoji: '🌈', titles: { es: 'El Arcoíris', en: 'The Rainbow', it: 'L’Arcobaleno' } },
  18: { title: 'El Barquito', emoji: '⛵', titles: { es: 'El Barquito', en: 'The Sailboat', it: 'La Barchetta' } },
  19: { title: 'El Helado', emoji: '🍦', titles: { es: 'El Helado', en: 'The Ice Cream', it: 'Il Gelato' } },
  20: { title: 'La Fiesta', emoji: '🥳', titles: { es: 'La Fiesta', en: 'The Party', it: 'La Festa' } },
  21: { title: 'La Flor', emoji: '🌸', titles: { es: 'La Flor', en: 'The Flower', it: 'Il Fiore' } },
  22: { title: 'Los Dos Patitos', emoji: '🦆🦆', titles: { es: 'Los Dos Patitos', en: 'Two Little Ducks', it: 'I Due Paperotti' } },
  23: { title: 'El Payasito', emoji: '🤡', titles: { es: 'El Payasito', en: 'The Clown', it: 'Il Pagliaccio' } },
  24: { title: 'Nochebuena', emoji: '🎁', titles: { es: 'Nochebuena', en: 'Christmas Eve', it: 'La Vigilia' } },
  25: { title: 'Navidad', emoji: '🎄', titles: { es: 'Navidad', en: 'Christmas Tree', it: 'Natale' } },
  26: { title: 'El Dinosaurio', emoji: '🦖', titles: { es: 'El Dinosaurio', en: 'The Dinosaur', it: 'Il Dinosauro' } },
  27: { title: 'La Fresa', emoji: '🍓', titles: { es: 'La Fresa', en: 'The Strawberry', it: 'La Fragola' } },
  28: { title: 'La Bicicleta', emoji: '🚲', titles: { es: 'La Bicicleta', en: 'The Bicycle', it: 'La Bicicletta' } },
  29: { title: 'El Cachorrito', emoji: '🐶', titles: { es: 'El Cachorrito', en: 'The Puppy', it: 'Il Cucciolo' } },
  30: { title: 'La Manzana', emoji: '🍎', titles: { es: 'La Manzana', en: 'The Apple', it: 'La Mela' } },
  31: { title: 'El Gatito', emoji: '🐱', titles: { es: 'El Gatito', en: 'The Kitten', it: 'Il Gattino' } },
  32: { title: 'La Palmera', emoji: '🌴', titles: { es: 'La Palmera', en: 'The Palm Tree', it: 'La Palma' } },
  33: { title: 'La Sonrisa', emoji: '😁', titles: { es: 'La Sonrisa', en: 'The Big Smile', it: 'Il Sorriso' } },
  34: { title: 'La Mariposa', emoji: '🦋', titles: { es: 'La Mariposa', en: 'The Butterfly', it: 'La Farfalla' } },
  35: { title: 'El Dulce', emoji: '🍭', titles: { es: 'El Dulce', en: 'The Lollipop', it: 'Il Lecca-Lecca' } },
  36: { title: 'El Robot', emoji: '🤖', titles: { es: 'El Robot', en: 'The Robot', it: 'Il Robot' } },
  37: { title: 'La Guitarra', emoji: '🎸', titles: { es: 'La Guitarra', en: 'The Guitar', it: 'La Chitarra' } },
  38: { title: 'El Osito', emoji: '🧸', titles: { es: 'El Osito', en: 'The Teddy Bear', it: 'L’Orsetto' } },
  39: { title: 'El Tren', emoji: '🚂', titles: { es: 'El Tren', en: 'The Steam Train', it: 'Il Trenino' } },
  40: { title: 'El Dragón', emoji: '🐉', titles: { es: 'El Dragón', en: 'The Dragon', it: 'Il Dragone' } },
  41: { title: 'El Tambor', emoji: '🥁', titles: { es: 'El Tambor', en: 'The Drum', it: 'Il Tamburo' } },
  42: { title: 'El Delfín', emoji: '🐬', titles: { es: 'El Delfín', en: 'The Dolphin', it: 'Il Delfino' } },
  43: { title: 'El Auto de Carreras', emoji: '🏎️', titles: { es: 'El Auto de Carreras', en: 'The Race Car', it: 'L’Auto da Corsa' } },
  44: { title: 'El Cuarteto Alegre', emoji: '🎶', titles: { es: 'El Cuarteto Alegre', en: 'Musical Notes', it: 'Le Note Musicali' } },
  45: { title: 'El Castillo', emoji: '🏰', titles: { es: 'El Castillo', en: 'The Castle', it: 'Il Castello' } },
  46: { title: 'El Pastelito', emoji: '🧁', titles: { es: 'El Pastelito', en: 'The Cupcake', it: 'Il Dolcetto' } },
  47: { title: 'El Pirata', emoji: '🏴‍☠️', titles: { es: 'El Pirata', en: 'The Pirate', it: 'Il Pirata' } },
  48: { title: 'El León Valiente', emoji: '🦁', titles: { es: 'El León Valiente', en: 'The Brave Lion', it: 'Il Leone Coraggioso' } },
  49: { title: 'El Pulpo', emoji: '🐙', titles: { es: 'El Pulpo', en: 'The Octopus', it: 'Il Polpo' } },
  50: { title: 'Medio Siglo / Cumple', emoji: '🎂', titles: { es: 'Medio Siglo / Cumple', en: 'Half Century Birthday', it: 'Mezzo Secolo / Compleanno' } },
  51: { title: 'El Astronauta', emoji: '👨‍🚀', titles: { es: 'El Astronauta', en: 'The Astronaut', it: 'L’Astronauta' } },
  52: { title: 'La Sandía', emoji: '🍉', titles: { es: 'La Sandía', en: 'The Watermelon', it: 'L’Anguria' } },
  53: { title: 'El Mago', emoji: '🧙‍♂️', titles: { es: 'El Mago', en: 'The Wizard', it: 'Il Mago' } },
  54: { title: 'La Abejita', emoji: '🐝', titles: { es: 'La Abejita', en: 'The Little Bee', it: 'L’Ape' } },
  55: { title: 'Los Mellizos', emoji: '👯', titles: { es: 'Los Mellizos', en: 'The Twins', it: 'I Gemelli' } },
  56: { title: 'El Unicornio', emoji: '🦄', titles: { es: 'El Unicornio', en: 'The Unicorn', it: 'L’Unicorno' } },
  57: { title: 'La Pizza', emoji: '🍕', titles: { es: 'La Pizza', en: 'The Pizza', it: 'La Pizza' } },
  58: { title: 'El Avión', emoji: '✈️', titles: { es: 'El Avión', en: 'The Airplane', it: 'L’Aereo' } },
  59: { title: 'El Oso Panda', emoji: '🐼', titles: { es: 'El Oso Panda', en: 'The Panda Bear', it: 'L’Orso Panda' } },
  60: { title: 'El Diamante', emoji: '💎', titles: { es: 'El Diamante', en: 'The Diamond', it: 'Il Diamante' } },
  61: { title: 'El Pingüino', emoji: '🐧', titles: { es: 'El Pingüino', en: 'The Penguin', it: 'Il Pinguino' } },
  62: { title: 'La Sirena', emoji: '🧜‍♀️', titles: { es: 'La Sirena', en: 'The Mermaid', it: 'La Sirena' } },
  63: { title: 'El Coala', emoji: '🐨', titles: { es: 'El Coala', en: 'The Koala', it: 'Il Koala' } },
  64: { title: 'El Globo Aerostático', emoji: '🎈', titles: { es: 'El Globo Aerostático', en: 'Hot Air Balloon', it: 'La Mongolfiera' } },
  65: { title: 'La Tortuga', emoji: '🐢', titles: { es: 'La Tortuga', en: 'The Turtle', it: 'La Tartaruga' } },
  66: { title: 'Las Dos Cerezas', emoji: '🍒', titles: { es: 'Las Dos Cerezas', en: 'Two Cherries', it: 'Le Due Ciliegie' } },
  67: { title: 'El Planeta Saturno', emoji: '🪐', titles: { es: 'El Planeta Saturno', en: 'Planet Saturn', it: 'Il Pianeta Saturno' } },
  68: { title: 'El Safari', emoji: '🦒', titles: { es: 'El Safari', en: 'The Safari', it: 'Il Safari' } },
  69: { title: 'El Remolino Mágico', emoji: '🌀', titles: { es: 'El Remolino Mágico', en: 'Magic Whirlpool', it: 'Il Vortice Magico' } },
  70: { title: 'La Medalla de Oro', emoji: '🥇', titles: { es: 'La Medalla de Oro', en: 'The Gold Medal', it: 'La Medaglia d’Oro' } },
  71: { title: 'El Reloj Cuco', emoji: '⏰', titles: { es: 'El Reloj Cuco', en: 'The Cuckoo Clock', it: 'L’Orologio a Cucù' } },
  72: { title: 'El Faro de Luz', emoji: '🏮', titles: { es: 'El Faro de Luz', en: 'The Lighthouse', it: 'Il Faro di Luce' } },
  73: { title: 'El Helado de Chocolate', emoji: '🍫', titles: { es: 'El Helado de Chocolate', en: 'Chocolate Bar', it: 'Il Cioccolato' } },
  74: { title: 'La Luna Llena', emoji: '🌕', titles: { es: 'La Luna Llena', en: 'The Full Moon', it: 'La Luna Piena' } },
  75: { title: '¡La Última Bola!', emoji: '🏁', titles: { es: '¡La Última Bola!', en: 'The Final Ball!', it: '¡L’Ultima Pallina!' } },
};

export function getNumberNickname(
  num: number,
  lang: Language = 'es'
): { title: string; emoji: string } {
  const item = NUMBER_NICKNAMES[num];
  if (!item) return { title: '', emoji: '⭐' };
  const localizedTitle = item.titles?.[lang] || item.titles?.es || item.title || '';
  return {
    emoji: item.emoji,
    title: localizedTitle,
  };
}

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
