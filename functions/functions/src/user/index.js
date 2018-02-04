'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
exports.newUserCreated = functions.firestore.document('/users/{userId}').onCreate((event) => {
    const userId = event.params.userId;
    const db = admin.firestore();
    return db.collection('users').doc(userId)
        .get()
        .then((doc) => {
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
        .catch((error) => console.log(error));
});
//# sourceMappingURL=index.js.map