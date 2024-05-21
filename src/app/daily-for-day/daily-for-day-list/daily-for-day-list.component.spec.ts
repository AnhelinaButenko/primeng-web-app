import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForDayListComponent } from './daily-for-day-list.component';

describe('DailyForDayListComponent', () => {
  let component: DailyForDayListComponent;
  let fixture: ComponentFixture<DailyForDayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyForDayListComponent]
    });
    fixture = TestBed.createComponent(DailyForDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
