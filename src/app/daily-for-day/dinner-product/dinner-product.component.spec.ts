import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinnerProductComponent } from './dinner-product.component';

describe('DinnerProductComponent', () => {
  let component: DinnerProductComponent;
  let fixture: ComponentFixture<DinnerProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DinnerProductComponent]
    });
    fixture = TestBed.createComponent(DinnerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
