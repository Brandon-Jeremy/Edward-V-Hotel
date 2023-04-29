import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:4200/api/login-user';
  private signupUrl = 'http://localhost:4200/api/register-user';

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const requestBody = {
      email: email,
      password: password
    };
  
    return new Observable(observer => {
      fetch(this.loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to login');
        }
      })
      .then(data => {
        this.onSuccessfulLogin(data);
        this.setAuthenticated(true);
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        console.error(error);
        observer.error(error);
      });
    });
  }

  fakeLogin(email: string, password: string): Observable<any> {
    const userData = {
      id: 1,
      email: email,
      firstName: 'John',
      lastName: 'Doe'
    };
    const response = {
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        access_token: 'some-auth-token'
      }
    };
    return of({ access_token: 'fakeToken', user: { email, firstName: 'John', lastName: 'Doe' } }).pipe(
      delay(1000),
      tap((response) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  signUp(email: string, password: string, first_name: string, last_name: string, dob: String, phone_num: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const body = { email, password, first_name, last_name, dob, phone_num };

    return this.http.post(this.signupUrl, JSON.stringify(body), { headers }).pipe(
      tap(response => {
        this.onSuccessfulSignUp(response);
      }),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }

  onSuccessfulSignUp(response: any): void {
    const token = response.access_token;
    const userData = response.user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  onSuccessfulLogin(response: any): void {
    // Store user data, token, etc., as needed
    const token = response.access_token;
    const userData = response.user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Call this method after successful login to store the user data or token
  storeUserData(response: any) {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }

  // Call this method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated.getValue();
  }
  

  logout() {
    // Perform your logout logic here, e.g., API calls
    // After successful logout, set isAuthenticated to false
    this.setAuthenticated(false);
  }

  setAuthenticated(status: boolean) {
    this.isAuthenticated.next(status);
    console.log('isAuthenticated:', this.isAuthenticated.value); // add this line

  }

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated;
  }

  //for testing 
  trulyAuthenticatted(): boolean {
    return true;
  }
}
