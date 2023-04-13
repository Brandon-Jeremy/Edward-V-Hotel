import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    const hambuger = document.querySelector('.hambuger') as HTMLElement;
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;

    hambuger.addEventListener('click', mobileMenu);

    function mobileMenu() {
      hambuger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }

    const navLink = document.querySelectorAll('.nav-link');
    navLink.forEach((n) => n.addEventListener('click', closeMenu));

    function closeMenu() {
      hambuger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  img(change: string) {
    const slide = document.querySelector('.slide') as HTMLImageElement;
    this.changeBackground(change);
  }

  changeBackground(change: string) {
    const line = document.querySelector('.image') as HTMLElement;
    line.style.background = `url('${change}') center/cover no-repeat`;
  }
}
