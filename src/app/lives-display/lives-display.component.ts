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
  @Input() lives = 0;
  @Input() maxLives = 0;

}
