import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CioComponent } from './cio.component';

describe('CioComponent', () => {
  let component: CioComponent;
  let fixture: ComponentFixture<CioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
