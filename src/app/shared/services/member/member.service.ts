import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { IMember } from '../../interfaces/member/member.interface';

@Injectable()
export class MemberService {

  private collectionRef: AngularFirestoreCollection<IMember>;
  private path = `members`;

  members$: Observable<IMember[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IMember>(this.path);
    this.members$ = this.collectionRef.valueChanges();
  }

  createMember(member: IMember): Promise<void> {
    member.id = this.afs.createId();
    return this.afs.collection(this.path).doc(member.id).set(member);
  }

  removeMember(member: IMember): Promise<void> {
    return this.afs.collection(this.path).doc(member.id).delete();
  }

  updateMember(memberId: string, member: IMember): Promise<any> {
    return this.afs.collection(this.path).doc(memberId).update(member);
  }

  getMemberById(memberId: string): Observable<IMember> {
    return this.afs.doc<IMember>(this.path + '/' + memberId).valueChanges();
  }

  /*getProfileImage(imageUrl, gender) {
    const path = './assets/sfw/placeholder/';
    return imageUrl ? imageUrl : (gender === 'male') ? path + 'avatar_male.jpg' : path + 'avatar_female.jpg';
  } */

  setNewMember(): Observable<IMember> {
    return Observable.of(null);
    /*
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
    */
  }
}
