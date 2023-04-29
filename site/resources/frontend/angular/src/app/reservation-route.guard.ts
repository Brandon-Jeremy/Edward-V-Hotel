import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ReservationRouteGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    // Implement your guard logic here
    const isLoggedIn =  this.authService.isLoggedIn();// check if user is logged in
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
