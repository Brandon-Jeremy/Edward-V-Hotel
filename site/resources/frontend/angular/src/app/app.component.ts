import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edward V Hotel';

  isLoggedIn = this.authService.isAuthenticated();

  constructor(public router: Router, private authService: AuthService) {}

  sections = [
    { component:HomeComponent, className: 'home-section' },
    { component:BookingComponent, className: 'book-section' },
    { component:RoomsComponent, className: 'rooms-section' },
    { component:ContactComponent, className: 'contact-section' },
    { component:FooterComponent, className: 'footer-section' }
  ];
}
