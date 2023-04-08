import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { z } from 'zod';

const UserSchema = z.object({
  firstName: z.string().min(2, "Min length must be 2").max(25, "Max length must be 25"),
  lastName: z.string().min(2, "Min length must be 2").max(25, "Max length must be 25"),
  email: z.string().email("Invalid email format"),
  number: z.number().min(8, "Length must be 8").max(8, "Length must be 8"),
  password: z.string().min(8, "Min length must be 8").max(40, "Max length must be 40"),
  confirmPassword: z.string().min(8, "Min length must be 8").max(40, "Max length must be 40")
});

type User = z.infer<typeof UserSchema>;

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  submitted = false;
  serverError = false;
  success = false;

  constructor(private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      number: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]+$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(40)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(40)])]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.serverError = false;

    //Check if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    // Validate form data using zod
    try {
      const validUser = UserSchema.parse(this.registrationForm.value) as User;

      // Make HTTP POST request to register user
      this.http
        .post('/api/register', validUser)
        .subscribe(
          () => {
            this.success = true;
            this.registrationForm.reset();
          },
          (error) => {
            this.serverError = true;
            console.error(error);
          }
        );
    } catch (error) {
      console.error(error);
      this.serverError = true;
    }
  }
}
