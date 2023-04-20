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
  
  user = {
    email: 'john.doe@example.com',
    phone: '555-555-1234',
    password: 'password123',
    reservations: [ {
      room: 'Deluxe Room',
      time: new Date(),
      // Add other properties as needed
    },
    ], // Add this line
  };

  isModalOpen: boolean = false;
  activeModal: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router, 
    private snackBar: MatSnackBar 
  ) {}

  openModal(modalId: string): void {
    this.isModalOpen = true;
    this.activeModal = modalId;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.activeModal = null;
  }

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

  // deleteAccount() {
  //   this.userService.deleteAccount(this.user.id).subscribe(
  //     (response) => {
  //       // Handle successful deletion, e.g., navigate to another page
  //     },
  //     (error) => {
  //       // Handle error, e.g., display an error message
  //     }
  //   );
  // }

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

  updateAccount(): void {
    // Implement your logic to update the user account here
    console.log('Account updated:', this.user);
    this.closeModal();
  }

  giftRewards(){

  }

  openEditReservationModal(reservation: any): void {
    // Implement your logic to open a modal window for editing reservations
    console.log('Editing reservation:', reservation);
  }

  
}
