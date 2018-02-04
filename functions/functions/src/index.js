"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);
// Created new entry in dfb-export or in drive-export
const member = require("./member");
// export const newDriveMember = member.newDriveMember;
exports.updateDriveMember = member.updateDriveMember;
// export const newUserCreated = user.newUserCreated;
//# sourceMappingURL=index.js.map