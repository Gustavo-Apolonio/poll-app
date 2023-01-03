import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCardComponent } from './poll-card.component';

describe('CardComponent', () => {
  let component: PollCardComponent;
  let fixture: ComponentFixture<PollCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
