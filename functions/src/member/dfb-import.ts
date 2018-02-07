import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IMember } from '../../../src/app/shared/interfaces/member/member.interface';

export const deleteDFBMember = functions.database.ref('/dfb-members/{clubTitle}/{userId}').onDelete((event: any) => {
  console.log(event.params.userId + ' deleted');
  return true;
});


export const createOrUpdateDFBMember = functions.database.ref('/dfb-members/{clubTitle}/{userId}').onWrite((event: any) => {

  const data = event.data.val();
  const clubTitle = event.params.clubTitle;

  const oldValue: IMember = event.data.previous.val();

  const db = admin.firestore();
  const memberPath = 'members';

  let assignedClub: string = '';
  db.collection('clubs').where('title', '==', clubTitle.replace('-',' ')).get().then(
    (values: FirebaseFirestore.QuerySnapshot) => {
      if (!values.empty) {
        console.log(values.docs[0].id);
        assignedClub = values.docs[0].id;
      }
    }
  );

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

      let eligibleForOfficialMatches = '';
      if (data.eligibleForOfficialMatches) {
        const eO = data.eligibleForOfficialMatches.split('.');
        eligibleForOfficialMatches = eO.length === 3 ? eO[2] + '-' + eO[1] + '-' + eO[0] : '';
      }

      let eligibleForFriendlyMatches = '';
      if (data.eligibleForFriendlyMatches) {
        const eF = data.eligibleForFriendlyMatches.split('.');
        eligibleForFriendlyMatches = eF.length === 3 ? eF[2] + '-' + eF[1] + '-' + eF[0] : '';
      }

      let signOut = '';
      if (data.signOut) {
        const sO = data.signOut.split('.');
        signOut = sO.length === 3 ? sO[2] + '-' + sO[1] + '-' + sO[0] : '';
      }

      let passPrint = '';
      if (data.passPrint) {
        const pP = data.passPrint.split('.');
        passPrint = pP.length === 3 ? pP[2] + '-' + pP[1] + '-' + pP[0] : '';
      }

      let guestRight = '';
      if (data.guestRight) {
        const gR = data.guestRight.split('.');
        guestRight = gR.guestRight === 3 ? gR[2] + '-' + gR[1] + '-' + gR[0] : '';
      }

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
          eligibleForOfficialMatches: eligibleForOfficialMatches,
          eligibleForFriendlyMatches: eligibleForFriendlyMatches,
          signOut: signOut,
          playerStatus: data.playerStatus ? data.playerStatus : '',
          guestPlayer: {
            guestRight: guestRight ? data.guestRight : '',
            season: data.season ? data.season : '',
            type: data.type ? data.type : ''
          },
          passPrint: passPrint,
          allowedToPlay: data.allowedToPlay
        },
        assignedDFBId: event.params.userId
      };

      if (value.empty) {
        console.info('Creating User ...');
        memberData.id = db.collection(memberPath).doc().id;
        memberData.creation = {
          from: 'system',
            at: new Date()
        };
        console.info(memberData);
        return db.collection(memberPath).doc(memberData.id).set(memberData);
      }
      else {
        console.info('Updating User ...');
        console.info(value.docs[0]);
        const doc = value.docs[0];
        memberData.creation = oldValue.creation;
        return doc.ref.set(memberData, {merge: true});
      }
    })
    .catch((error: any) => console.log(error));

});
