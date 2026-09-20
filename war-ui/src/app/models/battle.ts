import { Card } from './card';
import { Rank } from './rank';

export class Battle {
  private rankOrder: Rank[] = [
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
  private readonly cards1: (Card | null)[];
  private readonly cards2: (Card | null)[];

  constructor(cards1: readonly (Card | null)[] = [], cards2: readonly (Card | null)[] = []) {
    this.cards1 = [...cards1];
    this.cards2 = [...cards2];
  }

  withCards(card1: Card | null, card2: Card | null): Battle {
    return new Battle([...this.cards1, card1], [...this.cards2, card2]);
  }

  getCard(player: 1 | 2, position: number): Card | null {
    if (player === 1) {
      return this.cards1.at(position) || null;
    } else {
      return this.cards2.at(position) || null;
    }
  }

  getCards(): Card[] {
    return [...this.cards1, ...this.cards2]
      .filter((card): card is Card => card !== null);
  }

  getWinner(): 1 | 2 | null {
    return this.getWinnerAt(this.size() - 1);
  }

  getWinnerAt(position: number): 1 | 2 | null {
    const card1 = this.cards1.at(position);
    const card2 = this.cards2.at(position);
    if (card1 === undefined || card2 === undefined) {
      throw new Error('Battle has no cards to determine a winner');
    }
    if (card1 === null || card2 === null) {
      return card1 ? 1 : 2;
    }
    const comparison = this.compareCards(card1, card2);
    if (comparison > 0) {
      return 1;
    } else if (comparison < 0) {
      return 2;
    }
    return null;
  }

  size(): number {
    return this.cards1.length;
  }

  private compareCards(card1: Card, card2: Card): number {
    const rank1Index = this.rankOrder.indexOf(card1.rank);
    const rank2Index = this.rankOrder.indexOf(card2.rank);
    return rank1Index - rank2Index;
  }
}
