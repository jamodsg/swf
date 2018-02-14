import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase);

admin.database.enableLogging(true);

import * as user from './user';
import * as member from './member';

// export const newUserCreated = user.newUserCreated;      // Mail an Admin + Main an neuen Benutzer
// export const onUserPropertyChanged = user.onUserPropertyChanged;
// export const createTestUser = user.createTestUser;
// export const onUserDelete = user.onDeleteUser;

export const memberDFB = member.dfbMember;
// export const deleteDFBMember = member.deleteDFBMember;
