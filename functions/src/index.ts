'use strict';

// add cronJobs via gcloud console:
// gcloud app deploy app.yaml cron.yaml
// https://console.cloud.google.com/logs

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

import * as user from './user';
export const newUserCreated = user.userCreated;
export const onUserDelete = user.userDeleted;


import * as member from './member';
export const birthdayReminder = member.birthdayReminderCron;
export const memberOfTheWeekCron = member.memberOfTheWeekCron;
export const dfbMemberCron = member.dfbMemberCron;
export const driveMemberCron = member.driveMemberCron;

import * as team from './team';
export const spielplanCron = team.spielplanCron;
export const teamCron = team.teamOfTheMonthCron;
