'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import UserRecord = admin.auth.UserRecord;

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const firestore = admin.firestore();

export const createTestUser = admin.auth().createUser({
  displayName: 'Administrator',
  email: "admin@demo.com",
  emailVerified: false,
  password: 'start01'
}).then((userRecord: UserRecord) => {
  const userData = {
    id: userRecord.uid,
    displayName: userRecord.email,
    email: userRecord.email,
    emailVerified: userRecord.emailVerified,
    providerId: 'firebase',
    assignedRoles: {
      admin: true,
      editor: false,
      subscriber: false
    }
  };
  return firestore.collection('users').doc(userRecord.uid).set(userData)
    .then(function () {
      console.log("Successfully added user");
    })
    .catch(function (error) {
      console.log("Error adding user:", error);
    });
});

export const onDeleteUser = functions.firestore.document('/users/{userId}').onDelete((event: any) => {
  const userId = event.params.userId;
  return admin.auth().deleteUser(userId)
    .then(function () {
      console.log("Successfully deleted user");
    })
    .catch(function (error) {
      console.log("Error deleting user:", error);
    });
});

/*
export const newUserCreated = functions.firestore.document('/users/{userId}').onCreate((event: any) => {

  const userId = event.params.userId;

  return firestore.collection('users').doc(userId)
    .get()
    .then((doc: any) => {

      const user = doc.data();
      const msg = {
        to: 'Thomas.handle@gmail.com',
        from: 'admin@sfwinterbach.com',
        subject: 'Neuer Benutzer',
        templateId: '758f452a-aa4d-4664-8088-5a5ce2a814ac',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          email: user.email,
          name: 'Thomas',
          siteName: 'sfwinterbach.com'
        }
      };

      return sgMail.send(msg).then(() => {
        const welcomeMsg = {
          to: user.email,
          from: 'hello@sfwinterbach.com',
          subject: 'Deine Anmeldung auf sfwinterbach.com',
          templateId: 'b686cfb1-59ad-4f92-9bfa-b5da7f8587ce',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            siteName: 'sfwinterbach.com',
            siteUrl: 'admin.sfwinterbach.com'
          }
        };

        return sgMail.send(welcomeMsg);
      });
    })
    .then(() => console.log('email sent!'))
    .catch((error: any) => console.log(error));
});

*/

export const onUserPropertyChanged = functions.database.ref("/users/{userId}").onUpdate((event) => {

  console.log(event);
  console.log(event.data);

  /* const eventStatus = event.data.val();
  const userId = event.params.userId;

  const userStatusFirestoreRef = firestore.collection('status').doc(userId);


  return event.data.ref.once('value').then(statusSnapshot => {
    const status = statusSnapshot.val();
    console.log(status, eventStatus);
    // if (status.last_changed > eventStatus.last_changed) return;

    eventStatus.last_changed = new Date(eventStatus.last_changed);
    return userStatusFirestoreRef.set(eventStatus);
  }); */
  return true;

});
