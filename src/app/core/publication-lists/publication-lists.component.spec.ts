import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationListsComponent } from './publication-lists.component';

describe('PublicationListsComponent', () => {
  let component: PublicationListsComponent;
  let fixture: ComponentFixture<PublicationListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
