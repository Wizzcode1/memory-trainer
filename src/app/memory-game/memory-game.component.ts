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
import { TimerBarComponent } from '../timer-bar/timer-bar.component';
import { LivesDisplayComponent } from '../lives-display/lives-display.component';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule, FormsModule, StartMenuComponent, TimerBarComponent, LivesDisplayComponent],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  gameStarted = false;
  sequenceLength = 4;
  sequenceMaxLength = 8;
  currentSequence: number[] = [];
  userInput: string[] = [];
  score = 0;
  showNumbers = false;
  inputVisible = false;

  // timer
  timerDuration = 5; // in seconds
  timeLeft = this.timerDuration;
  timerInterval: any;

  // lives
  lives = 3;
  maxLives = 3;

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

    setTimeout(() => {
      this.showNumbers = false;
      this.inputVisible = true;

      this.startTimer();
      setTimeout(() => this.focusFirstInput(), 0);
    }, this.timerDuration * 1000);

  }

  checkAnswer(): void {
    const correct = this.currentSequence.join('') === this.userInput.join('');

    if (correct) {
      this.score++;
      if (this.sequenceLength < this.sequenceMaxLength) {
        this.sequenceLength++;
      }
      this.startNextRound();
    } else {
      this.lives--;

      if (this.lives <= 0) {
        this.triggerGameOver();
      } else {
        this.startNextRound();
      }
    }
  }

  startNextRound(): void {
    this.userInput = [];
    this.startRound();
  }

  triggerGameOver(): void {
    this.inputVisible = false;
    this.showNumbers = false;

    this.resetGame();
  }

  resetGame(): void {
    this.gameStarted = false;
    this.lives = this.maxLives;
    this.sequenceLength = 4;
    this.score = 0;
    this.userInput = [];
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

  startTimer(): void {
    this.timeLeft = this.timerDuration;

    this.timerInterval = setInterval(() => {
      this.timeLeft = Math.max(0, this.timeLeft - 0.1);
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 100);
  }

  onTimeExpired(): void {
    this.checkAnswer();
  }

}
