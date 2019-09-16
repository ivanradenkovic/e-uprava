import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { AppointmentService } from './../../services/appointment.service';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css']
})
export class AppointmentCardComponent implements OnInit {

  textAreaControl: FormControl = new FormControl('', Validators.required);
  user$: Observable<any>;
  @Input() appointment: any;
  constructor(private userService: UserService,
              private modalService: NgbModal,
              private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.user$ = this.userService.get(this.appointment.createdBy).valueChanges();
  }

  open(content) {
    this.modalService.open(content);
  }

  onGrant() {
    this.appointmentService.grant(this.appointment.key);
  }

  onReject() {
    this.appointmentService.reject(this.appointment.key, this.textAreaControl.value);
  }
}
