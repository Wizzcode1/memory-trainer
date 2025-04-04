import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesDisplayComponent } from './lives-display.component';

describe('LivesDisplayComponent', () => {
  let component: LivesDisplayComponent;
  let fixture: ComponentFixture<LivesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
