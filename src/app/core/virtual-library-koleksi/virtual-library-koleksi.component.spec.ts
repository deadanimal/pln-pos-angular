import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryKoleksiComponent } from './virtual-library-koleksi.component';

describe('VirtualLibraryKoleksiComponent', () => {
  let component: VirtualLibraryKoleksiComponent;
  let fixture: ComponentFixture<VirtualLibraryKoleksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryKoleksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryKoleksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
