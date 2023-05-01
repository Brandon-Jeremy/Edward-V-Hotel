import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMenuComponent } from './reservation-menu.component';

describe('ReservationMenuComponent', () => {
  let component: ReservationMenuComponent;
  let fixture: ComponentFixture<ReservationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
