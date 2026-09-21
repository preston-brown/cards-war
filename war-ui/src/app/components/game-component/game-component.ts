import { Component, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';

import { Card, FlippableCard } from '../../models/card';
import { Rank } from '../../models/rank';
import { Player } from '../../models/player';
import { shuffle } from '../../models/card';
import { Suit } from '../../models/suit';
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
  player1Cards = signal<(FlippableCard | null)[]>([]);
  player2Cards = signal<(FlippableCard | null)[]>([]);
  battleMessage = signal<string | null>(null);
  battleMessageType = signal<'winner' | 'war'>('winner');

  private desiredCardCount = 1;
  private battleMessageTimer: ReturnType<typeof setTimeout> | undefined;

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
    if (this.battleMessageTimer !== undefined) {
      clearTimeout(this.battleMessageTimer);
    }
  }

  drawPlayer1Card(): void {
    this.drawPlayerCard(this.player1, this.player1Cards);
  }

  drawPlayer2Card(): void {
    this.drawPlayerCard(this.player2, this.player2Cards);
  }

  private drawPlayerCard(player: Player, cards: WritableSignal<(FlippableCard | null)[]>): void {
    if (cards().length >= this.desiredCardCount) {
      return;
    }
    const card = player.nextCard();
    if (card) {
      cards.set([...cards(), { ...card, faceUp: false }]);
    } else {
      cards.set([...cards(), null]);
    }
    if (
      this.player1Cards().length === this.desiredCardCount &&
      this.player2Cards().length === this.desiredCardCount
    ) {
      this.resolveBattle();
    }
  }

  private async resolveBattle(): Promise<void> {
    await this.pause(300);
    this.flipLastCard(this.player1Cards);
    await this.pause(300);
    this.flipLastCard(this.player2Cards);
    await this.pause(300);
    const card1 = this.player1Cards().at(-1) || null;
    const card2 = this.player2Cards().at(-1) || null;
    const winner = this.calculateWinner(card1, card2);
    if (winner === null) {
      await this.pause(300);
      this.showBattleMessage('War!', 'war');
      this.desiredCardCount += 2;
    } else {
      this.handleWinner(winner);
    }
  }

  private async handleWinner(winner: 1 | 2) {
    await this.pause(300);
    this.showBattleMessage(`Player ${winner} wins the battle!`, 'winner');
    await this.pause(1000);
    this.flipAllCards(this.player1Cards);
    this.flipAllCards(this.player2Cards);
    await this.pause(1000);
    const cards = [...this.player1Cards(), ...this.player2Cards()].filter(
      (card): card is FlippableCard => card !== null,
    );
    if (winner === 1) {
      this.player1.addWinnings(cards);
    } else {
      this.player2.addWinnings(cards);
    }
    this.player1Cards.set([]);
    this.player2Cards.set([]);
    this.desiredCardCount = 1;
  }

  private flipAllCards(cards: WritableSignal<(FlippableCard | null)[]>): void {
    cards.set(cards().map((card) => (card ? { ...card, faceUp: true } : null)));
  }

  private flipLastCard(cards: WritableSignal<(FlippableCard | null)[]>): void {
    const currentCards = cards();
    if (currentCards.length === 0) {
      return;
    }
    const lastIndex = currentCards.length - 1;
    const newCards = currentCards.map((card, index) =>
      card && index === lastIndex ? { ...card, faceUp: true } : card,
    );
    cards.set(newCards);
  }

  private showBattleMessage(message: string, type: 'winner' | 'war'): void {
    if (this.battleMessageTimer !== undefined) {
      clearTimeout(this.battleMessageTimer);
    }

    this.battleMessage.set(null);
    this.battleMessageTimer = setTimeout(() => {
      this.battleMessageType.set(type);
      this.battleMessage.set(message);
      this.battleMessageTimer = undefined;
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

  private pause(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
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
