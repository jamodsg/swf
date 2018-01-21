import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IApplication } from '../../interfaces/application.interface';

@Injectable()
export class ApplicationService {

  private collectionRef: AngularFirestoreCollection<IApplication>;
  private path = `applications`;
  applications$: Observable<IApplication[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IApplication>(this.path);
    this.applications$ = this.collectionRef.valueChanges();
  }

  createApplication(application: IApplication): Promise<void> {
    if (!application.id) {
      application.id = this.afs.createId();
    }
    return this.afs.collection(this.path).doc(application.id).set(application);
  }

  /**
   * unused
   *
   removeApplication(application: IApplication): Promise<any> {
    return this.afs.collection(this.path).doc(application.id).delete();
  } */

  updateApplication(applicationId: string, application: IApplication): Promise<any> {
    return this.afs.collection(this.path).doc(applicationId).update(application);
  }

  /**
   * unused
   *
   getApplicationById(applicationId: string): Observable<IApplication> {
    return this.afs.doc<IApplication>(this.path + '/' + applicationId).valueChanges();
  } */

  setNewApplication(): IApplication {
    return {
      id: this.afs.createId(),
      page: {
        isEnabled: true,
        name: '',
        email: '',
        title: ''
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
