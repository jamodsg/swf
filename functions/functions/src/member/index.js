'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
exports.updateDriveMember = functions.database.ref('/drivemembers/{userId}').onWrite((event) => {
    const data = event.data.val();
    const oldValue = event.data.previous.val();
    const db = admin.firestore();
    const memberPath = 'members';
    let birthDate = '';
    if (data.birthday) {
        const dmy = data.birthday.split('.');
        birthDate = dmy[2] + '-' + dmy[1] + '-' + dmy[0];
    }
    return db.collection(memberPath)
        .where('mainData.firstName', '==', data.firstName)
        .where('mainData.lastName', '==', data.lastName)
        .where('mainData.birthday', '==', birthDate)
        .get()
        .then((docs) => {
        let clubJoined = '';
        if (data.clubJoined) {
            const cj = data.clubJoined.split('.');
            clubJoined = cj.length === 3 ? cj[2] + '-' + (cj[1] - 1) + '-' + cj[0] : '';
        }
        let clubLeft = '';
        if (data.clubLeft) {
            const cl = data.clubLeft.split('.');
            clubLeft = cl.length === 3 ? cl[2] + '-' + (cl[1] - 1) + '-' + cl[0] : '';
        }
        let ahJoined = '';
        if (data.ahJoined) {
            const aj = data.ahJoined.split('.');
            ahJoined = aj.length === 3 ? aj[2] + '-' + (aj[1] - 1) + '-' + aj[0] : '';
        }
        let ahLeft = '';
        if (data.ahLeft) {
            const al = data.ahLeft.split('.');
            ahLeft = al.length === 3 ? al[2] + '-' + (al[1] - 1) + '-' + al[0] : '';
        }
        let memberData = {
            isImported: true,
            mainData: {
                title: data.title ? data.title : '',
                gender: data.salutation === 'Herr' ? 'male' : 'female',
                firstName: data.firstName,
                lastName: data.lastName,
                birthday: birthDate
            },
            address: {
                streetName: data.street ? data.street : '',
                houseNumber: data.houseNumber ? data.houseNumber : '',
                city: data.city ? data.city : '',
                zip: data.zip ? data.zip : '',
            },
            contact: {
                email: data.email ? data.email : '',
                phoneHome: data.phoneHome ? data.phoneHome : '',
                phoneMobile: data.phoneMobile ? data.phoneMobile : ''
            },
            clubData: {
                status: data.clubStatus ? data.clubStatus : 0,
                joined: clubJoined,
                left: clubLeft,
                payment: data.clubPayment ? data.clubPayment : ''
            },
            ahData: {
                status: data.ahStatus ? data.ahStatus : 0,
                joined: ahJoined,
                left: ahLeft,
                payment: data.ahPayment ? data.ahPayment : ''
            },
            dfbData: {},
            otherData: {},
            interview: [],
            creation: {
                from: 'system',
                at: new Date()
            },
            comment: data.comment ? data.comment : ''
        };
        if (docs.empty) {
            return db.collection(memberPath).add(memberData);
        }
        else {
            const doc = docs.docs[0];
            memberData.creation = oldValue.creation;
            return doc.ref.set(memberData, { merge: true }).then(() => {
                return doc.ref;
            });
        }
    })
        .catch((error) => console.log(error));
});
//# sourceMappingURL=index.js.map