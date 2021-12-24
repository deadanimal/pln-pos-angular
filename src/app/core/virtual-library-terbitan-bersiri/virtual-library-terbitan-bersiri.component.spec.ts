import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryTerbitanBersiriComponent } from './virtual-library-terbitan-bersiri.component';

describe('VirtualLibraryTerbitanBersiriComponent', () => {
  let component: VirtualLibraryTerbitanBersiriComponent;
  let fixture: ComponentFixture<VirtualLibraryTerbitanBersiriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryTerbitanBersiriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryTerbitanBersiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
