import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISponsor } from '../../interfaces/sponsor.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SponsorService {

  private collectionRef: AngularFirestoreCollection<ISponsor>;
  private path = `sponsors`;

  sponsors$: Observable<ISponsor[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collectionRef = this.afs.collection<ISponsor>(this.path);
    this.sponsors$ = this.collectionRef.valueChanges();
  }

  createSponsor(sponsor: ISponsor): Promise<void> {
    sponsor.id = this.afs.createId();
    return this.afs.collection(this.path).doc(sponsor.id).set(sponsor);
  }

  removeSponsor(sponsor: ISponsor): Promise<void> {
    return this.afs.collection(this.path).doc(sponsor.id).delete();
  }

  updateSponsor(sponsorId: string, sponsor: ISponsor): Promise<any> {
    return this.afs.collection(this.path).doc(sponsorId).update(sponsor);
  }

  getSponsorById(sponsorId: string): Observable<ISponsor> {
    return this.afs.doc<ISponsor>(this.path + '/' + sponsorId).valueChanges();
  }

  /*
  getSponsorsForSeason(seasonRange: any): Observable<any> {
    return this.afs.collection(this.path, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query
        .where('sponsorDate', '>=', seasonRange.startDate.toISOString())
        .where('sponsorDate', '<', seasonRange.endDate.toISOString());
      return query;
    }).valueChanges();
  } */

  setNewSponsor(): Observable<ISponsor> {
    return Observable.of({
      title: '',
      internalInfo: ' ',
      description: ' ',
      assignedCategories: [],
      creation: this.authService.getCreation()
    });
  }

}
