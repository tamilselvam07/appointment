import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'contactNumber', 'date', 'time'];
  appointments = new MatTableDataSource<any>([]);
  selectedDate = new Date();
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentBooked(this.selectedDate).then((result) => {
      this.appointments = result;
    }).catch((error) => {
      console.log(error);
    })
  }
  onDateChange(e){
    this.appointmentService.getAppointmentBooked(e.value).then((result) => {
      this.appointments = result;
    }).catch((error) => {
      console.log(error);
    })
  }
}

