import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login-form/login-form.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  emailError: string = '';

  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onSubmit(): void {
    //email validation
    if (this.emailFormControl.hasError('required')) {
      this.emailError = 'Email is required';
      return;
    }
    if (this.emailFormControl.hasError('email')) {
      this.emailError = 'Invalid email format';
      return;
    }
  }
}
