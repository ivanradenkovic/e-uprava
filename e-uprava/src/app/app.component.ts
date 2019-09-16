import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true;
  constructor(private auth: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onActivate(component) {
    this.showNavbar = !(component instanceof LoginComponent ||
                      component instanceof HomePageComponent ||
                      component instanceof RegisterComponent)
  }
}
