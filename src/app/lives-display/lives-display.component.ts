import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-lives-display',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './lives-display.component.html',
  styleUrls: ['./lives-display.component.scss']
})
export class LivesDisplayComponent {
  @Input() lives = 2;
  @Input() maxLives = 3;
  hearts: string[] = [];

  get remaining(): number[] {
    return Array(this.lives).fill(1);
  }

  get lost(): number[] {
    return Array(this.maxLives - this.lives).fill(1);
  }



}
