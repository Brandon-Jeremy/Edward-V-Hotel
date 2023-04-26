import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @ViewChild('templateRef') templateRef!: ElementRef;

  email : string = '';
  password : string = '';
  emailError : string = '';
  passwordError : string = '';
  credentials: any = [];

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  matcher = new MyErrorStateMatcher();
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl =  new FormControl('',[Validators.required])

  openForm(): void {
    this.templateRef.nativeElement.style.display = 'block';
  }
  
  onSubmit(): void {
    this.resetError();
    
    //email validation
    if (this.emailFormControl.hasError('required')){
      this.emailError = "Email is required";
      return;
    }
    if(this.emailFormControl.hasError('email')){
      this.emailError = "Invalid email format";
      return;
    }

    //password validation
    if (this.passwordFormControl.hasError('required')){
      this.passwordError = "Password is required";
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
    this.closePopup();
    this.dialog.open(SignUpFormComponent, {
      disableClose: true,
      width: '600px', // Adjust the width
      height: '700px', // Adjust the height
    });
  }

  closePopup(){
    //close login form before opening signup form
    this.dialog.closeAll();
  }

}