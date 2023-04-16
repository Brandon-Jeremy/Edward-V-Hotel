import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any; // Replace 'any' with your user model/interface

  constructor(private userService: UserService) {
    this.user = {}; // Initialize the user object
  }

  ngOnInit(): void {
    // Load user data from the backend, using the UserService
    this.userService.getUserData().subscribe((userData) => {
      this.user = userData;
    });
  }

  updateProfile(): void {
    // Update the user profile by calling the UserService
  }

  deleteAccount(): void {
    // Delete the user account by calling the UserService
  }

  logout(): void {
    // Logout the user by calling the UserService
  }

  giftRewards(): void {
    // Implement the logic for gifting rewards
  }

  editReservation(reservationId: number): void {
    // Edit the reservation using
    //the reservationId and UserService
  }
  
  // Add any other necessary functions or services as needed
  
}