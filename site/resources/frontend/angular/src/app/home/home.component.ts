import { Component, OnInit, ViewChild, HostListener, Inject, InjectionToken } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

//export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  header: HTMLElement | null = null; // define header property

  // constructor() { }

  ngOnInit(): void {
    this.header = document.querySelector('.header'); // assign value to header property
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    this.authService.authStatus$.subscribe(status => {
      // do something with the new authentication status
    });

    if (this.header && hamburgerMenu) {
      window.addEventListener('scroll', () => {
        const windowposition = window.scrollY > 0;
        this.header!.classList.toggle('active', windowposition); // use header property
      });

      hamburgerMenu.addEventListener('click', () => {
        this.header!.classList.toggle('menu-open'); // use header property
      });
    }
  }

  isUserLoggedIn(): boolean {
    console.log('authStatus:', this.authService.getIsAuthenticated().getValue());
    return this.authService.getIsAuthenticated().getValue();
  }

  navigateToAccount(): void {
    if (this.isUserLoggedIn() == true) {
      this.router.navigate(['/user']);
    } else {
      this.showSnackbar('Please login or register to access account');
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openLoginForm(): void {
    this.dialog.open(LoginFormComponent, {
      disableClose: true,
      width: '600px', // Adjust the width
      height: '500px', // Adjust the height
    });
  }

  openSignUpForm(): void {
    this.dialog.open(SignUpFormComponent, {
      disableClose: true,
      width: '600px', // Adjust the width
      height: '750px', // Adjust the height
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

 
}
