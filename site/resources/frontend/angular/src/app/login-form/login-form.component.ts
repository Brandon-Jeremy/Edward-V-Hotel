import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('templateRef') templateRef!: ElementRef;

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openForm(): void {
    this.templateRef.nativeElement.style.display = 'block';
  }
  
  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.fakeLogin(loginData.email, loginData.password).subscribe(
      (response) => {
        this.authService.setAuthenticated(true);
        this.clearForm();
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

  clearForm(): void {
    this.email = '';
    this.password = '';
  }
}
