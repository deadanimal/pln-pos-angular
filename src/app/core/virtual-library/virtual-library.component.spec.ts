import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryComponent } from './virtual-library.component';

describe('VirtualLibraryComponent', () => {
  let component: VirtualLibraryComponent;
  let fixture: ComponentFixture<VirtualLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
