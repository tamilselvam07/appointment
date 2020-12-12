import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotsComponent } from './slots/slots.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent, AppointmentPopup, AppointmentUpdatePopup } from './appointment/appointment.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTimepickerModule } from 'mat-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from './appointment/appointment.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,
    SlotsComponent,
    AppointmentComponent,
    AppointmentPopup,
    AppointmentUpdatePopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    AppointmentService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  entryComponents: [
    AppointmentPopup,
    AppointmentUpdatePopup
  ]
})
export class AppModule { }