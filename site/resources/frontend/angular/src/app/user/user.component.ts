// src/app/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service'; 
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

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
    private router: Router, 
    private snackBar: MatSnackBar 
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
        this.showSnackbar('Logout successful');

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

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  

  giftRewards(){

  }
}
