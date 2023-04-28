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
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { ReservationRouteGuard } from './reservation-route.guard';


//might be used later
// import { AboutComponent } from './about/about.component';
import { ReservationMenuComponent } from './reservation-menu/reservation-menu.component';
//import { Path } from 'arktype/dist/types/utils/paths';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  //{path: '**', redirectTo: '' }, // redirect to home if the requested URL doesn't match any path
  {path:"login", component: LoginFormComponent },
  {path:"signup", component: SignUpFormComponent },
  {path:"book", component:BookingComponent},
  {path:"rooms", component:RoomsComponent},
  {path:"contact", component:ContactComponent},
  {path:"rewards", component:RewardComponent},
  {path:"user", component: UserComponent, canActivate: [AuthGuard] },
  {path:"forgot-password", component:ForgotPasswordComponent},
  {path: "reservation-menu", component:ReservationMenuComponent},
  { path: 'reservation-menu', component: ReservationMenuComponent, canActivate: [ReservationRouteGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
