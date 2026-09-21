import { Component, Input } from '@angular/core';
import { Suit } from '../../models/suit';
import { Rank } from '../../models/rank';
import { FlippableCard } from '../../models/card';

@Component({
  imports: [],
  selector: 'app-card-component',
  styleUrl: './card-component.css',
  templateUrl: './card-component.html',
})
export class CardComponent {
  @Input({ required: true }) card!: FlippableCard;

  get suitSymbol(): string {
    switch (this.card.suit) {
      case Suit.CLUBS:
        return '♣';
      case Suit.DIAMONDS:
        return '♦';
      case Suit.HEARTS:
        return '♥';
      case Suit.SPADES:
        return '♠';
      default:
        throw new Error(`Unknown suit: ${this.card.suit}`);
    }
  }

  get colorClass(): string {
    switch (this.card.suit) {
      case Suit.CLUBS:
      case Suit.SPADES:
        return 'black-suit';
      case Suit.DIAMONDS:
      case Suit.HEARTS:
        return 'red-suit';
      default:
        throw new Error(`Unknown suit: ${this.card.suit}`);
    }
  }

  get rankSymbol(): string {
    switch (this.card.rank) {
      case Rank.TWO:
        return '2';
      case Rank.THREE:
        return '3';
      case Rank.FOUR:
        return '4';
      case Rank.FIVE:
        return '5';
      case Rank.SIX:
        return '6';
      case Rank.SEVEN:
        return '7';
      case Rank.EIGHT:
        return '8';
      case Rank.NINE:
        return '9';
      case Rank.TEN:
        return '10';
      case Rank.JACK:
        return 'J';
      case Rank.QUEEN:
        return 'Q';
      case Rank.KING:
        return 'K';
      case Rank.ACE:
        return 'A';
      default:
        throw new Error(`Unknown rank: ${this.card.rank}`);
    }
  }
}
