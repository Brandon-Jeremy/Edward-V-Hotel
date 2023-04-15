import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { RewardComponent } from './reward/reward.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:"", component:HomeComponent },
  //{path: '**', redirectTo: '' }, // redirect to home if the requested URL doesn't match any path
  {path:"home", component:HomeComponent},
  {path:"login", component: LoginFormComponent },
  {path:"signup", component: SignUpFormComponent },
  {path:"book", component:BookingComponent},
  {path:"rooms", component:RoomsComponent},
  {path:"contact", component:ContactComponent},
  {path:"rewards", component:RewardComponent},
  {path:"forgot-password", component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
