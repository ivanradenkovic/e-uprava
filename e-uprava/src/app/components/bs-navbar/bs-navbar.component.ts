import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentStatus } from 'src/app/enums/appointment-status';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  public isNavbarCollapsed = true;
  appUser: AppUser;
  subscription: Subscription;
  constructor(private auth: AuthService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  logout() {
    this.auth.logout();
  }
}
