import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { LoginCredentials } from '../models/login-credentials';
import { RegisterUser } from '../models/register-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;
  appUser: AppUser;
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.user$ = this.afAuth.authState;
   }

  register(regUser: RegisterUser): Promise<firebase.auth.UserCredential> {
     return this.afAuth.auth.createUserWithEmailAndPassword(regUser.email, regUser.password)
          .then(credentials => {
            this.userService.save(credentials.user.uid, {
              name: regUser.name,
              email: regUser.email,
              isOffice: false,
            });
            return credentials;
        });

  }

  login(credentials: LoginCredentials): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['/']));
  }
  public get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      }));
  }
}
