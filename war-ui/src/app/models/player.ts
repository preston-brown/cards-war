import { Card, shuffle } from './card';

export class Player {
  private name: string;
  private unplayed: Card[];
  private won: Card[];

  constructor(name: string, cards: Card[] = []) {
    this.name = name;
    this.unplayed = [...cards];
    this.won = [];
  }

  addWinnings(cards: Card[]): void {
    this.won.push(...cards);
  }

  cardCount(): number {
    return this.unplayed.length + this.won.length;
  }

  getName(): string {
    return this.name;
  }

  nextCard(): Card | null {
    if (this.unplayed.length === 0) {
      this.unplayed = shuffle([...this.won]);
      this.won = [];
    }
    return this.unplayed.pop() || null;
  }

  outOfCards(): boolean {
    return this.unplayed.length === 0 && this.won.length === 0;
  }
}
