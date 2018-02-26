import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

export const memberOfTheWeekCron = functions.pubsub.topic('weekly-tick').onPublish((event: any) => {

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

      const now = moment();

      if (memberList.length > 0) {
        const sample = memberList[Math.floor(Math.random() * memberList.length)];

        const id = admin.firestore().collection('member-of-the-week').doc().id;

        admin.firestore().collection('member-of-the-week').doc(id).create({
          assignedMemberId: sample.id,
          week: now.week() + '-' + now.format('YY')
        }).then(
          () => {
            msg = {
              to: ['thomas.handle@gmail.com'],
              from: 'mitglieder@sfwinterbach.com',
              subject: 'Mitglied der Woche für den ' + now.format('LL') + ' bis ' + now.add(6, 'days').format('LL'),
              templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                adminName: 'Thomas',
                memberList: sample,
                weekString: now.week(),
                dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
              }
            };
          }
        );

      } else {
        msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglied der Woche für den ' + now.format('LL') + ' bis ' + now.add(6, 'days').format('LL'),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            memberList: 'Keine Mitglieder mit Foto gefunden',
            weekString: now.week(),
            dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
          }
        };
      }
      return sgMail.send(msg);
    });

});
