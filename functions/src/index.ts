import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// Create User => send E-Mail to Admin
import * as user from './user';
export const newUserCreated = user.newUserCreated;
