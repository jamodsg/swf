import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const spielplanCron = functions.database.ref('/match-fixtures/{season}/{matchNumber}').onWrite((event: any) => {

  const data = event.data.val();
  const seasonTitle = event.params.season.replace('-', '/');

  if (!data) {
    return true;
  }

  const db = admin.firestore();

  const seasonPath = 'seasons';
  const teamPath = 'teams';
  const matchPath = 'match-fixtures';
  const locationPath = 'locations';
  const categoryPath = 'categories';
  const categoryTypePath = 'category-types';

  let assignedSeason: string;

  let assignedTeamCategoryType: string;
  let assignedLocationCategoryType: string;

  let assignedLocationCategory: string;
  let assignedTeamCategory: string;

  let assignedLocation: string;
  let assignedTeam: string;

  const locationData = data.location.split(',');
  const streetAndHouseNumber = locationData[3].trim();
  const streetSplit = streetAndHouseNumber.split(/(\d+)/g);
  let houseNumber: string = '';
  let street = streetAndHouseNumber.replace(streetSplit[1], '');
  if (street !== streetAndHouseNumber) {
    houseNumber += streetSplit[1];
  }

  if (street.slice(-4) === 'str.') {
    street = street.replace('str.', 'straße');
  }

  const zipAndCounty = locationData[4].trim();
  const zip = zipAndCounty.slice(0, 5);
  const county = zipAndCounty.slice(6);

  let locationCategoryTitle = '';
  if (locationData[0].trim().indexOf('Halle') > -1) locationCategoryTitle += 'Hallen';
  if (locationData[0].trim().indexOf('Hartplatz') > -1) locationCategoryTitle += 'Hartplätze';
  if (locationData[0].trim().indexOf('Rasenplatz') > -1) locationCategoryTitle += 'Rasenplätze';
  if (locationData[0].trim().indexOf('Kunstrasenplatz') > -1) locationCategoryTitle += 'Kunstrasenplätze';

  const teamCategoryTitle = data.subject.split(':')[0];

  // Description
  /*
  matchType: Kreisturnier
  homeTeamName: SG St. Wendel
  homeTeamExternalTeamLink: http://www.fussball.de/mannschaft/sg-st-wendel-fc-st-wendel-saarland/-/saison/1718/team-id/011MICEETG000000VTVG0001VTR8C1K7
  homeTeamLogo: //www.fussball.de/export.media/-/action/getLogo/format/2/id/00ES8GNBEO00001DVV0AG08LVUPGND5I
  guestTeamName: SF Winterbach
  guestTeamExternalTeamLink:  http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/011MIBO43O000000VTVG0001VTR8C1K7
  guestTeamLogo: //www.fussball.de/export.media/-/action/getLogo/format/2/id/00ES8GNBEO00001UVV0AG08LVUPGND5I
  matchLink: http://www.fussball.de/spiel/sf-winterbach-sg-st-wendel/-/spiel/0207HMLG74000000VS54898DVV6E7UIQ
  isHomeTeam: 0
  isGuestTeam: 1 */
  const description = data.description.split('---');
  const matchType = description[0];
  const homeTeam = {
    title: description[4],
    logoURL: description[3],
    externalTeamLink: description[2]
  };
  const guestTeam = {
    title: description[7],
    logoURL: description[6],
    externalTeamLink: description[5]
  };
  const matchLink = description[7];

  return db.collection(seasonPath)
    .where('title', '==', 'Saison ' + seasonTitle)
    .get()
    .then((values: FirebaseFirestore.QuerySnapshot) => {
      if (values.docs.length === 0) {
        assignedSeason = db.collection(seasonPath).doc().id;
        const season = {
          id: assignedSeason,
          isImported: true,
          description: 'Alle Informationen zur Saison ' + seasonTitle,
          creation: {
            from: 'system',
            at: new Date()
          },
          publication: {
            at: '',
            from: '',
            status: ''
          },
          title: 'Saison' + seasonTitle
        };
        db.collection(seasonPath).doc(assignedSeason).set(season);
      } else {
        assignedSeason = values.docs[0].id;
      }
      return true;
    }).then(() => {
      // Location-CategoryType
      return db.collection(categoryTypePath)
        .where('link', '==', 'location.types')
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {
          // CategoryType
          if (values.docs.length === 0) {
            assignedLocationCategoryType = db.collection(categoryTypePath).doc().id;
            const categoryType = {
              id: assignedLocationCategoryType,
              creation: {
                from: 'system',
                at: new Date()
              },
              link: 'location.types'
            };
            db.collection(categoryTypePath).doc(assignedLocationCategoryType).set(categoryType);
          } else {
            assignedLocationCategoryType = values.docs[0].id;
          }
        });
    }).then(() => {
      // Team-CategoryType
      return db.collection(categoryTypePath)
        .where('link', '==', 'team.types')
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {
          // CategoryType
          if (values.docs.length === 0) {
            assignedTeamCategoryType = db.collection(categoryTypePath).doc().id;
            const categoryType = {
              id: assignedTeamCategoryType,
              creation: {
                from: 'system',
                at: new Date()
              },
              link: 'team.types'
            };
            db.collection(categoryTypePath).doc(assignedTeamCategoryType).set(categoryType);
          } else {
            assignedTeamCategoryType = values.docs[0].id;
          }
        });
    }).then(() => {
      // Location-Category
      return db.collection(categoryPath)
        .where('title', '==', locationCategoryTitle)
        .where('assignedCategoryType', '==', assignedLocationCategoryType)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {
          if (values.docs.length === 0) {
            assignedLocationCategory = db.collection(categoryPath).doc().id;
            const category = {
              id: assignedLocationCategory,
              title: locationCategoryTitle,
              creation: {
                from: 'system',
                at: new Date()
              },
              assignedCategoryType: assignedLocationCategoryType,
              description: 'Alle erfassten ' + locationCategoryTitle + ' in der Region'
            };
            db.collection(categoryPath).doc(assignedLocationCategory).set(category);
          }
          else {
            assignedLocationCategory = values.docs[0].id;
          }
        });
    }).then(() => {
      // Team-Category
      return db.collection(categoryPath)
        .where('title', '==', teamCategoryTitle)
        .where('assignedCategoryType', '==', assignedTeamCategoryType)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {
          if (values.docs.length === 0) {
            assignedTeamCategory = db.collection(categoryPath).doc().id;
            const category = {
              id: assignedTeamCategory,
              title: teamCategoryTitle,
              creation: {
                from: 'system',
                at: new Date()
              },
              assignedCategoryType: assignedTeamCategoryType,
              description: 'Alle erfassten ' + teamCategoryTitle
            };
            db.collection(categoryPath).doc(assignedTeamCategory).set(category);
          }
          else {
            assignedTeamCategory = values.docs[0].id;
          }
        });
    }).then(() => {
      // Location
      return db.collection(locationPath)
        .where('title', '==', locationData[0] + ' ' + locationData[1])
        .where('assignedCategory', '==', assignedLocationCategory)
        .where('address.county', '==', county)
        .where('address.city', '==', locationData[1])
        .where('address.zip', '==', zip)
        .where('address.streetName', '==', street)
        .where('address.houseNumber', '==', houseNumber)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          if (values.docs.length === 0 /*values.empty*/) {
            assignedLocation = db.collection(locationPath).doc().id;
            const location = {
              id: assignedLocation,
              isImported: true,
              title: locationData[0] + ' ' + locationData[1],
              assignedCategory: assignedLocationCategory,
              address: {
                city: locationData[1],
                zip: zip,
                streetName: street,
                houseNumber: houseNumber,
                county: county
              },
              creation: {
                from: 'system',
                at: new Date()
              },
            };
            db.collection(locationPath).doc(assignedLocation).set(location);
          }
          else {
            assignedLocation = values.docs[0].id;
          }
        });
    }).then(() => {
      // Team
      return true;
    }).then(() => {
      // Match
      return db.collection(matchPath)
        .where('title', '==', data.title)
        .where('startDate', '==', data.startDate)
        .where('endDate', '==', data.endDate)
        .where('location', '==', assignedLocation)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let matchData: any = {
            isImported: true,
            isHomeTeam: true,
            assignedSeason: assignedSeason,
            assignedTeam: assignedTeam,
            homeTeam: homeTeam,
            guestTeam: guestTeam,
            matchLink: matchLink,
            matchType: matchType,
            startDate: data.startDate,
            endDate: data.endDate,
            location: assignedLocation,
            result: {
              otherEvent: '',
              homeTeamGoals: '',
              guestTeamGoals: ''
            }
          };

          console.log(matchData);

          /*if (values.docs.length === 0) {
            matchData.id = db.collection(matchPath).doc().id;
            matchData.creation = {
              from: 'system',
              at: new Date()
            };
            return db.collection(matchPath).doc(matchData.id).set(matchData);
          }
          else {
            return values.docs[0].ref.set(matchData, {merge: true});
          } */
          return true;
        });

    }).catch((error: any) => console.error(error));

});
