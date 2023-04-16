import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email: string='';
  password: string='';

  constructor(private authService: AuthService) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data)
      .subscribe(response => {
        console.log(response);
        // Handle successful login here
      }, error => {
        console.error(error);
        // Handle login error here
      });
  }
}
