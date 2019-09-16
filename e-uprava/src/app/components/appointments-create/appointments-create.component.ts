import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppointmentService } from 'src/app/services/appointment.service';

import { purposes, obligations } from '../../global/purposes';
import { periods } from '../../global/scheduling-periods';
import { CreateAppointment } from 'src/app/models/create-appointments';

@Component({
  selector: 'app-appointments-create',
  templateUrl: './appointments-create.component.html',
  styleUrls: ['./appointments-create.component.css']
})
export class AppointmentsCreateComponent implements OnInit {

  disabled: boolean;
  errorCode: string;
  form: FormGroup | null;
  subscription: Subscription;
  
  periods = periods;
  purposes = purposes;
  obligations = obligations;
  constructor(private fb: FormBuilder,
              private router: Router,
              private appointmentService: AppointmentService,
              private modalService: NgbModal,
              config: NgbModalConfig) {
                config.backdrop = 'static';
                config.keyboard = false;
              }

  ngOnInit() {
    this.form = this.fb.group({
      purpose: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      obligations: ['', Validators.required]
    });

    this.subscription = this.form.get('date').valueChanges
        .pipe(switchMap((ngbDate: NgbDate) => {
          this.form.get('time').reset();
          return this.appointmentService.getReservedPeriods(ngbDate);
        })).subscribe(reservedPeriods => {
          this.periods = this.periods.filter(p => !reservedPeriods.includes(p.display));
        })
  }

  onSubmit() {
    this.disabled = true;

    const ngbDate: NgbDate = this.form.value.date;
    const period = this.periods.find(t => t.display === this.form.value.time);
    const appointment: CreateAppointment = {
      ngbDate: this.form.value.date as NgbDate,
      purpose: this.form.value.purpose,
      period: period
    };

    this.appointmentService.create(appointment)
        .then(() => this.disabled = false)
        .then(() => this.router.navigate(['/appointments/create/completed']));
  }

  open(content) {
    this.modalService.open(content);
  }


}
