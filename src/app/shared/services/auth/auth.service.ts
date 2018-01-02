import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operators/throttleTime';
import { timer } from 'rxjs/observable/timer';
import { ISubscription } from 'rxjs/Subscription';

import { ICreation } from '../../interfaces/creation.interface';
import { IUser } from '../../interfaces/user.interface';

// Presence System
// https://www.youtube.com/watch?v=2ZDeT5hLIBQ&feature=push-u&attr_tag=EDwjeHaWKNSWOoZT-6
// Role Management
// https://www.youtube.com/watch?v=3qODuvp1Zp8&feature=push-u&attr_tag=Kh7QBh7gxiT8VfyW-6

@Injectable()
export class AuthService implements OnDestroy {

  public user$: Observable<IUser>;
  private mouseEvents: ISubscription;
  private timer: ISubscription;
  private authSubscription: ISubscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.updateOnConnect();
          this.updateOnIdle();
          return this.afs.doc<IUser>(`users/${ user.uid }`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.mouseEvents.unsubscribe();
    this.timer.unsubscribe();
  }

  get id(): string {
    return this.user$ ? this.afAuth.auth.currentUser.uid : '';
  }

  signIn(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(
      (authUser: firebase.User) => {
        if (authUser.emailVerified) {
          return this.updateUser({
            emailVerified: authUser.emailVerified,
            email: authUser.email
          });
        }
      }
      );
  }

  register(values: IUser): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password)
      .then(authUser => {
        authUser.sendEmailVerification()
          .then(() => {
            delete values.password;
            values.providerId = authUser.providerId;
            values.id = authUser.uid;
            values.assignedRoles = {
              subscriber: true,
              editor: false,
              admin: false
            };
            values.emailVerified = authUser.emailVerified;
            values.creation = this.getCreation();
            return this.setUser(values);
          });
      });
  }

  resendVerificationMail(): Promise<any> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<any> {
    return this.updateUser({
      onlineStatus: 'offline'
    }
    ).then(() => {
      this.mouseEvents.unsubscribe();
      this.timer.unsubscribe();
      return this.afAuth.auth.signOut();
    }
      );
  }

  private updateOnConnect() {
    /* return this.afs.doc('.info/connected').valueChanges().subscribe(connected => {
      const status = connected.$value ? 'online' : 'offline';
      this.updateStatus(status);
    }); */
  }

  private updateOnIdle() {
    this.mouseEvents = fromEvent(document, 'mousemove')
      .pipe(throttleTime(30000))
      .subscribe(() => {
        this.updateUser({
          onlineStatus: 'online'
        }).then(() => this.resetTimer());
      });
  }

  private resetTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.timer = timer(40000).subscribe(() => {
      this.updateUser({
        onlineStatus: 'away'
      }).then(
        // () => this.router.navigate(['/locked']).then()
        );
    });
  }

  private setUser(data: any): Promise<void> {
    return this.afs.doc('users/' + this.id).set(data);
  }

  private updateUser(data: any): Promise<void> {
    return this.afs.doc('users/' + this.id).update(data);
  }

  private checkAuthorization(user: IUser, allowedRoles: string[]): boolean {
    for (const role in allowedRoles) {
      if (user && user.assignedRoles[allowedRoles[role]]) {
        return true;
      }
    }
    return false;
  }

  canWrite(user: IUser): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canRead(user: IUser): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: IUser): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: IUser): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  public getCreation(): ICreation {
    return {
      at: moment().toISOString(),
      from: this.id
    };
  }

}
