import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertDailyForDayComponent } from './upsert-daily-for-day.component';

describe('UpsertDailyForDayComponent', () => {
  let component: UpsertDailyForDayComponent;
  let fixture: ComponentFixture<UpsertDailyForDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertDailyForDayComponent]
    });
    fixture = TestBed.createComponent(UpsertDailyForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
