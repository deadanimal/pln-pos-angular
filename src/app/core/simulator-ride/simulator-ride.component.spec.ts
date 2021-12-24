import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorRideComponent } from './simulator-ride.component';

describe('SimulatorRideComponent', () => {
  let component: SimulatorRideComponent;
  let fixture: ComponentFixture<SimulatorRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
