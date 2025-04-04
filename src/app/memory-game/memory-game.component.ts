import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef, ViewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StartMenuComponent} from '../start-menu/start-menu.component';
import {TimerBarComponent} from '../timer-bar/timer-bar.component';
import {LivesDisplayComponent} from '../lives-display/lives-display.component';
import {GameOverComponent} from '../game-over/game-over.component';

enum GameState {
  MENU,
  SHOWING_DIGITS,
  GUESSING,
  GAME_OVER
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule, FormsModule, StartMenuComponent, TimerBarComponent, LivesDisplayComponent, GameOverComponent],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

  state: GameState = GameState.MENU;

  sequenceLength = 4;
  sequenceMinLength = 4;
  sequenceMaxLength = 9;
  currentSequence: number[] = [];
  userInput: string[] = [];
  score = 0;

  // timer
  timerDuration = 5; // in seconds
  timeLeft = this.timerDuration;
  timerInterval: any;

  // lives
  lives = 3;
  maxLives = 3;

  gameOverData = {
    score: 0,
    lives: 0,
  };

  @ViewChildren('inputBox') inputBoxes!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
  }

  startGame(): void {
    this.score = 0;
    this.sequenceLength = 4;
    this.lives = this.maxLives;
    this.userInput = [];
    this.state = GameState.SHOWING_DIGITS;
    this.startRound();
  }

  startRound(): void {
    this.currentSequence = this.generateSequence(this.sequenceLength);
    this.userInput = [];

    this.state = GameState.SHOWING_DIGITS;

    setTimeout(() => {
      if (this.state === GameState.SHOWING_DIGITS) {
        this.startGuessingPhase();
      }
    }, this.timerDuration * 1000);
  }

  private generateSequence(sequenceLength: number) {
    return Array.from({length: sequenceLength}, () =>
      Math.floor(Math.random() * 10)
    );
  }

  startGuessingPhase(): void {
    this.state = GameState.GUESSING;
    this.startTimer();
    setTimeout(() => this.focusFirstInput(), 0);
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
      if (this.sequenceLength > this.sequenceMinLength) {
        this.sequenceLength--;
      }
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
    this.gameOverData = { score: this.score, lives: this.maxLives };
    this.state = GameState.GAME_OVER;
  }

  resetGame(): void {
    this.startGame(); // Resets everything and sets state to MENU → SHOWING_DIGITS
  }

  onDigitInput(index: number, currentInput: HTMLInputElement, event?: KeyboardEvent): void {
    const value = currentInput.value;
    const nextInput = this.inputBoxes.get(index + 1)?.nativeElement;
    const prevInput = this.inputBoxes.get(index - 1)?.nativeElement;

    if (event?.key === 'Backspace' && value.length === 0) {
      prevInput?.focus();
      return;
    }

    if (value.length === 1) {
      if (nextInput) {
        nextInput.focus();
      } else {
        setTimeout(() => {
          this.submitButton?.nativeElement.focus();
        }, 0);
      }
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
