import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LivesDisplayComponent} from '../lives-display/lives-display.component';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [
    LivesDisplayComponent
  ],
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {
  @Input() data!: { score: number; lives: number };
  @Output() tryAgain = new EventEmitter<void>();

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}
