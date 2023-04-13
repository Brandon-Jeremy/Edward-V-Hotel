import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  header: HTMLElement | null = null; // define header property

  // constructor() { }

  ngOnInit(): void {
    this.header = document.querySelector('.header'); // assign value to header property
    const hamburgerMenu = document.querySelector('.hamburger-menu');

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

  

  openLoginForm(): void {
    this.dialog.open(LoginFormComponent, {
      width: '500px', // Adjust the width
      height: '600px', // Adjust the height
    });
  }

  openSignUpForm(): void {
    this.dialog.open(SignUpFormComponent, {
      width: '500px', // Adjust the width
      height: '600px', // Adjust the height
    });
  }
}
