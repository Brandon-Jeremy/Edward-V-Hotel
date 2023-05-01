import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = 'http://localhost:8000/view-reeservations';
  private view = 'http://localhost:8000/view-reeservations';

  constructor(private http: HttpClient) {}

  viewReservations(email: string): Observable<Reservation[]> {
    const url = `${this.view}/reservations?email=${email}`;
    return this.http.get<Reservation[]>(url);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.baseUrl}/reservations`,
      reservation
    );
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(
      `${this.baseUrl}/reservations/${reservation.id}`,
      reservation
    );
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${reservationId}`);
  }
}
