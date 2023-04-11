import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email = '';
  password = '';
  
  @ViewChild('popup') popup!: PopupComponent;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password)
      .then(() => {
        // Clear the form and close the popup
        this.email = '';
        this.password = '';
        this.popup.close();
      })
      .catch(() => {
        // Handle login error
        console.log('Login failed');
      });
  }
}
