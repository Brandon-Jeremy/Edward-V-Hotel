import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  subject: string = '';
  email: string = '';
  message: string = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  private sendMessageUrl = 'http://localhost:8000/api/send-mail-to-hotel';

  sendMessage(email: string, message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const body = { email, message };

    return this.http
      .post(this.sendMessageUrl, JSON.stringify(body), { headers })
      .pipe(
        tap((response) => {
          console.log('Email sent');
          this.onSuccess(response);
        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  onSubmit() {
    if (this.emailFormControl.hasError('required')) {
      this.showErrorDialog('Email is Required');
      return;
    }
    if (this.emailFormControl.hasError('email')) {
      this.showErrorDialog('Invalid Email Format');
      return;
    }

    console.log(this.email);
    console.log(this.message);
    this.sendMessage(this.email, this.message).subscribe();
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
  }

  onSuccess(response: any) {
    throw new Error('Method not implemented.');
  }
}