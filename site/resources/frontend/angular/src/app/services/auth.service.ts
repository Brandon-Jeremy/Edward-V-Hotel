import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as z from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

const nameRegex = /^[A-Za-z\- ]+$/;
const firstNameSchema = z.string().regex(nameRegex).min(2);
const lastNameSchema = z.string().min(2);

const digitsRegex = /^\d+$/;

const numberSchema = z.string().regex(digitsRegex);

const confirmPasswordSchema = z.string().min(8);

const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const userSignUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  number: numberSchema,
  confirmPassword: confirmPasswordSchema,
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const user = { email, password };
    const validatedUser = userLoginSchema.parse(user);

    return this.http.post(`${this.apiUrl}/login`, validatedUser)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  signUp(email: string, password: string, firstName:string, lastName:string, number:string, confirmPassword:string): Observable<any> {
    const user = { email, password, firstName, lastName, number, confirmPassword };
    const validatedUser = userSignUpSchema.parse(user);

    return this.http.post(`${this.apiUrl}/signup`, validatedUser)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
}