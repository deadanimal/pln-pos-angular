import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryEsumberComponent } from './virtual-library-esumber.component';

describe('VirtualLibraryEsumberComponent', () => {
  let component: VirtualLibraryEsumberComponent;
  let fixture: ComponentFixture<VirtualLibraryEsumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryEsumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryEsumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
