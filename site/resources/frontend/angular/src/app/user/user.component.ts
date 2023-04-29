import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
    private authGuard:AuthGuard) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dob: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    // Fetch the user data from the UserService and update the form values
    this.userService.getUserData().subscribe(
      response => {
        const userData = response.data; // Update the property names to match your Laravel API response
        this.userForm.patchValue(userData);
      },
      error => {
        console.error('Error fetching user data:', error);
        // Display an error message to the user
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Call the UserService to update the user information
      this.userService.updateProfile(this.userForm.value).subscribe(
        response => {
          console.log('User information updated successfully');
          // Display a success message to the user
        },
        error => {
          console.error('Error updating user information:', error);
          // Display an error message to the user
        }
      );
    } else {
      console.warn('Invalid form data');
      // Display an error message to the user
    }
  }

  onViewEditReservations(): void {
    if (this.authGuard.canActivate()) {
      this.router.navigateByUrl('/reservation-menu');
    }
  }

  onDeleteAccount() {
    // Call the UserService to delete the user account
    this.userService.deleteAccount(123).subscribe( // Replace '123' with the actual user ID
      response => {
        console.log('User account deleted successfully');
        // Display a success message to the user
        // Redirect the user to the login page
      },
      error => {
        console.error('Error deleting user account:', error);
        // Display an error message to the user
      }
    );
  }

  onLogout() {
    // Call the UserService to log out the user
    this.userService.logout().subscribe(
      response => {
        console.log('User logged out successfully');
        // Redirect the user to the login page
      },
      error => {
        console.error('Error logging out:', error);
        // Display an error message to the user
      }
    );
  }
}
