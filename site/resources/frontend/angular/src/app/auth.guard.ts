// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canSearchForRoomsVar = true;

  canSearchForRooms(): boolean {
    return this.canSearchForRoomsVar;
  }

  canActivate(): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
