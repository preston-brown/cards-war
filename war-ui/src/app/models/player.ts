import { Card, shuffle } from "./card"

export class Player {
  private name: string;
  private deck: Card[];
  private won: Card[];

  constructor(name: string, cards: Card[] = []) {
    this.name = name;
    this.deck = [...cards];
    this.won = [];
  }

  addCards(cards: Card[]): void {
    this.won.push(...cards);
  }

  getName(): string {
    return this.name;
  }

  nextCard(): Card | null {
    if (this.deck.length === 0) {
      this.deck = shuffle([...this.won]);
      this.won = [];
    }
    return this.deck.pop() || null;
  }

  outOfCards(): boolean {
    return this.deck.length === 0 && this.won.length === 0;
  }

  cardCount(): number {
    return this.deck.length + this.won.length;
  }
}
