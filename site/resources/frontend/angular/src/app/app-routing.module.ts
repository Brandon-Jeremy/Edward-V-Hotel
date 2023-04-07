import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from    './user-registration/user-registration.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { RewardComponent } from './reward/reward.component';




const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"login", component:UserLoginComponent},
  {path:"registration", component:UserRegistrationComponent},
  {path:"home", component:HomeComponent},
  {path:"book", component:BookingComponent},
  {path:"rewards", component:RewardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
