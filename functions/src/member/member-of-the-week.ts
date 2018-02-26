import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

export const memberOfTheWeekCron = functions.pubsub.topic('minutly-tick').onPublish((event: any) => {

  return admin.firestore().collection('members').get()
    .then((values) => {
      let memberList: any = [];

      values.forEach(function (doc) {
        const memberData = doc.data();
        // if ('profileImageUrl' in memberData && memberData.profileImageUrl !== '') {
          memberList.push(memberData);
        // }
      });

      return memberList;

    }).then((memberList) => {

      let msg: any = '';

      if(memberList.length > 0 ) {
        const sample = memberList[Math.floor(Math.random() * memberList.length)];

        msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglied der Woche für den ' + moment().format("LL") + ' bis '  + moment().add(6, 'days').format("LL"),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            memberList: sample,
            weekString: moment().week(),
            dateString: moment().format("LL") + ' bis '  + moment().add(6, 'days').format("LL")
          }
        };
      } else {
        msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglied der Woche für den ' + moment().format("LL") + ' bis '  + moment().add(6, 'days').format("LL"),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            memberList: 'Keine Mitglieder mit Foto gefunden',
            weekString: moment().week(),
            dateString: moment().format("LL") + ' bis '  + moment().add(6, 'days').format("LL")
          }
        };

        return false;
      }

      return sgMail.send(msg);
      /*
      */
    });

});
