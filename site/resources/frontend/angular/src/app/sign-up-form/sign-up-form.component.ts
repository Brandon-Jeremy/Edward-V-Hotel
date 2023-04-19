import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  firstName: string = '';
  lastName: string = '';
  dob: Date = new Date();
  email: string = '';
  password: string = '';
  phoneNum: string = '';

  @Output() closePopup = new EventEmitter<void>();

  constructor(private authService: AuthService, private http: HttpClient) {}

  onSignUp(): void {
      const apiUrl = 'http://localhost:4200/api/register-user'; // Replace with your API endpoint

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const body = {
      first_name: this.firstName,
      last_name: this.lastName,
      dob: this.dob,
      email: this.email,
      password: this.password,
      phone_num: this.phoneNum,
    };

    this.http.post(apiUrl, JSON.stringify(body), { headers })
      .subscribe(
        (response) => {
          console.log('Sign up successful');
          // Navigate to another page or show a success message
        },
        (error) => {
          console.log('Sign up failed', error);
          // Handle error, e.g., display an error message
        }
      );
  }

  clearForm(){
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.phoneNum = '';
  }
}
