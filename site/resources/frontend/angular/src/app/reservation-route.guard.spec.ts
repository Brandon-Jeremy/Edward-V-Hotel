import { TestBed } from '@angular/core/testing';

import { ReservationRouteGuard } from './reservation-route.guard';

describe('ReservationRouteGuard', () => {
  let guard: ReservationRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReservationRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
