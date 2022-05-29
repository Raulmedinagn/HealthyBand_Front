import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatBurnedComponent } from './fat-burned.component';

describe('FatBurnedComponent', () => {
  let component: FatBurnedComponent;
  let fixture: ComponentFixture<FatBurnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatBurnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatBurnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
