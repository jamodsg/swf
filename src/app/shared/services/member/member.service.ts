import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { IMember } from '../../interfaces/member/member.interface';

@Injectable()
export class MemberService {

  private collectionRef: AngularFirestoreCollection<IMember>;
  private path = `members`;

  members$: Observable<IMember[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collectionRef = this.afs.collection<IMember>(this.path);
    this.members$ = this.collectionRef.valueChanges();
  }

  createMember(club: IMember): Promise<void> {
    club.id = this.afs.createId();
    return this.afs.collection(this.path).doc(club.id).set(club);
  }

  removeMember(club: IMember): Promise<void> {
    return this.afs.collection(this.path).doc(club.id).delete();
  }

  updateMember(clubId: string, club: IMember): Promise<any> {
    return this.afs.collection(this.path).doc(clubId).update(club);
  }

  getMemberById(clubId: string): Observable<IMember> {
    return this.afs.doc<IMember>(this.path + '/' + clubId).valueChanges();
  }

  getProfileImage(imageUrl, gender) {
    const path = './assets/sfw/placeholder/';
    return imageUrl ? imageUrl : (gender === 'male') ? path + 'avatar_male.jpg' : path + 'avatar_female.jpg';
  }

  /*
  setNewMember(): IMember {
    const mainData: IMemberMainData = {
      gender: 'male',
      birthday: moment().format('YYYY-MM-DD')
    };
    const otherData: IMemberOtherData = {};
    const address: IAddress = {};
    const contact: IContact = {};
    const clubData: IMemberData = {
      assignedMember: '',
      status: 0
    };
    const dfbData: IMemberDFBData = {
      guestPlayer: null
    };
    const profile: IProfile = {
      playerInfo: {
        strongFoot: ''
      },
      favorites: {}
    };
    const ahData: IMemberAHData = {
      status: 0
    };
    const data: IMember = {
      isImported: false,
      creation: this.authService.getCreation(),
      mainData: mainData,
      otherData: otherData,
      address: address,
      contact: contact,
      clubData: clubData,
      dfbData: dfbData,
      ahData: ahData,
      interview: [],
      profile: profile
    };
    return data;
  }
  */
}
