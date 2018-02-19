import * as createdUser from './user-created';
export const userCreated = createdUser.newUserCreated;

import * as deletedUser from './user-deleted';
export const userDeleted = deletedUser.onDeleteUser;

/*
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
}); */


/*
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
  });
  return true;

});*/
