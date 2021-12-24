import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryPerkhidmatanComponent } from './virtual-library-perkhidmatan.component';

describe('VirtualLibraryPerkhidmatanComponent', () => {
  let component: VirtualLibraryPerkhidmatanComponent;
  let fixture: ComponentFixture<VirtualLibraryPerkhidmatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryPerkhidmatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryPerkhidmatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
