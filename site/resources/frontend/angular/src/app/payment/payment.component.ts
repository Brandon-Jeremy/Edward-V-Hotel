import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  cardName:string = '';
  cardNumber:string = '';
  expirationMonth:string = '';
  expirationYear:string = '';
  cvv:string = '';

  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  cardNumberFormControl = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]);
  expirationMonthFormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(12)]);
  expirationYearFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$'), Validators.min(new Date().getFullYear()), Validators.max(new Date().getFullYear() + 10)]);
  cvvFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]);


  constructor(private dialog:MatDialog) {
  }


  onSubmit() {
    if(this.cardName.length <= 0 || this.cardNumber.length <= 0 || this.expirationMonth.length <= 0 || this.expirationYear.length <=0 || this.cvv.length <= 0){
      this.showErrorDialog("Missing field(s)");
      return;
    }


    // Send payment information to API or backend for processing
  }


  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage },
    });
  }

  

}
