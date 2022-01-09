import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionAlertComponent } from './sesion-alert.component';

describe('SesionAlertComponent', () => {
  let component: SesionAlertComponent;
  let fixture: ComponentFixture<SesionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
