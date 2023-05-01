import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  @ViewChild('checkInInput')
  checkInInput!: ElementRef;
  @ViewChild('checkOutInput')
  checkOutInput!: ElementRef;
  @ViewChild('roomTypeSelect')
  roomTypeSelect!: ElementRef;
  @ViewChild('viewSelect')
  viewSelect!: ElementRef;

  roomTypeFormControl = new FormControl('', Validators.required);
  viewSelectFormControl = new FormControl('', Validators.required);

  datesSelected = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private bookingService: BookingService,
    private dialog: MatDialog
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
        if (this.roomTypeFormControl.hasError('required')) {
          this.snackBar.open('Room type is required', 'OK', {
            duration: 3000,
          });
          return;
        }
        if (this.viewSelectFormControl.hasError('required')) {
          this.snackBar.open('View is required', 'OK', {
            duration: 3000,
          });
          return;
        }
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

    // const checkInValue = this.checkInInput.nativeElement.value as string;
    // const checkOutValue = this.checkOutInput.nativeElement.value as string;
    // const roomType = this.roomTypeSelect.nativeElement.value as string;
    // const viewString = this.viewSelect.nativeElement.value as string;
    // let view = false;
    // if(viewString == 'Beach'){
    //   view = true;
    // }
    
    // console.log(checkInValue); // Check if this element is properly initialized
    // console.log(checkOutValue); // Check if this element is properly initialized
    // console.log(roomType); // Check if this element is properly initialized
    // console.log(view); // Check if this element is properly initialized

    this.bookingService
      .checkAvailability('2023-02-02', '2023-02-07', 'single', false)
      .subscribe(
        (response) => {
          // Handle the availableRooms response from the service
          this.bookingService.setAvailableRooms(response); // Store the availableRooms in the service
          this.bookingService.setRoomType('Single');
          this.bookingService.setView('City');
          this.router.navigate(['/available-rooms']); // Navigate to the available rooms page
        },
        (error) => {
          // Handle errors from the service
          console.error(error);
          this.showErrorDialog(
            'Failed to check availability. Please try again later.'
          );
        }
      );
    this.router.navigate(['/available-rooms']);
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
  }
}
