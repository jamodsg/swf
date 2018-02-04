'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const moment = require("moment");
admin.database.enableLogging(true);
exports.updateDriveMember = functions.database.ref('/drivemembers/{userId}').onUpdate(event => {
    const data = event.data.val();
    const db = admin.firestore();
    const memberPath = 'members';
    return db.collection(memberPath)
        .where('mainData.firstName', '==', data.firstName)
        .where('mainData.lastName', '==', data.lastName)
        .where('mainData.birthday', '==', data.birthday)
        .get()
        .then((doc) => {
        if (!doc.exists) {
            console.log('creating new User 123');
            const enBirthday = moment(data.birthday, "YYYY-MM-DD").toString();
            const clubJoined = moment(data.clubJoined, "YYYY-MM-DD").toString();
            const clubLeft = moment(data.clubLeft, "YYYY-MM-DD").toString();
            const ahJoined = moment(data.ahJoined, "YYYY-MM-DD").toString();
            const ahLeft = moment(data.ahLeft, "YYYY-MM-DD").toString();
            const memberData = {
                isImported: true,
                mainData: {
                    title: data.title,
                    gender: data.gender === 'Herr' ? 'male' : 'female',
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthday: enBirthday
                },
                address: {
                    streetName: data.street,
                    houseNumber: data.houseNumber,
                    city: data.city,
                    zip: data.zip,
                },
                contact: {
                    email: data.email,
                    phoneHome: data.phoneHome,
                    phoneMobile: data.phoneMobile
                },
                clubData: {
                    status: data.clubStatus,
                    joined: clubJoined,
                    left: clubLeft,
                    payment: data.clubPayment
                },
                ahData: {
                    status: data.ahStatus,
                    joined: ahJoined,
                    left: ahLeft,
                    payment: data.ahPayment
                },
                dfbData: {},
                otherData: {},
                interview: [],
                creation: {
                    from: 'system',
                    at: new Date()
                },
                comment: data.comment
            };
            console.log(memberData);
            console.log('ended');
            return db.collection(memberPath).add(memberData);
        }
        else {
            console.log('update');
            console.log(doc.id());
            return doc.set(data, { merge: true });
        }
    })
        .then(() => console.log('user updated'))
        .catch((error) => console.log(error));
});
exports.newDriveMember = functions.database.ref('/drive-members/{userId}')
    .onCreate((event) => {
    console.log(event);
    const db = admin.firestore();
    const userId = db.collection('_').doc().id;
    return db.collection('members').doc(userId)
        .get()
        .then((doc) => {
        console.log(doc);
        const user = doc.data();
        console.log(user);
        return true;
    })
        .then(() => console.log('member added!'))
        .catch((error) => console.log(error));
});
//# sourceMappingURL=index.js.map