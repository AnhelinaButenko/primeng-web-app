import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastProductComponent } from './breakfast-product.component';

describe('BreakfastProductComponent', () => {
  let component: BreakfastProductComponent;
  let fixture: ComponentFixture<BreakfastProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreakfastProductComponent]
    });
    fixture = TestBed.createComponent(BreakfastProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
