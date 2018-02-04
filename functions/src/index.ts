import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase);

// admin.database.enableLogging(true);

// Created new entry in dfb-export or in drive-export
import * as member from './member';
export const updateDriveMember = member.updateDriveMember;

// Create User => send E-Mail to Admin
import * as user from './user';
// export const newUserCreated = user.newUserCreated;
