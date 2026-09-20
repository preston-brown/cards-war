import { Component, OnDestroy, signal } from '@angular/core';

import { Card } from '../../models/card'
import { Rank } from '../../models/rank'
import { Player } from '../../models/player'
import { shuffle } from '../../models/card'
import { Suit } from '../../models/suit'
import { BattleComponent } from '../battle-component/battle-component';

@Component({
  imports: [BattleComponent],
  selector: 'app-game-component',
  styleUrl: './game-component.css',
  templateUrl: './game-component.html',
})
export class GameComponent implements OnDestroy {
  player1: Player;
  player2: Player;
  player1Cards: (Card | null)[] = [];
  player2Cards: (Card | null)[] = [];
  desiredCardCount = 1;
  winnerMessage = signal<string | null>(null);
  winnerMessageType = signal<'winner' | 'war'>('winner');
  private winnerMessageTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const cards = [];
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        cards.push({ suit, rank });
      }
    }
    const shuffledCards = shuffle(cards);
    const half = Math.floor(shuffledCards.length / 2);
    const cards1 = shuffledCards.slice(0, half);
    const cards2 = shuffledCards.slice(half);
    cards1.push({ suit: Suit.HEARTS, rank: Rank.ACE });
    cards2.push({ suit: Suit.SPADES, rank: Rank.ACE });
    this.player1 = new Player('Player 1', cards1);
    this.player2 = new Player('Player 2', cards2);
  }

  ngOnDestroy(): void {
    if (this.winnerMessageTimer !== undefined) {
      clearTimeout(this.winnerMessageTimer);
    }
  }

  drawPlayer1Card(): void {
    if (this.player1Cards.length >= this.desiredCardCount) {
      return;
    }
    const card = this.player1.nextCard();
    this.player1Cards = [...this.player1Cards, card];
    this.foo();
  }

  drawPlayer2Card(): void {
    if (this.player2Cards.length >= this.desiredCardCount) {
      return;
    }
    const card = this.player2.nextCard();
    this.player2Cards = [...this.player2Cards, card];
    this.foo();
  }

  private foo(): void {
    if (this.player1Cards.length === this.desiredCardCount && this.player2Cards.length === this.desiredCardCount) {
      const card1 = this.player1Cards[this.desiredCardCount - 1];
      const card2 = this.player2Cards[this.desiredCardCount - 1];
      const winner = this.calculateWinner(card1, card2);
      if (winner === null) {
        this.showWarMessage();
        this.desiredCardCount += 2;
      } else {
        this.showWinnerMessage(`Player ${winner} wins the battle!`);
        const cards = [...this.player1Cards, ...this.player2Cards]
          .filter((card): card is Card => card !== null);
        if (winner === 1) {
          this.player1.addCards(cards);
        } else {
          this.player2.addCards(cards);
        }

        this.player1Cards = [];
        this.player2Cards = [];
        this.desiredCardCount = 1;
      }
    }
  }

  private showWarMessage(): void {
    this.showWinnerMessage('War!', 'war');
  }

  private showWinnerMessage(message: string, type: 'winner' | 'war' = 'winner'): void {
    if (this.winnerMessageTimer !== undefined) {
      clearTimeout(this.winnerMessageTimer);
    }

    this.winnerMessage.set(null);
    this.winnerMessageType.set(type);
    this.winnerMessageTimer = setTimeout(() => {
      this.winnerMessage.set(message);
      this.winnerMessageTimer = undefined;
    }, 0);
  }

  private calculateWinner(card1: Card | null, card2: Card | null): 1 | 2 | null {
    if (card1 === null && card2 === null) {
      return null;
    } else if (card1 === null) {
      return 2;
    } else if (card2 === null) {
      return 1;
    }
    const rank1 = this.rankOrder.indexOf(card1.rank);
    const rank2 = this.rankOrder.indexOf(card2.rank);
    if (rank1 > rank2) {
      return 1;
    } else if (rank2 > rank1) {
      return 2;
    } else {
      return null;
    }
  }

  private readonly rankOrder: Rank[] = [
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
}
