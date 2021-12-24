import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSeatComponent } from './customer-seat.component';

describe('CustomerSeatComponent', () => {
  let component: CustomerSeatComponent;
  let fixture: ComponentFixture<CustomerSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
