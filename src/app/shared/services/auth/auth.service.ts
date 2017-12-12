import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICreation } from '../../interfaces/creation.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../interfaces/user.interface';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import AuthProvider = firebase.auth.AuthProvider;

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

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        this.updateOnConnect();
        this.updateOnIdle();
        return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
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
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(
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

  private oAuthLogin(provider: AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      return this.updateUser(credential.user);
    });
  }

  signInWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  signInWithTwitter(): Promise<any> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  signInWithFacebook(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  register(values: IUser): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password).then((authUser) => {
      authUser.sendEmailVerification().then();
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
      return this.updateUser(values);
    });
  }

  resendVerificationMail(): Promise<any> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<any> {
    return this.updateUser({ onlineStatus: 'offline' }).then(
      () => {
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
    this.mouseEvents = Observable.fromEvent(document, 'mousemove').throttleTime(30000).subscribe(() => {
      this.updateUser({ onlineStatus: 'online' }).then();
      this.resetTimer();
    });
  }

  private resetTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.timer = Observable.timer(40000).subscribe(() => {
      this.updateUser({ onlineStatus: 'away' }).then(
        // () => this.router.navigate(['/locked']).then()
      );
    });
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
