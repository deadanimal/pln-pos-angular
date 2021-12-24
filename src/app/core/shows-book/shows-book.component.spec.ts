import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsBookComponent } from './shows-book.component';

describe('ShowsBookComponent', () => {
  let component: ShowsBookComponent;
  let fixture: ComponentFixture<ShowsBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
