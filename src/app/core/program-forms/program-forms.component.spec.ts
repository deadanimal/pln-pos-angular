import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFormsComponent } from './program-forms.component';

describe('ProgramFormsComponent', () => {
  let component: ProgramFormsComponent;
  let fixture: ComponentFixture<ProgramFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
