import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { purposes } from 'src/app/global/purposes';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentStatus } from 'src/app/enums/appointment-status';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit, OnDestroy {

  translate = {
    PENDING: 'Obrađuje se',
    GRANTED: 'Odobren',
    REJECTED: 'Odbijen',
  };

  AppointmentStatus = AppointmentStatus;
  appointments: Appointment[] = [];
  purposes = purposes;
  subscription: Subscription;
  loading = true;
  constructor(private appointmentService: AppointmentService) { }
  ngOnInit() {
    this.subscription = this.appointmentService.getMyAll()
      .subscribe(app => {
        this.loading = false;
        this.appointments = app as Appointment[];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
