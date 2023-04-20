import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('templateRef') templateRef!: ElementRef;
  loginForm!: FormGroup;
  emailError = '';
  passwordError = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  openForm(): void {
    this.templateRef.nativeElement.style.display = 'block';
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.emailError = this.loginForm.controls['email'].errors?.['required'] ? 'Email is required' : 'Invalid email address';
      this.passwordError = this.loginForm.controls['password'].errors?.['required'] ? 'Password is required' : 'Password must be at least 8 characters long';
      return;
    }

    const loginData = this.loginForm.value;
    
    this.authService.login(loginData.email, loginData.password).subscribe(
      (response) => {
        this.authService.setAuthenticated(true);
        this.loginForm.reset();
        this.showSnackbar('Logged in successfully');
      },
      (error) => {
        // Handle login error, e.g., display an error message
      }
    );
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
