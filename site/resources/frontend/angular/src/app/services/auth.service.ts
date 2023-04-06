import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.example.com'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  // Login API call with default response
  login(email: string, password: string): Observable<any> {
    // Replace with your actual API endpoint and request payload
    const endpoint = `${this.apiUrl}/login`;
    const payload = { email, password };

    // Make the API call and handle errors with default response
    return this.http.post(endpoint, payload).pipe(
      catchError(() => {
        // Provide default response in case of error
        return of({ success: false, message: 'Failed to login' });
      })
    );
  }

  // Registration API call with default response
  register(name: string, dob: string, email: string, phonenumber: string, password: string): Observable<any> {
    // Replace with your actual API endpoint and request payload
    const endpoint = `${this.apiUrl}/register`;
    const payload = { name, dob, email, phonenumber, password };

    // Make the API call and handle errors with default response
    return this.http.post(endpoint, payload).pipe(
      catchError(() => {
        // Provide default response in case of error
        return of({ success: false, message: 'Failed to register' });
      })
    );
  }
}
