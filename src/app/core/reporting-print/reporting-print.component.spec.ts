import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingPrintComponent } from './reporting-print.component';

describe('ReportingPrintComponent', () => {
  let component: ReportingPrintComponent;
  let fixture: ComponentFixture<ReportingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
