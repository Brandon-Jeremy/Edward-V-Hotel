import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {
  LoginFormComponent,
  MyErrorStateMatcher,
} from '../login-form/login-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  hideP = true;
  hideCP = true;

  matcher = new MyErrorStateMatcher();

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$'),
    Validators.minLength(2),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$'),
    Validators.minLength(2),
  ]);
  dobFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneNumFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
    Validators.minLength(7),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/
    ),
    Validators.minLength(8),
  ]);

  firstName: string = '';
  lastName: string = '';
  //dob: Date = new Date();
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  phoneNum: string = '';
  credentials: any = [];

  dob: FormControl;

  passwordError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  dobError: string = '';
  phoneNumError: string = '';
  confirmPasswordError: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.dob = new FormControl();
  }

  onSubmit(): void {
    this.resetError();

    // if(this.firstName.length <= 0 || this.lastName.length <= 0 || this.email.length <= 0 || this.password.length <= 0 || this.phoneNum.length <= 0 || !this.dob){
    //   this.showErrorDialog("Missing field(s)");
    //   return;
    // }

    //name validation
    // if(!this.isChar(this.firstName)){
    //   this.firstNameError = "First Name should contain only characters";
    //   return;
    // }

    // if(!this.isChar(this.lastName)){
    //   this.lastNameError = "Last Name should contain only characters";
    //   return;
    // }
    if (this.firstNameFormControl.hasError('required')) {
      this.firstNameError = 'First Name is required';
      return;
    }
    if (
      this.firstNameFormControl.hasError('minLength') ||
      this.firstName.length < 2
    ) {
      this.firstNameError = 'First Name should be atleast 2 characters long';
      return;
    }
    if (this.firstNameFormControl.hasError('pattern')) {
      this.firstNameError = 'First Name should contain only characters';
      return;
    }

    if (this.lastNameFormControl.hasError('required')) {
      this.lastNameError = 'Last Name is required';
      return;
    }
    if (
      this.lastNameFormControl.hasError('minLength') ||
      this.lastName.length < 2
    ) {
      this.lastNameError = 'Last Name should be atleast 2 characters long';
      return;
    }
    if (this.lastNameFormControl.hasError('pattern')) {
      this.lastNameError = 'Last Name should contain only characters';
      return;
    }

    //Date validation
    // if(!this.isValidDate(this.dob)){
    //   this.dobError = "Invalid date format"
    //   return;
    // }
    if (this.dobFormControl.hasError('required')) {
      this.dobError = 'Date of Birth is required';
      return;
    }

    //email validation
    // if(!this.isEmail(this.email)){
    //   this.emailError = "Invalid email format";
    //   return;
    // }
    if (this.emailFormControl.hasError('required')) {
      this.emailError = 'Email is required';
      return;
    }
    if (this.emailFormControl.hasError('email')) {
      this.emailError = 'Invalid email format';
      return;
    }

    //phoneNum validation
    // if(!this.isDigit(this.phoneNum)){
    //   this.phoneNumError = "Phone number should only include digits"
    //   return;
    // }
    if (this.phoneNumFormControl.hasError('required')) {
      this.phoneNumError = 'Phone number is required';
      return;
    }
    if (this.phoneNumFormControl.hasError('pattern')) {
      this.phoneNumError = 'Phone number should only include digits';
      return;
    }
    if (
      this.phoneNumFormControl.hasError('minLength') ||
      this.phoneNum.length < 7
    ) {
      this.phoneNumError = 'Phone number should be atleast 7 digits long';
      return;
    }

    //password validation
    // if (this.password.length < 8) {
    //   this.passwordError = "Password must be at least 8 characters long";
    //   return;
    // }
    // else if (!this.isPassword(this.password)) {
    //   this.passwordError = "Invalid password format. Must include: upper, lower, special, num";
    //   return;
    // }
    // else if(this.confirmpassword != this.password){
    //   this.showErrorDialog("Password and confirm Password do not match");
    //   return;
    // }
    if (this.passwordFormControl.hasError('required')) {
      this.passwordError = 'Password is required';
      return;
    }
    if (this.passwordFormControl.hasError('pattern')) {
      this.passwordError = 'Must include: upper, lower, special, num';
      return;
    }
    if (
      this.passwordFormControl.hasError('minLength') ||
      this.password.length < 8
    ) {
      this.passwordError = 'Password must be at least 8 characters long';
      return;
    }

    console.log(
      'password: ',
      this.password,
      'Confirm password: ',
      this.confirmpassword
    );
    if (this.confirmpassword != this.password) {
      this.confirmPasswordError = 'Password and confirm Password do not match';
      return;
    }

    // const dobString = this.dob.toDateString();
    // console.log(dobString);

    const user = {
      mail: this.email,
      pswrd: this.password,
      fName: this.firstName,
      lName: this.lastName,
      dob: this.dob,
      num: this.phoneNum,
    };

    //console.log(this.getFormattedDate());
    this.authService
      .signUp(
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        '2002-04-29',
        this.phoneNum
      )
      .subscribe(
        //this.authService.signp(user).subscribe(
        (response) => {
          this.credentials = response;
          console.log(this.credentials);
          this.authService.setAuthenticated(true);
          this.clearForm();
        },
        (error) => {
          console.log(error);
          this.showErrorDialog(error.error.message);
          // Handle login error, e.g., display an error message
        }
      );
  }

  validateDate(control: FormControl) {
    const value = control.value;
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return { invalidDate: true };
    }
    const dateParts = value.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < date.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      this.dobError = 'Should be older than 18';
      return null;
    }
    return null;
  }

  // private isDigit(str: string) {
  //   const digitPattern = /^\d*$/;
  //   return digitPattern.test(str);
  // }

  // private isPassword(str: string){
  //   // Password should contain atleast 1 upper 1 lower 1 digit and 1 specail
  //   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
  //   return passwordPattern.test(str);
  // }

  // private isChar(str: string){
  //   const stringPattern = /^[a-zA-Z]+$/;
  //   return stringPattern.test(str);
  // }

  // private isEmail(str: string) {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   //^[^\s@]+@(?:(gmail|hotmail|outlook))\.[^\s@]+$
  //   return emailPattern.test(str);
  // }

  // private isValidDate(date: Date): boolean {
  //   // Check if date is valid and is not in the future
  //   const now = new Date();
  //   return date instanceof Date && !isNaN(date.getTime()) && date <= now;
  // }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
  }

  getFormattedDate() {
    const dob = this.dobFormControl.value
      ? this.dobFormControl.value.toString().split('-')
      : [];
    console.log('DOB', dob);
    const year = dob[0];
    const month = dob[1];
    const day = dob[2];
    return `${year}-${month}-${day}`;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    const selectedDate = event.value;
    const now = new Date();
    const age = now.getFullYear() - selectedDate!.getFullYear();
    if (age < 18) {
      this.dobError = 'You must be at least 18 years old to register';
    } else {
      this.dobError = '';
    }
  }

  resetError() {
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
    //this.dob = new Date();
  }

  closePopup() {
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
