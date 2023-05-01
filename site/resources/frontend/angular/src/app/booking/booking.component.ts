import { Component } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  datesSelected = false;

  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSearchClick() {
    const checkInInput = document.getElementById(
      'check-in'
    ) as HTMLInputElement;
    const checkOutInput = document.getElementById(
      'check-out'
    ) as HTMLInputElement;

    if (checkInInput.value && checkOutInput.value) {
      const checkInDate = new Date(checkInInput.value);
      const checkOutDate = new Date(checkOutInput.value);

      if (checkOutDate > checkInDate) {
        this.datesSelected = true;
        this.searchForRooms();
      } else {
        this.snackBar.open('Check-out date must be after check-in date', 'OK', {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Please select check-in and check-out dates', 'OK', {
        duration: 3000,
      });
    }
  }

  searchForRooms() {
    this.router.navigate(['/available-rooms']);
  }
}
