import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;

    hamburger.addEventListener('click', mobileMenu);

    function mobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }

    const navLink = document.querySelectorAll('.nav-link');
    navLink.forEach((n) => n.addEventListener('click', closeMenu));

    function closeMenu() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  public backgroundImage = "url('/assets/angular/image/jounieh-wallpaper.jpg')";

  img(change: string) {
    this.backgroundImage = `url('${change}')`;
    this.changeBackground(change);
  }

  changeBackground(change: string) {
    const image = document.querySelector('.image') as HTMLElement;
    image.style.backgroundImage = `url('${change}')`;
  }

}
