import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor() { }

  ngOnInit(): void {
    const header = document.querySelector('.header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (header && hamburgerMenu) {
      window.addEventListener('scroll', function () {
        const windowposition = this.window.scrollY > 0;
        header.classList.toggle('active', windowposition);
      });

      hamburgerMenu.addEventListener('click', function(){
        header.classList.toggle('menu-open');
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
