import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IMember } from '../../../src/app/shared/interfaces/member/member.interface';

const db = admin.firestore();

export const deleteDFBMember = functions.database.ref('/dfb-members/{userId}').onDelete((event: any) => {
  return db.collection('users').doc(event.params.userId).delete();
});

export const dfbMember = functions.database.ref('/dfb-members/{userId}').onWrite((event: any) => {

  const data = event.data.val();
  console.log(data);

  const oldValue: IMember = event.data.previous.val();

  const memberPath = 'members';

  let assignedClub: string = '';
  db.collection('clubs').where('title', '==', 'SF Winterbach').get().then(
    (values: FirebaseFirestore.QuerySnapshot) => {
      if (!values.empty) {
        assignedClub = values.docs[0].id;
      }
    }
  );

  let birthDate = data.birthday.substr(0, 10);

  return db.collection(memberPath)
    .where('mainData.firstName', '==', data.firstName)
    .where('mainData.lastName', '==', data.lastName)
    .where('mainData.birthday', '==', birthDate)
    .get()
    .then((value: FirebaseFirestore.QuerySnapshot) => {

      let memberData: IMember = {
        isImported: true,
        mainData: {
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: birthDate,
          gender: data.ageGroup.indexOf('innen') !== -1 ? 'female' : 'male'
        },
        dfbData: {
          passNumber: data.passNumber ? data.passNumber : '',
          ageGroup: data.ageGroup ? data.ageGroup : '',
          eligibleForOfficialMatches: data.eligibleOfficial,
          eligibleForFriendlyMatches: data.eligibleFriendly,
          signOut: data.signOut,
          playerStatus: data.playerStatus ? data.playerStatus : '',
          guestPlayer: {
            guestRight: data.guestRight ? data.guestRight : '',
            season: data.season ? data.season : '',
            type: data.type ? data.type : ''
          },
          passPrint: data.passPrint,
          // allowedToPlay: data.allowedToPlay
        }
        //assignedDFBId: event.params.userId
      };

      if (value.empty) {
        console.info('Creating User ...');
        memberData.id = db.collection(memberPath).doc().id;
        memberData.creation = {
          from: 'system',
            at: new Date()
        };
        return db.collection(memberPath).doc(memberData.id).set(memberData);
      }
      else {
        console.info('Updating User ...');
        const doc = value.docs[0];
        memberData.creation = oldValue.creation;
        return doc.ref.set(memberData, {merge: true});
      }
    })
    .catch((error: any) => console.log(error));

});
