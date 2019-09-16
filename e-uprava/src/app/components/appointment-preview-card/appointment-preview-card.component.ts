import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AppointmentStatus } from 'src/app/enums/appointment-status';

@Component({
  selector: 'app-appointment-preview-card',
  templateUrl: './appointment-preview-card.component.html',
  styleUrls: ['./appointment-preview-card.component.css']
})
export class AppointmentPreviewCardComponent implements OnInit {

  translate = {
    PENDING: 'U procesu obrade',
    GRANTED: 'Odobren',
    REJECTED: 'Odbijen',
  };
  user$: Observable<any>;
  AppointmentStatus = AppointmentStatus;
  @Input() appointment: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.appointment.repliedBy ?
              this.userService.get(this.appointment.createdBy).valueChanges() :
              of(null);
  }


}
