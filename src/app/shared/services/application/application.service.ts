import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { IApplication } from '../../interfaces/application.interface';

@Injectable()
export class ApplicationService {

  private collectionRef: AngularFirestoreCollection<IApplication>;
  private path = `applications`;
  applications$: Observable<IApplication[]>;

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
    this.collectionRef = this.afs.collection<IApplication>(this.path);
    this.applications$ = this.collectionRef.valueChanges();
  }

  createApplication(application: IApplication): Promise<void> {
    application.id = this.afs.createId();
    return this.afs.collection(this.path).doc(application.id).set(application);
  }

  removeApplication(application: IApplication): Promise<any> {
    return this.afs.collection(this.path).doc(application.id).delete();
  }

  updateApplication(applicationId: string, application: IApplication): Promise<any> {
    return this.afs.collection(this.path).doc(applicationId).update(application);
  }

  getApplicationById(applicationId: string): Observable<IApplication> {
    return this.afs.doc<IApplication>(this.path + '/' + applicationId).valueChanges();
  }

  setNewApplication(): IApplication {
    return {
      page: {
        isEnabled: true,
        title: '',
        email: ''
      },
      urlShortening: {
        isEnabled: false,
        provider: ''
      },

      registration: {
        isAllowed: false,
        defaultRole: ''
      },
      downtime: {
        isEnabled: false,
        message: ''
      },
      staticPages: [],
      social: []
    };
  }

}
