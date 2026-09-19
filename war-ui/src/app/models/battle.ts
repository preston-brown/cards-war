import { Card } from './card';
import { Rank } from './rank';

export class Battle {
  rankOrder: Rank[] = [
    Rank.TWO,
    Rank.THREE,
    Rank.FOUR,
    Rank.FIVE,
    Rank.SIX,
    Rank.SEVEN,
    Rank.EIGHT,
    Rank.NINE,
    Rank.TEN,
    Rank.JACK,
    Rank.QUEEN,
    Rank.KING,
    Rank.ACE,
  ];
  private cards1: Card[] = [];
  private cards2: Card[] = [];

  addCards(card1: Card, card2: Card) {
    this.cards1.push(card1);
    this.cards2.push(card2);
  }

  getWinner(): 1 | 2 | null {
    const card1 = this.cards1.at(-1);
    const card2 = this.cards2.at(-1);
    if (!card1 || !card2) {
      return null;
    }
    const comparison = this.compareCards(card1, card2);
    if (comparison > 0) {
      return 1;
    } else if (comparison < 0) {
      return 2;
    } else {
      return null;
    }
  }

  private compareCards(card1: Card, card2: Card): number {
    const rank1Index = this.rankOrder.indexOf(card1.rank);
    const rank2Index = this.rankOrder.indexOf(card2.rank);
    return rank1Index - rank2Index;
  }
}
