import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-menu',
  templateUrl: './reservation-menu.component.html',
  styleUrls: ['./reservation-menu.component.css']
})
export class ReservationMenuComponent implements OnInit {

  reservations: Reservation[] = [];
  isLoading: boolean = true;

  constructor(private reservationService: ReservationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      this.isLoading = false;
    });
  }

  getReservations(): void {
    // Get the user's reservations from the ReservationService
    this.reservationService.getReservations().subscribe(
      reservations => {
        this.reservations = reservations;
      },
      error => {
        console.log('Error getting reservations: ', error);
      }
    );
  }

  cancelReservation(id: number): void {
    // Call the cancelReservation method of the ReservationService
    this.reservationService.cancelReservation(id).subscribe(
      response => {
        console.log('Reservation canceled successfully');
        // Remove the canceled reservation from the array
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      },
      error => {
        console.log('Error canceling reservation: ', error);
      }
    );
  }

  editReservation(id: number): void {
    // Navigate to the reservation edit page
    // You can implement this functionality as needed
    console.log('Editing reservation with ID:', id);
  }

  refundReservation(id: number): void {
    this.snackbar.open('Refunds are not available at the moment', 'Close');
  }

}
