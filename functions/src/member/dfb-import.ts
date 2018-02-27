import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const dfbMemberCron = functions.database.ref('/dfb-members/{userId}').onWrite((event: any) => {

  const data = event.data.val();

  if (!data) return true;

  const db = admin.firestore();
  const memberPath = 'members';

  return db.collection('clubs').where('title', '==', data.assignedClub).get().then((values: FirebaseFirestore.QuerySnapshot) => {

    const clubId = values.docs[0].id;

    let birthDate = '';
    if (data.birthday !== '') {
      birthDate = data.birthday.substring(0,10);
    }

    return db.collection(memberPath)
      .where('mainData.firstName', '==', data.firstName)
      .where('mainData.lastName', '==', data.lastName)
      .where('mainData.birthday', '==', birthDate)
      .get()
      .then((values: FirebaseFirestore.QuerySnapshot) => {

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

        const mainData = {
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: birthDate,
          gender: data.ageGroup.indexOf('innen') !== -1 ? 'female' : 'male'
        };

        const dfbData = {
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
        };

        let memberData: any = {
          isImported: true,
          mainData: mainData,
          clubData: {
            assignedClub: clubId
          },
          dfbData: dfbData
        };
        if (values.empty) {
          memberData.id = db.collection(memberPath).doc().id;
          memberData.creation = {
            from: 'system',
            at: new Date()
          };
          return db.collection(memberPath).doc(memberData.id).set(memberData);
        }
        else {
          const doc = values.docs[0];
          return doc.ref.set(memberData, {merge: true});
        }
      })
      .catch((error: any) => console.error(error));

  });
});
