import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase);

admin.database.enableLogging(true);

// Created new entry in dfb-export or in drive-export
import * as member from './member';
export const dfbMemberCreateOrUpdate = member.createOrUpdateDFBMember;
// export const delete_DFBMember = member.deleteDFBMember;

export const driveMemberCreateOrUpdate = member.createOrUpdateDriveMember;
// export const deleteDrive_Member = member.deleteDriveMember;

// Create User => send E-Mail to Admin
import * as user from './user';
// export const newUserCreated = user.newUserCreated;      // Mail an Admin + Main an neuen Benutzer
export const onUserPropertyChanged = user.onUserPropertyChanged;
