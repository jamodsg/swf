import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onDeleteUser = functions.firestore.document('/users/{userId}').onDelete((event: any) => {

  const userId = event.params.userId;

  return admin.auth().deleteUser(userId)
    .catch(function (error) {
      console.log("Error deleting user:", error);
    });

});
