import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  header!: ElementRef;
  hamburgerMenu!: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.header = this.elementRef.nativeElement.querySelector('.header');
    this.hamburgerMenu = this.elementRef.nativeElement.querySelector('.hamburger-menu');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const windowPosition = window.scrollY > 0;
    this.header.nativeElement.classList.toggle('active', windowPosition);
  }

  onHamburgerMenuClick(): void {
    const windowPosition = window.scrollY > 0;
    this.header.nativeElement.classList.toggle('menu-open', windowPosition);
  }

  openLoginForm(){

  }
  
  openSignUpForm(){

  }


}
