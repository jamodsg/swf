import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { IMatch } from '../../interfaces/match.interface';

@Injectable()
export class MatchService {

  private collectionRef: AngularFirestoreCollection<IMatch>;
  private path = `match-fixtures`;

  matches$: Observable<IMatch[]>;

  constructor(private afs: AngularFirestore, ) {
    this.collectionRef = this.afs.collection<IMatch>(this.path);
    this.matches$ = this.collectionRef.valueChanges();
  }

  createMatch(match: IMatch): Promise<void> {
    match.id = this.afs.createId();
    return this.afs.collection(this.path).doc(match.id).set(match);
  }

  removeMatch(match: IMatch): Promise<void> {
    return this.afs.collection(this.path).doc(match.id).delete();
  }

  updateMatch(matchId: string, match: IMatch): Promise<any> {
    return this.afs.collection(this.path).doc(matchId).update(match);
  }

  getMatchById(matchId: string): Observable<IMatch> {
    return this.afs.doc<IMatch>(this.path + '/' + matchId).valueChanges();
  }

  setNewMatch(): IMatch {
    return {
      homeTeam: {
        externalTeamLink: '',
        logoURL: '',
        title: ''
      },
      guestTeam: {
        externalTeamLink: '',
        logoURL: '',
        title: ''
      },
      isImported: true,
      isHomeTeam: true,
      isOfficialMatch: true,
      assignedTeamCategory: '',
      startDate: new Date(),
      endDate: null,
      matchLink: '',
      matchType: ''
    };
  }
}
