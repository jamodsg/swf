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
    .then((values: any) => {
      let teamList: any = [];

      values.forEach(function (doc: any) {
        const teamData = doc.data();
        // if ('profileImageUrl' in teamData && teamData.profileImageUrl !== '') {
        teamList.push(teamData);
        // }
      });

      return teamList;

    }).then((teamList: any) => {

      let msg: any = '';

      const now = moment();

      // if (teamList.length > 0) {
      const sample = teamList[Math.floor(Math.random() * teamList.length)];

      admin.firestore().collection(collectionString).doc(now.format('YY') + '-' + now.format('MM')).create({
        assignedTeamId: sample.id,
        month: now.format('YY') + '-' + now.format('MM')
      }).then(
        () => {
          msg = {
            to: ['thomas.handle@gmail.com'],
            from: 'mitglieder@sfwinterbach.com',
            subject: 'Mannschaft des Monats ' + now.month() + '.' + now.format('YYYY'),
            templateId: 'cd68a992-a76c-4b47-8dda-a7d9c68fd1b3',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              adminName: 'Thomas',
              teamName: sample.title,
              monthString: now.month()+ '.' + now.format('YYYY')
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
