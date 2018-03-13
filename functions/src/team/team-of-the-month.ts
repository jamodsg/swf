import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

export const teamOfTheWeekCron = functions.pubsub.topic('monthly-tick').onPublish(() => {

  const collectionString = 'team-of-the-month';

  return admin.firestore().collection('teams').get()
    .then((values) => {
      let teamList: any = [];

      values.forEach(function (doc) {
        const teamData = doc.data();
        // if ('profileImageUrl' in teamData && teamData.profileImageUrl !== '') {
        teamList.push(teamData);
        // }
      });

      return teamList;

    }).then((teamList) => {

      let msg: any = '';

      const now = moment();

      // if (teamList.length > 0) {
        const sample = teamList[Math.floor(Math.random() * teamList.length)];

        const id = admin.firestore().collection(collectionString).doc().id;


        admin.firestore().collection(collectionString).doc(now.format('YY') + '-' + now.format('MM')).create({
          assignedTeamId: sample.id,
          week: now.format('YY') + '-' + now.format('MM')
        }).then(
          () => {
            msg = {
              to: ['thomas.handle@gmail.com'],
              from: 'mitglieder@sfwinterbach.com',
              subject: 'Mannschaft des Monats für den ' + now.month(),
              templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                adminName: 'Thomas',
                teamList: sample,
                monthString: now.month()
              }
            };
            return sgMail.send(msg);
          }
        );

      /* } else {
        msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mannschaft des Monats für den ' + now.month(),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            teamList: 'Keine Mannschaft mit Foto gefunden',
            monthString: now.month()
          }
        };
      } */
    });

});
