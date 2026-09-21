import { Rank } from './rank';
import { Suit } from './suit';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface FlippableCard {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}