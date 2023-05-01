import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {

  private readonly getRoomsUrl = 'http://localhost:8080/room-availability';

  @ViewChild('checkInInput')
  checkInInput!: ElementRef;
  @ViewChild('checkOutInput')
  checkOutInput!: ElementRef;
  @ViewChild('roomTypeSelect')
  roomTypeSelect!: ElementRef;
  @ViewChild('viewSelect')
  viewSelect!: ElementRef;

  datesSelected = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
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

  public checkAvailability(): Observable<number[]> {

    const checkInValue = this.checkInInput.nativeElement.value as string;
    const checkOutValue = this.checkOutInput.nativeElement.value as string;
    const roomType = this.roomTypeSelect.nativeElement.value as string;
    const view = this.viewSelect.nativeElement.value as string;

    const params = {
      datefrom: checkInValue,
      dateto: checkOutValue,
      type: roomType,
      view: view
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.get<number[]>(`${this.getRoomsUrl}/room-availability`, { 
      params: params,
      headers: headers
    });
  }
}
