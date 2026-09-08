import { PlayerBingoCard } from '../types';
import { generateSingleBingoCard } from './bingoData';

const PARTICIPANTS_STORAGE_KEY = 'bingo_familiar_participants_v1';
const CARDS_PER_PARTICIPANT_STORAGE_KEY = 'bingo_familiar_cards_per_participant_v1';

export const DEFAULT_PARTICIPANTS: string[] = [
  'Lucas (7 años)',
  'Sofía (5 años)',
  'Papá',
  'Mamá',
];

export function getSavedParticipants(): string[] {
  if (typeof window === 'undefined') return DEFAULT_PARTICIPANTS;
  try {
    const raw = localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
    if (!raw) return DEFAULT_PARTICIPANTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter((p) => typeof p === 'string' && p.trim().length > 0);
    }
    return DEFAULT_PARTICIPANTS;
  } catch (err) {
    console.warn('Error reading participants from localStorage:', err);
    return DEFAULT_PARTICIPANTS;
  }
}

export function saveParticipants(participants: string[]): void {
  try {
    const valid = participants.map((p) => p.trim()).filter((p) => p.length > 0);
    localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(valid.length > 0 ? valid : DEFAULT_PARTICIPANTS));
  } catch (err) {
    console.warn('Error saving participants to localStorage:', err);
  }
}

export function getSavedCardsPerParticipant(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(CARDS_PER_PARTICIPANT_STORAGE_KEY);
    if (!raw) return 1;
    const val = parseInt(raw, 10);
    return isNaN(val) || val < 1 ? 1 : Math.min(val, 6);
  } catch (err) {
    console.warn('Error reading cards per participant from localStorage:', err);
    return 1;
  }
}

export function saveCardsPerParticipant(count: number): void {
  try {
    const safeCount = Math.max(1, Math.min(count, 6));
    localStorage.setItem(CARDS_PER_PARTICIPANT_STORAGE_KEY, String(safeCount));
  } catch (err) {
    console.warn('Error saving cards per participant to localStorage:', err);
  }
}

export function generateCardsForParticipants(
  participants: string[],
  cardsPerParticipant: number
): PlayerBingoCard[] {
  const cards: PlayerBingoCard[] = [];
  let globalCardIndex = 0;

  participants.forEach((name) => {
    const cleanName = name.trim() || 'Jugador';
    for (let c = 0; c < cardsPerParticipant; c++) {
      globalCardIndex++;
      const displayName =
        cardsPerParticipant > 1 ? `${cleanName} (Cartón ${c + 1})` : cleanName;
      cards.push(generateSingleBingoCard(globalCardIndex - 1, displayName));
    }
  });

  return cards;
}
