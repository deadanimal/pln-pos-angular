import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryArtikelTerkiniComponent } from './virtual-library-artikel-terkini.component';

describe('VirtualLibraryArtikelTerkiniComponent', () => {
  let component: VirtualLibraryArtikelTerkiniComponent;
  let fixture: ComponentFixture<VirtualLibraryArtikelTerkiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryArtikelTerkiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryArtikelTerkiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
