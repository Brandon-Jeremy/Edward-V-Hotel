import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login-form/login-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  emailError: string = '';

  matcher = new MyErrorStateMatcher();

  constructor(private snackBar: MatSnackBar) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onSubmit(): void {
    this.resetError()
    //email validation
    if (this.emailFormControl.hasError('required')) {
      this.emailError = 'Email is required';
      return;
    }
    if (this.emailFormControl.hasError('email')) {
      this.emailError = 'Invalid email format';
      return;
    }

    this.showSnackbar('Password reset link sent to email');
  }

  resetError(): void {
    this.emailError = '';
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
