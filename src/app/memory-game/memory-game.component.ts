import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  sequenceLength = 4;
  currentSequence: number[] = [];
  userInput: string[] = [];
  score = 0;
  showNumbers = false;
  inputVisible = false;

  ngOnInit(): void {
    this.startRound();
  }

  startRound() {
    this.currentSequence = Array.from({ length: this.sequenceLength }, () => Math.floor(Math.random() * 10));
    this.showNumbers = true;
    this.inputVisible = false;

    setTimeout(() => {
      this.showNumbers = false;
      this.inputVisible = true;
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
}
