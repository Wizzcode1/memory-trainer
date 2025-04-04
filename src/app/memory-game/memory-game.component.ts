import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { StartMenuComponent } from '../start-menu/start-menu.component';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule, FormsModule, StartMenuComponent],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  gameStarted = false;
  sequenceLength = 4;
  currentSequence: number[] = [];
  userInput: string[] = [];
  score = 0;
  showNumbers = false;
  inputVisible = false;

  @ViewChildren('inputBox') inputBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameStarted = true;
    this.startRound();
  }

  startRound(): void {
    this.currentSequence = Array.from({ length: this.sequenceLength }, () =>
      Math.floor(Math.random() * 10)
    );
    this.showNumbers = true;
    this.inputVisible = false;

    setTimeout(() => {
      this.showNumbers = false;
      this.inputVisible = true;

      setTimeout(() => this.focusFirstInput(), 0);
    }, 5000);
  }

  checkAnswer() {
    const correct = this.currentSequence.join('') === this.userInput.join('');
    if (correct) {
      this.score++;
      this.sequenceLength++;
    }

    this.userInput = [];
    this.startRound();
  }

  onDigitInput(index: number, currentInput: HTMLInputElement) {
    const nextInput = currentInput.nextElementSibling as HTMLInputElement | null;
    if (nextInput && currentInput.value.length === 1) {
      nextInput.focus();
    }
  }

  focusFirstInput(): void {
    const firstInput = this.inputBoxes.first;
    if (firstInput) {
      firstInput.nativeElement.focus();
    }
  }

}
