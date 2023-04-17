import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

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
  
    this.authService.login(loginData.email,loginData.password).subscribe(
      (response) => {
        // Handle successful login, e.g., store the user data, token, etc.
        this.router.navigate(['/user']);
      },
      (error) => {
        // Handle login error, e.g., display an error message
      }
    );
  }
  

  clearForm(): void {
    this.email = '';
    this.password = '';
    this.loginForm.resetForm();
  }

  

}

