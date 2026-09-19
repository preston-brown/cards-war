import { Component, Input, Signal } from '@angular/core';
import { Suit } from '../../models/suit'
import { Rank } from '../../models/rank'

@Component({
  imports: [],
  selector: 'app-card-component',
  styleUrl: './card-component.css',
  templateUrl: './card-component.html',
})
export class CardComponent {

  @Input({ required: true }) suit!: Suit;
  @Input({ required: true }) rank!: Rank;
  @Input({ required: true }) faceUp!: Signal<boolean>;

  get suitSymbol(): string {
    switch (this.suit) {
      case Suit.CLUBS:
        return '\u2663';
      case Suit.DIAMONDS:
        return '\u2666';
      case Suit.HEARTS:
        return '\u2665';
      case Suit.SPADES:
        return '\u2660';
      default:
        throw new Error(`Unknown suit: ${this.suit}`);
    }
  }

  get colorClass(): string {
    switch (this.suit) {
      case Suit.CLUBS:
      case Suit.SPADES:
        return 'black-suit';
      case Suit.DIAMONDS:
      case Suit.HEARTS:
        return 'red-suit';
      default:
        throw new Error(`Unknown suit: ${this.suit}`);
    }
  }

  get rankSymbol(): string {
    switch (this.rank) {
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
        throw new Error(`Unknown rank: ${this.rank}`);
    }
  }

}

