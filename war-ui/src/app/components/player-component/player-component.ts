import { Component, Input } from '@angular/core';
import { Player } from '../../models/player'

@Component({
  imports: [],
  selector: 'app-player-component',
  styleUrl: './player-component.css',
  templateUrl: './player-component.html',
})
export class PlayerComponent {

  @Input({required: true}) player!: Player;

}
