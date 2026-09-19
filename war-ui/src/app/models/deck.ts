import { Card } from "./card"

export class Deck {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  addCards(cards: Card[]): void {
    this.cards.push(...cards);
  }

  empty(): boolean {
    return this.cards.length === 0;
  }

  pop(): Card {
    let card = this.cards.pop();
    if (!card) {
      throw new Error('No remaining cards in the deck');
    }
    return card;
  }

  popAll(): Card[] {
    const result = [...this.cards]
    this.cards.length = 0;
    return result
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  size(): number {
    return this.cards.length;
  }
}
