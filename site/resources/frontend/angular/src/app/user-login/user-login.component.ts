import { Component } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from '../services/auth.service';
=======
>>>>>>> 3c86c9c73da0295ad9c6a3e04d9789b58c7ef0cc

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

    this.authService.login(data.email,data.password)
      .subscribe(response => {
        console.log(response);
        // Handle successful login here
      }, error => {
        console.error(error);
        // Handle login error here
      });
  }
}
