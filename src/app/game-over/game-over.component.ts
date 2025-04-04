import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {
  @Input() score = 0;
  @Output() tryAgain = new EventEmitter<void>();

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}
