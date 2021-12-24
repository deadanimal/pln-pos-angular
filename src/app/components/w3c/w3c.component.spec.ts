import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { W3cComponent } from './w3c.component';

describe('W3cComponent', () => {
  let component: W3cComponent;
  let fixture: ComponentFixture<W3cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ W3cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(W3cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
