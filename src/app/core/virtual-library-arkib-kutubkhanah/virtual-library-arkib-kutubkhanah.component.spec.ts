import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryArkibKutubkhanahComponent } from './virtual-library-arkib-kutubkhanah.component';

describe('VirtualLibraryArkibKutubkhanahComponent', () => {
  let component: VirtualLibraryArkibKutubkhanahComponent;
  let fixture: ComponentFixture<VirtualLibraryArkibKutubkhanahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryArkibKutubkhanahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryArkibKutubkhanahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
