import { Injectable, APP_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppointmentService {
    appointments =[];
    onAppointmentChanged: BehaviorSubject<any>;
    constructor(private http: HttpClient) {
        this.onAppointmentChanged = new BehaviorSubject({});
    }

    insertAppointment(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiURL + `/appointment`, data).subscribe((res: any) => {
                return resolve(res);
            }, error => {
                if (error.error && error.error.message) {
                    return reject(error.error.message);
                }
                else {
                    return reject(error.message);
                }
            });
        });
    }
    updateAppointment(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(environment.apiURL + `/appointment`, data).subscribe((res: any) => {
                return resolve(res.data);
            }, error => {
                return reject(error);
            });
        });
    }
    getAppointment(date): Promise<any> {
        date = (date) ? date : new Date();
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiURL + `/appointment/${date}`, {
            }).subscribe((res: any) => {
                return resolve(res.data);
            }, error => {
                return reject(error);
            });
        });
    }
    getAppointmentBooked(date): Promise<any> {
        date = (date) ? date : new Date();
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiURL + `/appointment/booked/${date}`, {
            }).subscribe((res: any) => {
                return resolve(res.data);
            }, error => {
                return reject(error);
            });
        });
    }
}
