import { Component, input } from '@angular/core';
import { Card, FlippableCard } from '../../models/card';
import { CardComponent } from '../card-component/card-component';

@Component({
  imports: [CardComponent],
  selector: 'app-battle-component',
  styleUrl: './battle-component.css',
  templateUrl: './battle-component.html',
})
export class BattleComponent{
  player1Cards = input.required<(FlippableCard | null)[]>();
  player2Cards = input.required<(FlippableCard | null)[]>();
}
