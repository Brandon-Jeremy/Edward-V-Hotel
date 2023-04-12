import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(PopupComponent) popup!: PopupComponent;
  header: HTMLElement | null = null; // define header property

  constructor() { }

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
    this.popup.openLoginForm();
  }

  openSignUpForm(): void {
    this.popup.openSignUpForm();
  }
}
