import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IMember } from '../../../src/app/shared/interfaces/member/member.interface';

export const deleteDriveMember = functions.database.ref('/drive-members/{userId}').onDelete( (event: any) => {
  console.log(event.params.userId + ' deleted');
  return true;
});

export const createOrUpdateDriveMember = functions.database.ref('/drive-members/{userId}').onWrite((event: any) => {
  const data = event.data.val();

  const oldValue: IMember = event.data.previous.val();

  const db = admin.firestore();
  const memberPath = 'members';

  let birthDate = '';
  if (data.birthday) {
    const dmy = data.birthday.split('.');
    birthDate = dmy[2] + '-' + dmy[1] + '-' + dmy[0];
  }

  return db.collection(memberPath)
    .where('mainData.firstName', '==', data.firstName)
    .where('mainData.lastName', '==', data.lastName)
    .where('mainData.birthday', '==', birthDate)
    .get()
    .then((value: FirebaseFirestore.QuerySnapshot) => {

      let clubJoined = '';
      if (data.clubJoined) {
        const cj = data.clubJoined.split('.');
        clubJoined = cj.length === 3 ? cj[2] + '-' + cj[1] + '-' + cj[0] : '';
      }

      let clubLeft = '';
      if (data.clubLeft) {
        const cl = data.clubLeft.split('.');
        clubLeft = cl.length === 3 ? cl[2] + '-' + cl[1] + '-' + cl[0] : '';
      }

      let ahJoined = '';
      if (data.ahJoined) {
        const aj = data.ahJoined.split('.');
        ahJoined = aj.length === 3 ? aj[2] + '-' + aj[1] + '-' + aj[0] : '';
      }

      let ahLeft = '';
      if (data.ahLeft) {
        const al = data.ahLeft.split('.');
        ahLeft = al.length === 3 ? al[2] + '-' + al[1] + '-' + al[0] : '';
      }

      let memberData: IMember = {
        isImported: true,
        mainData: {
          title: data.title ? data.title : '',
          gender: data.salutation === 'Herr' ? 'male' : 'female',
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: birthDate
        },
        address: {
          streetName: data.street ? data.street : '',
          houseNumber: data.houseNumber ? data.houseNumber : '',
          city: data.city ? data.city : '',
          zip: data.zip ? data.zip : '',
        },
        contact: {
          email: data.email ? data.email : '',
          phoneHome: data.phoneHome ? data.phoneHome : '',
          phoneMobile: data.phoneMobile ? data.phoneMobile : ''
        },
        clubData: {
          status: data.clubStatus ? data.clubStatus : 0,
          joined: clubJoined,
          left: clubLeft,
          payment: data.clubPayment ? data.clubPayment : ''
        },
        ahData: {
          status: data.ahStatus ? data.ahStatus : 0,
          joined: ahJoined,
          left: ahLeft,
          payment: data.ahPayment ? data.ahPayment : ''
        },
        creation: {
          from: 'system',
          at: new Date()
        },
        assignedDriveId: event.params.userId,
        comment: data.comment ? data.comment : ''
      };

      if (value.empty) {
        console.info('Creating User ...');
        memberData.id = db.collection(memberPath).doc().id;
        return db.collection(memberPath).doc(memberData.id).set(memberData);
      }
      else {
        console.info('Updating User ...');
        const doc = value.docs[0];
        memberData.creation = oldValue.creation;
        return doc.ref.set(memberData, { merge: true });
      }
    })
    .then(() => {
      console.log('Member imported');
    })
    .catch((error: any) => console.log(error));

});
