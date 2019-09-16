import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  disabled: boolean;
  errorCode: string;
  form: FormGroup | null;
  constructor(private auth: AuthService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.form.valueChanges
      .subscribe(x => {
       console.log(' this.form:',  this.form)
      })
  }

  onSubmit() {
    this.disabled = true;
    this.auth.register(this.form.value)
        .then(() => this.disabled = false)
        .then(() => this.errorCode = '')
        .then(() => this.auth.appUser$.subscribe(user => user.isOffice ? this.router.navigate(['/appointments']) : this.router.navigate(['/appointments/create'])))
        .catch(error => this.errorCode = error.code )
        .then(() => this.disabled = false);
  }

}
