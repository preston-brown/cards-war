export enum Suit {
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS',
    HEARTS = 'HEARTS',
    SPADES = 'SPADES'
}

export enum Rank {
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN',
    EIGHT = 'EIGHT',
    NINE = 'NINE',
    TEN = 'TEN',
    JACK = 'JACK',
    QUEEN = 'QUEEN',
    KING = 'KING',
    ACE = 'ACE'
}

export interface Card {
    suit: Suit;
    rank: Rank;
}

export class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
    }

    addCard(card: Card): void {
        this.cards.push(card);
    }

    addCards(cards: Card[]): void {
        this.cards.push(...cards);
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
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

    size(): number {
        return this.cards.length;
    }
}

export class Player {
    private name: string;
    private deck: Deck;
    private won: Deck;
    private currentCard: Card | null = null;

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
        this.currentCard = this.deck.pop();
        return this.currentCard;
    }

    getCurrentCard(): Card | null {
        return this.currentCard;
    }

    size(): number {
        return this.deck.size() + this.won.size();
    }

    empty(): boolean {
        return this.deck.empty();
    }

    restart(): void {
        this.deck.addCards(this.won.cards);
        this.deck.shuffle();
        this.won = new Deck();
    }
}