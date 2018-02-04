'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


export const updateDriveMember = functions.database.ref('/drivemembers/{userId}').onUpdate(event => {
  const data = event.data.val();

  const db = admin.firestore();
  const memberPath = 'members';
  console.log('START');

  return db.collection(memberPath)
    .where('mainData.firstName', '==', data.firstName)
    .where('mainData.lastName', '==', data.lastName)
    .where('mainData.birthday', '==', data.birthday)
    .get()
    .then((doc: any) => {
      if (!doc.exists) {
        console.log('creating new User 123');

        const dmy = data.birthday.split('.');
        const birthDate = new Date(dmy[2], dmy[1] - 1, dmy[0]);
        console.log(birthDate);
        /*const clubJoined = moment(data.clubJoined, "YYYY-MM-DD").toString();
        const clubLeft = moment(data.clubLeft, "YYYY-MM-DD").toString();
        const ahJoined = moment(data.ahJoined, "YYYY-MM-DD").toString();
        const ahLeft = moment(data.ahLeft, "YYYY-MM-DD").toString(); */

        let memberData = {
          isImported: true,
          mainData: {
            title: data.title,
            gender: data.salutation === 'Herr' ? 'male' : 'female',
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: birthDate
          },
          address: {
            streetName: data.street,
            houseNumber: data.houseNumber,
            city: data.city,
            zip: data.zip,
          },
          contact: {
            email: data.email,
            phoneHome: data.phoneHome,
            phoneMobile: data.phoneMobile
          },
          clubData: {
            status: data.clubStatus,
            joined: data.clubJoined,
            left: data.clubLeft,
            payment: data.clubPayment
          },
          ahData: {
            status: data.ahStatus,
            joined: data.ahJoined,
            left: data.ahLeft,
            payment: data.ahPayment
          },
          dfbData: {},
          otherData: {},
          interview: {},
          creation: {
            from: 'system',
            at: new Date()
          },
          comment: data.comment
        };
        console.log(memberData);
        console.log('ended');
        return db.collection(memberPath).add(memberData);
      }
      else {
        console.log('update');
        console.log(doc.id());
        return doc.set(data, { merge: true });
      }
    })
    .then(() => console.log('user updated'))
    .catch((error: any) => console.log(error));

});
