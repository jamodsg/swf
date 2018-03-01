import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const spielplanCron = functions.database.ref('/match-fixtures/{seasonId}/{matchNumber}').onWrite((event: any) => {

  console.log(event);
  console.log(event.data);
  console.log(event.data.val());
  return true;
  /*const data = event.data.val();

  const seasonId = event.params.seasonId;
  const seasonTitle = seasonId.replace('-', '/');

  if (!data){
    console.log('no data present');
    return true;
  }

  const db = admin.firestore();
  const matchPath = 'match-fixtures';

  return db.collection('seasons').where('title', '==', 'Saison ' + seasonTitle).get().then((values: FirebaseFirestore.QuerySnapshot) => {

    if(values.docs.length === 0){
      console.log('Saison ' + seasonTitle);
      console.log('NO SEASON FOUND - CREATE IT!!!');
    } else{
      const seasonId = values.docs[0].id;
    }

    const locationData = data.location.split(',');

    return db.collection(matchPath)
      .where('title', '==', data.title)
      .where('startDate', '==', data.startDate)
      .where('endDate', '==', data.endDate)
      .where('location', '==', locationData[0] + ' ' + locationData[1])
      .get()
      .then((values: FirebaseFirestore.QuerySnapshot) => {

        let matchData: any = {
          isImported: true,
          title: data.subject,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          location: data.location
        };

        if (values.empty) {
          matchData.id = db.collection(matchPath).doc().id;
          matchData.creation = {
            from: 'system',
            at: new Date()
          };
          return db.collection(matchPath).doc(matchData.id).set(matchData);
        }
        else {
          const doc = values.docs[0];
          return doc.ref.set(matchData, {merge: true});
        }
      })
      .catch((error: any) => console.error(error));

  });
  */
});
