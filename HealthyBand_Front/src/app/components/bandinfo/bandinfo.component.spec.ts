import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandinfoComponent } from './bandinfo.component';

describe('BandinfoComponent', () => {
  let component: BandinfoComponent;
  let fixture: ComponentFixture<BandinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
