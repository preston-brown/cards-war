import { Component } from '@angular/core';

import { Card, Deck, Player, Rank, Suit } from '../../model';
import { CardComponent } from '../card-component/card-component';

@Component({
  imports: [CardComponent],
  selector: 'app-game-component',
  styleUrl: './game-component.css',
  templateUrl: './game-component.html',
})
export class GameComponent {

  rankOrder: Rank[] = [
    Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX,
    Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN,
    Rank.JACK, Rank.QUEEN, Rank.KING, Rank.ACE
  ];

  player1: Player;
  player2: Player;
  card1: Card | null = null;
  card2: Card | null = null;
  card1FaceUp = false;
  card2FaceUp = false;

  constructor() {
    const deck = new Deck();
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        deck.addCard({ suit, rank });
      }
    }
    deck.shuffle();
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
    while (!deck.empty()) {
      this.player1.addWin(deck.pop());
      this.player2.addWin(deck.pop());
    }
    this.player1.restart();
    this.player2.restart();
  }

  flipCards(): void {
    if (this.player1.empty() || this.player2.empty()) {
      return;
    }

    this.card1 = this.player1.nextCard();
    this.card2 = this.player2.nextCard();
    this.card1FaceUp = false;
    this.card2FaceUp = false;

    setTimeout(() => {
      this.card1FaceUp = true;
      console.log(`Player 1 plays ${this.card1?.rank} of ${this.card1?.suit}`);
    }, 750);

    setTimeout(() => {
      this.card2FaceUp = true;
    }, 1500);
  }

  private compareCards(card1: Card, card2: Card): number {
    const rank1Index = this.rankOrder.indexOf(card1.rank);
    const rank2Index = this.rankOrder.indexOf(card2.rank);
    return rank1Index - rank2Index;
  }

}
