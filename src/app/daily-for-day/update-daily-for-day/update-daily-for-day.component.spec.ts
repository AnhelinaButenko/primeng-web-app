import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyForDayComponent } from './update-daily-for-day.component';

describe('UpsertDailyForDayComponent', () => {
  let component: UpdateDailyForDayComponent;
  let fixture: ComponentFixture<UpdateDailyForDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDailyForDayComponent]
    });
    fixture = TestBed.createComponent(UpdateDailyForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
