import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitListsComponent } from './exhibit-lists.component';

describe('ExhibitListsComponent', () => {
  let component: ExhibitListsComponent;
  let fixture: ComponentFixture<ExhibitListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
