import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { AppointmentPreviewCardComponent } from './components/appointment-preview-card/appointment-preview-card.component';
import {
  AppointmentsCreateCompletedComponent,
} from './components/appointments-create-completed/appointments-create-completed.component';
import { AppointmentsCreateComponent } from './components/appointments-create/appointments-create.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentService } from './services/appointment.service';
import { AuthGuard } from './services/auth-guard.service';
import { OfficeAuthGuard } from './services/office-auth-guard.service';
import { auth } from 'firebase/app';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    LoginComponent,
    AppointmentsComponent,
    RegisterComponent,
    AppointmentsCreateComponent,
    AppointmentsCreateCompletedComponent,
    AppointmentCardComponent,
    MyAppointmentsComponent,
    AppointmentPreviewCardComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ivan-e-uprava'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard, OfficeAuthGuard] },
      { path: 'appointments/create', component: AppointmentsCreateComponent, canActivate: [AuthGuard] },
      { path: 'appointments/create/completed', component: AppointmentsCreateCompletedComponent, canActivate: [AuthGuard] },
      { path: 'appointments/my', component: MyAppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
    ]),
  ],
  providers: [
    OfficeAuthGuard,
    AuthGuard,
    AngularFireDatabase,
    AngularFireAuth,
    AppointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
