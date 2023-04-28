import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoginFormComponent, MyErrorStateMatcher } from '../login-form/login-form.component';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  firstName: string = '';
  lastName: string = '';
  dob: Date = new Date();
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  phoneNum: string = '';
  credentials: any = [];
  
  passwordError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  dobError: string = '';
  phoneNumError: string = '';

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  hide = true;
  
  matcher = new MyErrorStateMatcher();
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  onSubmit(): void {
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.dob);
    console.log(this.email);
    console.log(this.phoneNum);
    console.log(this.password);
    console.log(this.confirmpassword);

    this.resetError();

    if(this.firstName.length <= 0 || this.lastName.length <= 0 || this.email.length <= 0 || this.password.length <= 0 || this.phoneNum.length <= 0 || !this.dob){
      this.showErrorDialog("Missing field(s)");
      return;
    }

     //name validation
     if(!this.isChar(this.firstName)){
      this.firstNameError = "First Name should contain only characters";
      return;
    }
    if(!this.isChar(this.lastName)){
      this.lastNameError = "Last Name should contain only characters";
      return;
    }
    
    //Date validation
    // if(!this.isValidDate(this.dob)){
    //   this.dobError = "Invalid date format"
    //   return;
    // }

    //email validation
    if(!this.isEmail(this.email)){
      this.emailError = "Invalid email format";
      return;
    }

    if(!this.isDigit(this.phoneNum)){
      this.phoneNumError = "Phone number should only include digits"
      return;
    }

    //password validation
    if (this.password.length < 8) {
      this.passwordError = "Password must be at least 8 characters long";
      return;
    }
    else if (!this.isPassword(this.password)) {
      this.passwordError = "Invalid password format. Must include: upper, lower, special, num";
      return;
    }
    else if(this.confirmpassword != this.password){
      this.passwordError = "Password and confirm Password do not match";
      return;
    }

    this.authService.signUp(this.email, this.password, this.firstName, this.lastName, 'dobString', this.phoneNum).subscribe(
      (response) => {
        this.credentials = response
        console.log(this.credentials);
        this.authService.setAuthenticated(true);
        this.clearForm();
      },
      (error) => {
        // Handle login error, e.g., display an error message
      }
    );
  }


  isDigit(str: string) {
    const digitPattern = /^\d*$/;
    return digitPattern.test(str);
  }

  private isPassword(str: string){
    // Password should contain atleast 1 upper 1 lower 1 digit and 1 special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
    return passwordPattern.test(str);
  }

  private isChar(str: string){
    const stringPattern = /^[a-zA-Z]+$/;
    return stringPattern.test(str);
  }

  private isEmail(str: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //^[^\s@]+@(?:(gmail|hotmail|outlook))\.[^\s@]+$
    return emailPattern.test(str);
  }

  private isValidDate(date: Date): boolean {
    // Check if date is valid and is not in the future
    const now = new Date();
    return date instanceof Date && !isNaN(date.getTime()) && date <= now;
  }

  dateFilter = (date: Date) => {
    const currentDate = new Date();
    const minDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 200));
    return date >= minDate && date <= currentDate;
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
  }

  resetError(){
    this.emailError = '';
    this.passwordError = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.dobError = '';
  }


  clearForm() {
    this.resetError();
    this.email = '';
    this.password = '';
    this.confirmpassword = '';
    this.firstName = '';
    this.lastName = '';
    this.phoneNum = '';
    this.dob = new Date();
  }

  closePopup(){
    //close login form before opening signup form
    this.dialog.closeAll();
  }

  openLoginForm(): void {
    this.closePopup();
    this.dialog.open(LoginFormComponent, {
      disableClose: true,
      width: '600px', // Adjust the width
      height: '500px', // Adjust the height
    });
  }
}
