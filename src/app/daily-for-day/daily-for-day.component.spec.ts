import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForDayComponent } from './daily-for-day.component';

describe('DailyForDayComponent', () => {
  let component: DailyForDayComponent;
  let fixture: ComponentFixture<DailyForDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyForDayComponent]
    });
    fixture = TestBed.createComponent(DailyForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
