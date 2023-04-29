import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  constructor(private authService:AuthService, private router:Router, private snackBar:MatSnackBar, private dialog:MatDialog) {}

  isUserLoggedIn(): boolean {
    console.log('authStatus:', this.authService.getIsAuthenticated().getValue());
    return this.authService.getIsAuthenticated().getValue();
  }

  navigateToPayment(): void {
    if (this.isUserLoggedIn() == true) {
      this.router.navigate(['/payment']);
    } else {
      this.showSnackbar('Please login or register to book online');
      this.openLoginForm();
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

}
