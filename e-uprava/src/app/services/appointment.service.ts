import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Appointment } from '../models/appointment';
import { AppointmentStatus } from '../enums/appointment-status';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointment } from '../models/create-appointments';
import { Period } from '../models/periods';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private db: AngularFireDatabase,
              private auth: AuthService) { }


  create(appointment: CreateAppointment) {
    return this.addAppointment(appointment)
            .then(() => this.makeReservation(this.generateKeyFromDate(appointment.ngbDate), appointment.period.display));
  }

  get(appointmentId) {
    return this.db.object('/appointments/' + appointmentId).valueChanges();
  }
  async addAppointment(appointment: CreateAppointment) {
    
    return this.db.list('/appointments').push({
      purpose: appointment.purpose,
      date: this.toDate(appointment.ngbDate, appointment.period).getTime(),
      status: AppointmentStatus.PENDING,
      repliedBy: '',
      createdBy: this.auth.uid
    });
  }
  makeReservation(key: string, time: string) {
    return this.db.list('/reserved-periods/' + key).push(time);
  }


  getAll() {
    return this.db.list('/appointments', query => query.orderByChild('status').equalTo(AppointmentStatus.PENDING)).snapshotChanges().pipe(
      map((appointments: any) =>
        appointments.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

  getReservedPeriods(ngbDate: NgbDate) {
    const key = this.generateKeyFromDate(ngbDate);
    return this.db.list('/reserved-periods/' + key).valueChanges();
  }

  grant(key: string) {
    this.db.object('/appointments/' + key).update({ status: AppointmentStatus.GRANTED, repliedBy: this.auth.uid});
  }
  reject(key: string, message: string) {
    this.db.object('/appointments/' + key)
    .update({ status: AppointmentStatus.REJECTED,
              message: message,
              repliedBy: this.auth.uid
            });

  }

  getMyAll() {
    return this.db.list('/appointments', query => query.orderByChild('createdBy').equalTo(this.auth.uid)).snapshotChanges().pipe(
      map((appointments: any) =>
        appointments.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

  private generateKeyFromDate(ngbDate: NgbDate): string {
    return `${ngbDate.year}-${ngbDate.month}-${ngbDate.day}`;
  }

  private toDate(ngbDate: NgbDate, period: Period): Date {
    return new Date(ngbDate.year, ngbDate.month, ngbDate.day, period.hours, period.minutes);
  }
}
