import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('templateRef') templateRef!: ElementRef;


  email : string = '';
  password : string = '';
  emailError : string = '';
  passwordError : string = '';
  credentials: any = [];

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openForm(): void {
    this.templateRef.nativeElement.style.display = 'block';
  }
  
  onSubmit(): void {
    this.resetError();
    
    if(!this.isEmail(this.email)){
      this.emailError = "Invalid email format";
      return;
    }
    
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.credentials = response
        console.log(this.credentials);
        this.clearForm();
        this.showSnackbar('Logged in successfull');
      },
      (error) => {
        // Handle login error, e.g., display an error message
      }
    );
  }

  private isEmail(str: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ^[^\s@]+@(?:(gmail|hotmail|outlook))\.[^\s@]+$
    return emailPattern.test(str);
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  resetError(){
    this.emailError = '';
    this.passwordError = '';
  }

  clearForm(): void {
    this.resetError();
    this.email = '';
    this.password = '';
  }

  openSignUpForm(): void {
    this.dialog.closeAll();//close login form before opening signup form
    this.dialog.open(SignUpFormComponent, {
      disableClose: true,
      width: '600px', // Adjust the width
      height: '700px', // Adjust the height
    });
  }

  closePopup(){
    this.dialog.closeAll();
  }

}
