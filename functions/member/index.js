'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
exports.updateDriveMember = functions.database.ref('/drivemembers/{userId}').onUpdate((event) => {
    const data = event.data.val();
    const db = admin.firestore();
    const memberPath = 'members';
    if (!data.firstName || data.lastName || !data.birthday || data.birthday === '')
        return false;
    const dmy = data.birthday.split('.');
    const birthDate = dmy[2] + '-' + dmy[1] + '-' + dmy[0];
    console.log(data.firstName);
    console.log(data.lastName);
    console.log(birthDate);
    return db.collection(memberPath)
        .where('mainData.firstName', '==', data.firstName)
        .where('mainData.lastName', '==', data.lastName)
        .where('mainData.birthday', '==', birthDate)
        .get()
        .then((doc) => {
        const cj = data.clubJoined.split('.');
        const clubJoined = cj.length === 3 ? cj[2] + '-' + (cj[1] - 1) + '-' + cj[0] : '';
        const cl = data.clubLeft.split('.');
        const clubLeft = cl.length === 3 ? cl[2] + '-' + (cl[1] - 1) + '-' + cl[0] : '';
        const aj = data.ahJoined.split('.');
        const ahJoined = aj.length === 3 ? aj[2] + '-' + (aj[1] - 1) + '-' + aj[0] : '';
        const al = data.ahLeft.split('.');
        const ahLeft = al.length === 3 ? al[2] + '-' + (al[1] - 1) + '-' + al[0] : '';
        let memberData = {
            isImported: true,
            mainData: {
                title: data.title,
                gender: data.salutation === 'Herr' ? 'male' : 'female',
                firstName: data.firstName,
                lastName: data.lastName,
                birthday: birthDate
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
            interview: {},
            creation: {
                from: 'system',
                at: new Date()
            },
            comment: data.comment
        };
        if (!doc.exists) {
            console.log('creating new User');
            return db.collection(memberPath).add(memberData);
        }
        else {
            console.log('updating User' + doc.id());
            // console.log(doc.id());
            return doc.set(memberData, { merge: true });
        }
    })
        .catch((error) => console.log(error));
});
//# sourceMappingURL=index.js.map