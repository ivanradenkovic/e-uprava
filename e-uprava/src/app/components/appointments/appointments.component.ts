import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Observable, Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { purposes } from 'src/app/global/purposes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  purposes = purposes;
  subscription: Subscription;
  form: FormGroup | null;
  loading = true;
  constructor(private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.form = this.fb.group({
      purpose: '',
      date: ''
    });

    this.subscription = this.appointmentService.getAll()
      .subscribe(app => {
        this.loading = false;
        this.appointments = this.filteredAppointments = app as Appointment[];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSearch() {
    const ngbDate = this.form.value.date;
    const query = {
      purpose: this.form.value.purpose,
      date: ngbDate ? new Date(ngbDate.year, ngbDate.month, ngbDate.day).getTime() : undefined
    };
    this.filteredAppointments = this.appointments
      .filter(a => query.purpose ? a.purpose.toLowerCase() === query.purpose.toLowerCase() : true)
      .filter(a => query.date ? a.date > query.date : true);
  }
}
