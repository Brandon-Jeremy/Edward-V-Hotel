import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  firstName: string='';
  lastName: string='';
  dob: Date = new Date();
  email: string='';
  phoneNumber: string='';
  password: string='';

  constructor(private authService: AuthService) {}

  register() {
    const data = {
      name: this.firstName + ' ' + this.lastName,
      dob: this.dob.toISOString(),
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.authService.register(data.name,data.dob, data.email, data.phoneNumber, data.password)
      .subscribe(response => {
        console.log(response);
        // Handle successful registration here
      }, error => {
        console.error(error);
        // Handle registration error here
      });
  }
}