import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | null;
  disabled: boolean;
  errorCode: string;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.disabled = true;
    this.auth.login(this.form.value)
        .then(() => this.disabled = false)
        .then(() => this.errorCode = '')
        .then(() => this.auth.appUser$.subscribe(user => user.isOffice ? this.router.navigate(['/appointments']) : this.router.navigate(['/appointments/create'])))
        .catch(error => this.errorCode = error.code )
        .then(() => this.disabled = false);
  }

  log(x) {
    console.log('x:', x)
  }
  
}
