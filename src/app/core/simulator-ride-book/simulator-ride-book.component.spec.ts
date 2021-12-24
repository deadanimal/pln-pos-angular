import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorRideBookComponent } from './simulator-ride-book.component';

describe('SimulatorRideBookComponent', () => {
  let component: SimulatorRideBookComponent;
  let fixture: ComponentFixture<SimulatorRideBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorRideBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorRideBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
