import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

function calculateAge(birthday: string) {
  const dateOfBirth = new Date(birthday);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const birthdayCronJob = functions.pubsub.topic('quarter-hour-tick').onPublish((event: any) => {

  let birthdayList = '<ul>';

  const dateObj = new Date();
  const today = moment().format("MM-DD");

  return admin.firestore().collection('members').get()
    .then((value) => {
      value.forEach(function (doc) {
        const memberData = doc.data();
        if (moment(memberData.mainData.birthday).format("MM-DD") === today) {
          birthdayList += '<li>' + memberData.mainData.firstName + ' ' + memberData.mainData.lastName + ' wird heute ' + calculateAge(memberData.mainData.birthday) + ' Jahre</li>';
        }
      });
      birthdayList += '</ul>';
      return birthdayList;
    }).then((birthdayList) => {

      // if no there are no birthdays today
      if(birthdayList === '<ul></ul>'){
        return true;
      }

      const welcomeMsg = {
        to: 'thomas.handle@gmail.com, mail@r-klein.com, ronnyhassel@gmail.com',
        from: 'Geburtstage@sfwinterbach.com',
        subject: 'Geburtstage vom ' + moment().format("LL"),
        templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          adminName: '',
          birthdayList: birthdayList,
          dateString: moment().format("LL")
        }
      };

      return sgMail.send(welcomeMsg);
    });

});
