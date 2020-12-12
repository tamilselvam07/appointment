import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { SlotsComponent } from './slots/slots.component';

const routes: Routes = [
   {
    path: '',
    component: SlotsComponent,
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
