import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermalPrinterComponent } from './thermal-printer.component';

describe('ThermalPrinterComponent', () => {
  let component: ThermalPrinterComponent;
  let fixture: ComponentFixture<ThermalPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermalPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermalPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
