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
export const birthdayReminder = member.birthdayCronJob;


/*
export const hourlyCronJob = functions.pubsub.topic('hourly-tick').onPublish((event: any) => {
  console.log('This job is ran every hour!');
});
*/


