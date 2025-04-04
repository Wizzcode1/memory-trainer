import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [],
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent {
  @Output() gameStarted = new EventEmitter<void>();

  onStartGame() {
    this.gameStarted.emit();
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    event.preventDefault();
    this.gameStarted.emit();
  }
}
