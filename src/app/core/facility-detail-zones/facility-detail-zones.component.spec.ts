import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailZonesComponent } from './facility-detail-zones.component';

describe('FacilityDetailZonesComponent', () => {
  let component: FacilityDetailZonesComponent;
  let fixture: ComponentFixture<FacilityDetailZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityDetailZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityDetailZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
