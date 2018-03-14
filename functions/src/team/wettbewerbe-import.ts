import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cheerio from 'cheerio';
import * as request from 'request';

export const wettbewerbeCron = functions.pubsub.topic('quarter-hour-tick').onPublish(() => {

  return admin.firestore().collection('teams')
    .get()
    .then((values) => {

      values.forEach(function (doc) {
        const teamData = doc.data();

        if (teamData.externalTeamLink) {
          return request(teamData.externalTeamLink, (err: any, response: any, body: any) => {
            console.log('error ' + err);
            console.log('response' + response);
            console.log('body' + body);

            const $ = cheerio.load(body);

            var page_title = $('#title').text();
            console.log(page_title);

            return true;
            /*console.log(moment().toISOString());
            console.log($('body').html());
            $('div').each(function (i, element) {
              console.log($(this).text());
            });*/
          });
        }

      });

    }).catch((error: any) => console.error(error));
});
