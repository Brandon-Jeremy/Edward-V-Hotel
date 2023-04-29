import { Component } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  constructor(private authGuard: AuthGuard, private router: Router) { }

  searchForRooms(){
    console.log("hello");
    if(this.authGuard.canSearchForRooms()){
      this.router.navigate(['/available-rooms'])
    }
  }

}
