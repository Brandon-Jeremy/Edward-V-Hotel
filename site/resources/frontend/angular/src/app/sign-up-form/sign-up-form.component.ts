import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  number: string = '';
  confirmPassword: string = '';
  @Output() closePopup = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    this.authService.signUp(this.email, this.password, this.firstName, this.lastName, this.number, this.confirmPassword)
      .then(() => {
        alert('Sign up successful.');
        this.closePopup.emit();
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }
}
