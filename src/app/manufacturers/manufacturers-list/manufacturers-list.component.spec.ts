import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersListComponent } from './manufacturers-list.component';

describe('ManufacturersListComponent', () => {
  let component: ManufacturersListComponent;
  let fixture: ComponentFixture<ManufacturersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManufacturersListComponent]
    });
    fixture = TestBed.createComponent(ManufacturersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
