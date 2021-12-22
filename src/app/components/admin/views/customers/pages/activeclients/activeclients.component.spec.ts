import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveclientsComponent } from './activeclients.component';

describe('ActiveclientsComponent', () => {
  let component: ActiveclientsComponent;
  let fixture: ComponentFixture<ActiveclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveclientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
