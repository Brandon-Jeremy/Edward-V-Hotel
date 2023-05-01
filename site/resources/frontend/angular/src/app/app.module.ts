import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { ReservationMenuComponent } from './reservation-menu/reservation-menu.component';
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { PaymentComponent } from './payment/payment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    BookingComponent,
    ForgotPasswordComponent,
    LoginFormComponent,
    SignUpFormComponent,
    RoomsComponent,
    ContactComponent,
    UserComponent,
    ErrorDialogComponent,
    EditUserInfoComponent,
    ReservationMenuComponent,
    AvailableRoomsComponent,
    PaymentComponent,
    LocationComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LoginFormComponent, SignUpFormComponent],
})
export class AppModule {}
