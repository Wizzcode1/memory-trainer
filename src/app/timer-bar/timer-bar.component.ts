import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer-bar',
  standalone: true,
  imports: [],
  templateUrl: './timer-bar.component.html',
  styleUrls: ['./timer-bar.component.scss']
})
export class TimerBarComponent implements OnInit {
  @Input() duration = 5; // in seconds
  @Output() timeout = new EventEmitter<void>();

  timeLeft = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.timeLeft = this.duration;
    this.intervalId = setInterval(() => {
      this.timeLeft = parseFloat((this.timeLeft - 0.1).toFixed(1));
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.intervalId);
        this.timeout.emit();
      }
    }, 100);
  }
}
