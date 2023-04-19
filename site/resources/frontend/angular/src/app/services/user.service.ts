import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NonNullAssert } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4200/api'; // Replace with your Laravel API URL

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> { // Replace 'any' with your user model/interface
    return this.http.get<any>(`${this.apiUrl}/user`); // Update the endpoint according to your Laravel API
  }

  updateProfile(user: any): Observable<any> { // Replace 'any' with your user model/interface
    return this.http.put<any>(`${this.apiUrl}/user`, user); // Update the endpoint and payload as needed
  }

  deleteAccount(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}`); // Update the endpoint as needed
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  giftRewards(rewardData: any): Observable<any> { // Replace 'any' with your reward model/interface if necessary
    return this.http.post<any>(`${this.apiUrl}/gift-rewards`, rewardData); // Update the endpoint and payload as needed
  }

  editReservation(reservationId: number, reservationData: any): Observable<any> { // Replace 'any' with your reservation model/interface
    return this.http.put<any>(`${this.apiUrl}/reservations/${reservationId}`, reservationData); // Update the endpoint and payload as needed
  }

  // Add any other necessary functions or services as needed
}