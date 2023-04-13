import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ReservationBarComponent } from './reservation-bar/reservation-bar.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edward V Hotel';
  sections = [
    { component: HomeComponent, className: 'home-section' },
    { component: ReservationBarComponent, className: 'reservation-bar-section' },
    { component: AboutComponent, className: 'about-section' },
    // { component: FooterComponent, className: 'footer-section' }
  ];
}
