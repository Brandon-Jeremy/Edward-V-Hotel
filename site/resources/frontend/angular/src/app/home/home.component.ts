import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  header!: ElementRef;
  hamburgerMenu!: ElementRef;
  showLoginForm = false;
  showSignUpForm = false;

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
    this.showLoginForm = true;
  }
  
  openSignUpForm(){
    this.showSignUpForm = true;
  }

  closeLoginForm() {
    this.showLoginForm = false;
  }

  closeSignUpForm() {
    this.showSignUpForm = false;
  }

}