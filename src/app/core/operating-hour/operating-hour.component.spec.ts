import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHourComponent } from './operating-hour.component';

describe('OperatingHourComponent', () => {
  let component: OperatingHourComponent;
  let fixture: ComponentFixture<OperatingHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
