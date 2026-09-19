import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rank, Suit } from '../../model';
import { GameComponent } from './game-component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reveal the first card after the timed delay', async () => {
    component.card1 = { suit: Suit.CLUBS, rank: Rank.ACE };
    component.card2 = { suit: Suit.HEARTS, rank: Rank.KING };
    component.card1FaceUp = false;
    component.card2FaceUp = false;

    fixture.detectChanges();
    component.flipCards();
    fixture.detectChanges();

    expect(component.card1FaceUp).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 800));
    fixture.detectChanges();

    expect(component.card1FaceUp).toBe(true);
  });
});
