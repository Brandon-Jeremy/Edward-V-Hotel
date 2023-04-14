import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
// import { UserLoginComponent } from './user-login/user-login.component';
// import { UserRegistrationComponent } from    './user-registration/user-registration.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RewardComponent } from './reward/reward.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:"", component:HomeComponent },
  {path:"home", component:HomeComponent},
  {path: "login", component: LoginFormComponent },
  {path: "signup", component: SignUpFormComponent },
  // {path:"login", component:UserLoginComponent},
  // {path:"registration", component:UserRegistrationComponent},
  {path:"book", component:BookingComponent},
  {path:"rewards", component:RewardComponent},
  {path:"forgot-password", component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
