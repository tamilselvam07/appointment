import { Component, Inject, Injectable, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Moment } from 'moment';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private renderer: Renderer2, private appointmentService: AppointmentService, private dialog: MatDialog) { }
  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate: Moment;
  appointments = [];
  appointmentsEve = [];

  ngOnInit(): void {
    this.appointmentService.getAppointment(this.selectedDate).then((result) => {
      try {
        this.appointments = result.filter((item: any) => {
          return new Date(item.startTime).getTime() < new Date().setHours(12, 0, 0, 0);
        });
        this.appointmentsEve = result.filter((item: any) => {
          return new Date(item.startTime).getTime() > new Date().setHours(12, 0, 0, 0);
        });
      } catch (err) { }
    }).catch((error) => {
      console.log(error);
    })
  }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          alert('Arrow buttons clicked');
        });
      });
    }
  }
  dateChanged(date) {
    this.selectedDate = date;
    this.ngOnInit();
  }
  addSlots(e, type) {
    const dialogRef = this.dialog.open(AppointmentPopup, {
      data: type,
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item == "Success") {
        this.ngOnInit();
      }
    });
  }
  updateSlot(data){
    const dialogRef = this.dialog.open(AppointmentUpdatePopup, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item == "Success") {
        this.ngOnInit();
      }
    });
  }
}

@Component({
  selector: 'appointment-popup',
  templateUrl: './appointmentPopup.html'
})
@Injectable()
export class AppointmentPopup implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string
  form: FormGroup;

  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() value: Date = new Date();
  minValue: any;
  maxValue: any
  date: any = new Date();
  startTime: any;
  endTime: any;
  isDisabled: boolean = true;
  minSlotDate = new Date();

  minValueTo: any;
  maxValueTo: any

  constructor(
    public matDialogRef: MatDialogRef<AppointmentPopup>,
    @Inject(MAT_DIALOG_DATA) private data: any, private appointmentService: AppointmentService, private matSnackBar: MatSnackBar) {

  }

  
  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      
    if (this.data === 'morning') {
      this.minValue = new Date(new Date().setHours(9, 0, 0, 0));
      this.maxValue = new Date(new Date().setHours(12, 0, 0, 0));
    }
    else {
      this.minValue = new Date(new Date().setHours(17, 0, 0, 0));
      this.maxValue = new Date(new Date().setHours(21, 0, 0, 0));
    }
    this.minValueTo = this.minValue;
    this.maxValueTo = this.maxValue;
  }, 100)
  }
  timeChangeHandler(e, type) {
    if (type === 'from') {
      this.startTime = e;
    }
    else {
      this.endTime = e;
    }
  }
  submit() {
    this.startTime.setFullYear(new Date(this.date).getFullYear());
    this.startTime.setMonth(new Date(this.date).getMonth());
    this.startTime.setDate(new Date(this.date).getDate());

    this.endTime.setFullYear(new Date(this.date).getFullYear());
    this.endTime.setMonth(new Date(this.date).getMonth());
    this.endTime.setDate(new Date(this.date).getDate());

    this.appointmentService.insertAppointment({
      startTime: this.startTime,
      endTime: this.endTime,
    }).then((result: any) => {
      this.matSnackBar.open('Updated Successfully!', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'successsnackbarclass'
      });
      this.matDialogRef.close('Success');
    }).catch((error: any) => {
      this.matSnackBar.open(error, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'errorsnackbarclass'
      });
    });
  }
}

@Component({
  selector: 'appointment-update-popup',
  templateUrl: './appointmentUpdatePopup.html'
})
@Injectable()
export class AppointmentUpdatePopup {
  _id: string;
  name: string;
  contactNumber: string
  description: string;

  constructor(
    public matDialogRef: MatDialogRef<AppointmentUpdatePopup>,
    @Inject(MAT_DIALOG_DATA) private data: any, private appointmentService: AppointmentService, private matSnackBar: MatSnackBar) {
      this._id = this.data._id;
     
  }

  submit() {
    this.appointmentService.updateAppointment({
      _id: this._id,
      name: this.name,
      contactNumber: this.contactNumber,
      description: this.description
    }).then((result: any) => {
      this.matSnackBar.open('Updated Successfully!', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'successsnackbarclass'
      });
      this.matDialogRef.close('Success');
    }).catch((error: any) => {
      this.matSnackBar.open(error, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'errorsnackbarclass'
      });
    });
  }
}
