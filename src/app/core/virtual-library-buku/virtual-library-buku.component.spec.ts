import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryBukuComponent } from './virtual-library-buku.component';

describe('VirtualLibraryBukuComponent', () => {
  let component: VirtualLibraryBukuComponent;
  let fixture: ComponentFixture<VirtualLibraryBukuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryBukuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryBukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
