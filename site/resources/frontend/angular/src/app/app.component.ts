import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { LocationComponent } from './location/location.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edward V Hotel';

  constructor(public router: Router) {}

  sections = [
    { component:HomeComponent, className: 'home-section' },
    { component:BookingComponent, className: 'book-section' },
    { component:RoomsComponent, className: 'rooms-section' },
    { component:ContactComponent, className: 'contact-section' },
    { component:LocationComponent, className: 'location-section' },
    { component:FooterComponent, className: 'footer-section' }
  ];
}
