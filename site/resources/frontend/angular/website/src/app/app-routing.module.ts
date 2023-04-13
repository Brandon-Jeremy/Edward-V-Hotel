import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationBarComponent } from './reservation-bar/reservation-bar.component';
import { AboutComponent } from './about/about.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"reservation",component:ReservationBarComponent},
  {path:"about",component:AboutComponent},
  {path:"rooms",component:RoomsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
