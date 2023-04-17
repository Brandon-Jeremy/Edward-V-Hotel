import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edward V Hotel';

  isLoggedIn = false;

  constructor(public router: Router) {}

  sections = [
    { component:HomeComponent, className: 'home-section' },
    { component:BookingComponent, className: 'book-section' },
    { component:RoomsComponent, className: 'rooms-section' },
    { component:ContactComponent, className: 'contact-section' },
    { component:FooterComponent, className: 'footer-section' }
  ];
}
