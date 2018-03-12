import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

export const memberOfTheWeekCron = functions.pubsub.topic('daily-tick').onPublish(() => {

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

          console.log(memberList);

          let clubList = memberList.filter((member: any) => {
            return member.clubData && member.clubData.status && member.clubData.status > 0 && member.clubData.status !== 2;
          });
          const clubSample = clubList[Math.floor(Math.random() * clubList.length)];
          const clubId = admin.firestore().collection('member-of-the-week').doc().id;
          console.log(clubId);
          console.log(clubSample);

          let ahList = memberList.filter((member: any) => {
            return member.ahData && member.ahData.status && member.ahData.status > 0;
          });
          const ahSample = ahList[Math.floor(Math.random() * ahList.length)];
          const ahId = admin.firestore().collection('member-of-the-week').doc().id;

          let playerList = memberList.filter((member: any) => {
            return member.dfbData;
          });
          const playerSample = playerList[Math.floor(Math.random() * playerList.length)];
          const playerId = admin.firestore().collection('member-of-the-week').doc().id;

          let honoraryList = memberList.filter((member: any) => {
            return member.clubData && member.clubData.status && member.clubData.status === 2;
          });
          const honorarySample = honoraryList[Math.floor(Math.random() * honoraryList.length)];
          const honoraryId = admin.firestore().collection('member-of-the-week').doc().id;

          const collectionString = 'member-of-the-week/' + now.format('YY') + '/' + now.week();

          admin.firestore().collection(collectionString).doc(clubId).create({
            type: 'club',
            assignedMemberId: clubSample.id,
            week: now.week() + '-' + now.format('YY')
          })
            .then(() => {
              admin.firestore().collection(collectionString).doc(ahId).create({
                type: 'ah',
                assignedMemberId: ahSample.id,
                week: now.week() + '-' + now.format('YY')
              })
            })
            .then(() => {
              admin.firestore().collection(collectionString).doc(playerId).create({
                type: 'player',
                assignedMemberId: playerSample.id,
                week: now.week() + '-' + now.format('YY')
              })
            })
            .then(() => {
              admin.firestore().collection(collectionString).doc(honoraryId).create({
                type: 'honorary',
                assignedMemberId: honorarySample.id,
                week: now.week() + '-' + now.format('YY')
              })
            })

            .then(
              () => {
                msg = {
                  to: ['thomas.handle@gmail.com', 't.handle@it-dlz.saarland.de'],
                  from: 'mitglieder@sfwinterbach.com',
                  subject: 'Mitglieder der Woche für den ' + now.format('LL') + ' bis ' + now.add(6, 'days').format('LL'),
                  templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
                  substitutionWrappers: ['{{', '}}'],
                  substitutions: {
                    adminName: 'Thomas',
                    clubMember: clubSample.id,
                    ahMember: ahSample,
                    player: playerSample,
                    honorary: honorarySample,
                    weekString: now.week(),
                    dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
                  }
                };
              }
            );

        }
        else {
          msg = {
            to: ['thomas.handle@gmail.com', 't.handle@it-dlz.saarland.de'],
            from: 'mitglieder@sfwinterbach.com',
            subject: 'Mitglieder der Woche für den ' + now.format('LL') + ' bis ' + now.add(6, 'days').format('LL'),
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

  }
);
