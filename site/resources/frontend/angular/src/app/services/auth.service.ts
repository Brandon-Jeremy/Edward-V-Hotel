import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

import * as z from 'zod';


// const emailSchema = z.string().email({ message: 'Please enter a valid email address' });
const emailRegex = /^\S+@\S+\.\S+$/;
const emailSchema = z.string().regex(emailRegex, { message: 'Please enter a valid email address' });
const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });
const nameRegex = /^[A-Za-z\- ]+$/;
const first_nameSchema = z.string().regex(nameRegex, { message: 'First name must consists of only alphabets' }).min(2, { message: 'First name must be at least 2 characters long' });
const last_nameSchema = z.string().regex(nameRegex, { message: 'Last name must consists of only alphabets' }).min(2, { message: 'Last name must be at least 2 characters long' });
const digitsRegex = /^\d+$/;
const numberSchema = z.string().regex(digitsRegex, { message: 'Please enter a valid phone phone_num' });
const confirmPasswordSchema = z.string().min(8, { message: 'Confirm password must be at least 8 characters long' });
const dobSchema = z.string().refine((value) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
}, { message: 'Please enter a valid date of birth (YYYY-MM-DD)' });

const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const userSignUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: first_nameSchema,
  lastName: last_nameSchema,
  dob: dobSchema,
  number: numberSchema,
  confirmPassword: confirmPasswordSchema,
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Passwords do not match' }
);


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4200/api';

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private dialog: MatDialog) {}


  login(email: string, password: string): Observable<any> {
    try {
      userLoginSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        console.log(error);
        this.showErrorDialog(errorMessage || 'An error occurred');
        throw new Error(errorMessage);
      }
    }

    return this.http.post(`${this.apiUrl}/login-user`, { email, password }).pipe(
      tap((response) => {
        // Handle successful login, e.g., store the user data, token, etc.
        this.onSuccessfulLogin(response);
        console.log('isAuthenticated:', this.isAuthenticated.value); // add this line
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
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
        this.isAuthenticated.next(true);
      })
    );
  }

  signUp(email: string, password: string, first_name: string, last_name: string, dob: String, phone_num: string, confirmPassword: string,): Observable<any> {
    try {
      userSignUpSchema.parse({ email, password, first_name, last_name, dob, phone_num, confirmPassword });
      if (password !== confirmPassword) {
        console.log("hello");
        throw new Error('Password and confirm password do not match');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors[0].message);
        const errorMessage = error.errors[0].message;
        console.log(error);
        this.showErrorDialog(errorMessage || 'An error occurred');
        throw new Error(errorMessage);
      } else {
        throw error;
      }
    }

    return this.http.post(`${this.apiUrl}/register-user`, { first_name, last_name, dob, email, password, phone_num }).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
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
}
