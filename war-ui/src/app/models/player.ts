import { Card } from "./card"
import { Deck } from "./deck"

export class Player {
  private name: string;
  private deck: Deck;
  private won: Deck;

  constructor(name: string) {
    this.name = name;
    this.deck = new Deck();
    this.won = new Deck();
  }

  addWin(spoils: Card | Card[]): void {
    if (Array.isArray(spoils)) {
      this.won.addCards(spoils);
    } else {
      this.won.addCard(spoils);
    }
  }

  nextCard(): Card {
    return this.deck.pop();
  }

  size(): number {
    return this.deck.size() + this.won.size();
  }

  outOfCards(): boolean {
    return this.deck.size() == 0 && this.won.size() == 0;
  }

  restart(): void {
    this.deck.addCards(this.won.popAll());
    this.deck.shuffle();
  }
}
