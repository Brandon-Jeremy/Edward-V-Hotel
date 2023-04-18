// src/app/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service'; 
import { Router } from '@angular/router'; // Add this import
//import { MatSnackBar } from '@angular/material/snack-bar'; // Add this import

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any; // Replace 'any' with your user model/interface

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router, // Inject Router here
    //private snackBar: MatSnackBar // Inject MatSnackBar here
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        // Handle error, e.g., display an error message
      }
    );
  }

  updateProfile() {
    this.userService.updateProfile(this.user).subscribe(
      (response) => {
        // Handle successful update, e.g., show a success message
      },
      (error) => {
        // Handle error, e.g., display an error message
      }
    );
  }

  deleteAccount() {
    this.userService.deleteAccount(this.user.id).subscribe(
      (response) => {
        // Handle successful deletion, e.g., navigate to another page
      },
      (error) => {
        // Handle error, e.g., display an error message
      }
    );
  }

  // Add other methods to call UserService functions as needed

  logout() {
    this.userService.logout().subscribe(
      (response) => {
        // Display a success message
        console.log('Logout successful'); // Replace this with a proper user-friendly message

        // Update the AuthService state
        this.authService.logout();

        // Navigate to the home page
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle error, e.g., display an error message
      }
    );
  }
  

  giftRewards(){

  }
}
