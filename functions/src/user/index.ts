'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

export const newUserCreated = functions.firestore.document('/users/{userId}').onCreate((event: any) => {

  const userId = event.params.userId;
  const db = admin.firestore();

  return db.collection('users').doc(userId)
    .get()
    .then((doc: any) => {

      const user = doc.data();

      const msg = {
        to: 'Thomas.handle@gmail.com',
        from: 'hello@sfwinterbach.com',
        subject: 'Neuer Benutzer',
        templateId: '758f452a-aa4d-4664-8088-5a5ce2a814ac',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          email: user.email,
          siteName: 'sfwinterbach.com'
        }
      };

      return sgMail.send(msg);
    })
    .then(() => console.log('email sent!'))
    .catch((error: any) => console.log(error));

});

