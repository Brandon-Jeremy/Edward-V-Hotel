import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  openForm(): void {
    this.templateRef.nativeElement.style.display = 'block';
  }
  
  onSubmit(): void {
    // Handle form submission
  }

  clearForm(): void {
    this.email = '';
    this.password = '';
    this.loginForm.resetForm();
  }
}

