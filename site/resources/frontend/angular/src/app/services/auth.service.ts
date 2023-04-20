import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupAPI = 'http://localhost:4200/api/register-user';
  private loginAPI = 'http://localhost:4200/api/login-user';

  private authenticated: boolean = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const body = { email, password };

    return this.http.post(this.loginAPI, JSON.stringify(body), { headers } ).pipe(
      tap((response) => {
        // Handle successful login, e.g., store the user data, token, etc.
        this.onSuccessfulLogin(response);
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  signUp(email: string, password: string, first_name: string, last_name: string, dob: String, phone_num: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const body = { email, password };

    return this.http.post(this.signupAPI, JSON.stringify(body), { headers }).pipe(
      tap((response) => {
        // Handle successful signup, e.g., store the user data, token, etc.
        this.onSuccessfulLogin(response);
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }


  fakeLogin(email: string, password: string): Observable<any> {
    const userData = {
      id: 1,
      email: email,
      first_name: 'John',
      last_name: 'Doe'
    };
    const response = {
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        access_token: 'some-auth-token'
      }
    };
    return of({ access_token: 'fakeToken', user: { email, first_name: 'John', last_name: 'Doe' } }).pipe(
      delay(1000),
      tap((response) => {
        // this.isAuthenticated.next(true);
      })
    );
  }

  onSuccessfulLogin(response: any): void {
    // Store user data, token, etc., as needed
    const token = response.access_token;
    const userData = response.user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    this.setAuthenticated(true);
  }

  // Call this method after successful login to store the user data or token
  storeUserData(response: any) {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }

  logout() {
    // Perform your logout logic here, e.g., API calls
    // After successful logout, set isAuthenticated to false
    this.setAuthenticated(false);
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
