import { Component, signal } from '@angular/core';

import { CardComponent } from '../card-component/card-component';
import { Rank } from '../../models/rank'
import { Player } from '../../models/player'
import { Card } from '../../models/card'
import { Deck } from '../../models/deck'
import { Suit } from '../../models/suit'

@Component({
  imports: [CardComponent],
  selector: 'app-game-component',
  styleUrl: './game-component.css',
  templateUrl: './game-component.html',
})
export class GameComponent {
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

  player1: Player;
  player2: Player;
  card1: Card| null = null;
  card2: Card | null = null;
  card1FaceUp = signal(false);
  card2FaceUp = signal(false);
  warCard1Down: Card | null = null;
  warCard2Down: Card | null = null;
  warCard1Up: Card | null = null;
  warCard2Up: Card | null = null;
  warCard1DownFaceUp = signal(false);
  warCard2DownFaceUp = signal(false);
  warCard1UpFaceUp = signal(false);
  warCard2UpFaceUp = signal(false);
  nextRoundEnabled = signal(true);
  winner = signal<1 | 2 | 'tie' | null>(null);
  cardsWon = signal(0);
  private winnerTimeout?: ReturnType<typeof setTimeout>;
  firstRound: boolean = true;

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

  nextRound(): void {
    if (this.player1.outOfCards() || this.player2.outOfCards()) {
      return;
    }
    clearTimeout(this.winnerTimeout);
    this.nextRoundEnabled.set(false);
    this.winner.set(null);
    this.cardsWon.set(0);
    this.warCard1Down = null;
    this.warCard2Down = null;
    this.warCard1Up = null;
    this.warCard2Up = null;
    this.warCard1DownFaceUp.set(false);
    this.warCard2DownFaceUp.set(false);
    this.warCard1UpFaceUp.set(false);
    this.warCard2UpFaceUp.set(false);
    let playedCard1 = null;
    let playedCard2 = null;
    if (this.firstRound) {
      this.firstRound = false;
      playedCard1 = { rank: Rank.EIGHT, suit: Suit.HEARTS };
      playedCard2 = { rank: Rank.EIGHT, suit: Suit.CLUBS };
    } else {
      playedCard1 = this.player1.nextCard();
      playedCard2 = this.player2.nextCard();
    }
    this.card1 = playedCard1;
    this.card2 = playedCard2;
    this.card1FaceUp.set(false);
    this.card2FaceUp.set(false);

    setTimeout(() => {
      this.card1FaceUp.set(true);
    }, 750);

    setTimeout(() => {
      this.card2FaceUp.set(true);
    }, 1500);

    setTimeout(() => {
      const result = this.compareCards(playedCard1, playedCard2);
      if (result === 0) {
        setTimeout(() => {
          this.startWar(playedCard1, playedCard2);
        }, 750);
      } else {
        this.finishRound(result, [playedCard1, playedCard2]);
      }
    }, 2000);
  }

  private startWar(card1: Card, card2: Card): void {
    //if (!this.player1.canPlay(2) || !this.player2.canPlay(2)) {
    //  this.finishRound(0, [card1, card2]);
    //  return;
    //}

    this.warCard1Down = this.player1.nextCard();

    setTimeout(() => {
      this.warCard2Down = this.player2.nextCard();
    }, 500);

    setTimeout(() => {
      this.warCard1Up = this.player1.nextCard();
    }, 1000);

    setTimeout(() => {
      this.warCard2Up = this.player2.nextCard();
    }, 1500);

    setTimeout(() => {
      this.warCard1UpFaceUp.set(true);
      this.warCard2UpFaceUp.set(true);
    }, 2250);

    setTimeout(() => {
      const result = this.compareCards(this.warCard1Up!, this.warCard2Up!);
      this.finishRound(result, [
        card1,
        card2,
        this.warCard1Down!,
        this.warCard2Down!,
        this.warCard1Up!,
        this.warCard2Up!,
      ]);
    }, 3000);
  }

  private finishRound(result: number, cards: Card[]): void {
    this.winner.set(result > 0 ? 1 : result < 0 ? 2 : 'tie');
    this.cardsWon.set(result === 0 ? 0 : cards.length);
    if (result > 0) {
      this.player1.addWin(cards);
    } else if (result < 0) {
      this.player2.addWin(cards);
    }
    this.nextRoundEnabled.set(true);
    this.winnerTimeout = setTimeout(() => {
      this.winner.set(null);
    }, 1000);
  }

  private compareCards(card1: Card, card2: Card): number {
    const rank1Index = this.rankOrder.indexOf(card1.rank);
    const rank2Index = this.rankOrder.indexOf(card2.rank);
    return rank1Index - rank2Index;
  }
}
