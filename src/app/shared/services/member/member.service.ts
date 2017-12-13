import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMember, IMemberMainData, IMemberOtherData } from '../../interfaces/member.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';
import { IAddress } from '../../interfaces/address.interface';
import { IContact } from '../../interfaces/contact.interface';
import { IClubData } from '../../interfaces/club-data.interface';
import { IClubDFBData } from '../../interfaces/club-dfb-data.interface';
import { IClubAHData } from '../../interfaces/club-ah-data.interface';
import { IProfile } from '../../interfaces/profile.interface';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';

@Injectable()
export class MemberService {

  private collection: AngularFirestoreCollection<IMember>;
  public items$: Observable<IMember[]>;

  private path = `members`;

  constructor(public afs: AngularFirestore,
    private authService: AuthService) {

    this.collection = afs.collection<IMember>(this.path);
    this.items$ = this.collection.snapshotChanges().map(actions => {
      return actions.map((doc: DocumentChangeAction) => {
        const member = doc.payload.doc.data() as IMember;
        member.id = doc.payload.doc.id;
        return member;
      });
    });
  }

  getMembers(): Observable<IMember[]> {
    return this.items$;
  }

  createMember(member: IMember): Promise<void> {
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

  getProfileImage(imageUrl, gender) {
    const path = './assets/sfw/placeholder/';
    return imageUrl ? imageUrl : (gender === 'male') ? path + 'avatar_male.jpg' : path + 'avatar_female.jpg';
  }

  setNewMember(): IMember {
    const mainData: IMemberMainData = {
      gender: 'male',
      birthday: moment().format('YYYY-MM-DD')
    };
    const otherData: IMemberOtherData = {};
    const address: IAddress = {};
    const contact: IContact = {};
    const clubData: IClubData = {
      assignedClub: '',
      status: 0
    };
    const dfbData: IClubDFBData = {
      guestPlayer: null
    };
    const profile: IProfile = {
      playerInfo: {
        strongFoot: ''
      },
      favorites: {}
    };
    const ahData: IClubAHData = {
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

}
