import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IMember } from '../../../src/app/shared/interfaces/member/member.interface';

const db = admin.firestore();

export const deleteDriveMember = functions.database.ref('/drive-members/{userId}').onDelete( (event: any) => {
  return db.collection('users').doc(event.params.userId).delete();
});

export const driveMember = functions.database.ref('/drive-members/{userId}').onWrite((event: any) => {

  const data = event.data.val();

  const memberPath = 'members';

  if(!data){
    return true;
  }

  let birthDate = '';
  if(data.birthday && data.birthday !== '') {
    birthDate = data.birthday.substr(0, 10);
  }

  return db.collection(memberPath)
    .where('mainData.firstName', '==', data.firstName)
    .where('mainData.lastName', '==', data.lastName)
    .where('mainData.birthday', '==', birthDate)
    .get()
    .then((value: FirebaseFirestore.QuerySnapshot) => {

      const addressData = (data.street !== '' || data.houseNumber !== '' || data.city !== '' || data.zip !== '') ? {
        streetName: data.street ? data.street : '',
          houseNumber: data.houseNumber ? data.houseNumber : '',
          city: data.city ? data.city : '',
          zip: data.zip ? data.zip : '',
      } : undefined;

      const contactData = (data.email !== '' || data.phoneHome !== '' || data.phoneMobile !== '') ? {
        email: data.email ? data.email : '',
        phoneHome: data.phoneHome ? data.phoneHome : '',
        phoneMobile: data.phoneMobile ? data.phoneMobile : ''
      } : undefined;

      const clubData = {
        status: data.clubStatus ? data.clubStatus : 0,
        joined: data.clubJoined ? data.clubJoined : '',
        left: data.clubLeft ? data.clubLeft : '',
        payment: data.clubPayment ? data.clubPayment : '',
        positionsInClub: data.positionsInClub ? data.positionsInClub : ''
      };

      const ahData = {
        status: data.ahStatus ? data.ahStatus : 0,
        joined: data.ahJoined ? data.ahJoined : '',
        left: data.ahLeft ? data.ahLeft : '',
        payment: data.ahPayment ? data.ahPayment : '',
      };

      let memberData: IMember = {
        isImported: true,
        mainData: {
          title: data.title ? data.title : '',
          gender: data.gender.indexOf('innen') !== -1 ? 'female' : 'male',
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: birthDate
        },
        address: addressData,
        contact: contactData,
        clubData: clubData,
        ahData: ahData,
        creation: {
          from: 'system',
          at: new Date()
        },
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
        memberData.creation = value.docs[0].data().creation;
        return doc.ref.set(memberData, { merge: true });
      }
    })
    .catch((error: any) => console.log(error));

});
