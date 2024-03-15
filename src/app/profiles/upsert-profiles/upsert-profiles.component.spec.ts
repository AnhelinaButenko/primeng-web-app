import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProfilesComponent } from './upsert-profiles.component';

describe('UpsertProfilesComponent', () => {
  let component: UpsertProfilesComponent;
  let fixture: ComponentFixture<UpsertProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertProfilesComponent]
    });
    fixture = TestBed.createComponent(UpsertProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
