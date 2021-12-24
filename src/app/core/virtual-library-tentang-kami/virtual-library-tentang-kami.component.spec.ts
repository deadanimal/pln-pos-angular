import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryTentangKamiComponent } from './virtual-library-tentang-kami.component';

describe('VirtualLibraryTentangKamiComponent', () => {
  let component: VirtualLibraryTentangKamiComponent;
  let fixture: ComponentFixture<VirtualLibraryTentangKamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryTentangKamiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryTentangKamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
