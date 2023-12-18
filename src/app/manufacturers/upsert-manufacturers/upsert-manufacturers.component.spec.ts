import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertManufacturersComponent } from './upsert-manufacturers.component';

describe('UpsertManufacturersComponent', () => {
  let component: UpsertManufacturersComponent;
  let fixture: ComponentFixture<UpsertManufacturersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertManufacturersComponent]
    });
    fixture = TestBed.createComponent(UpsertManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
