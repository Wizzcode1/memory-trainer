import { Component } from '@angular/core';
import { MemoryGameComponent } from './memory-game/memory-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MemoryGameComponent],
  template: `<app-memory-game></app-memory-game>`,
  styles: []
})
export class AppComponent {
  title = 'memory-trainer';
}
