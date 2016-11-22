/**
 * Created by X on 2016/11/1.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const UserData = new Mongo.Collection('UserData');

/**
 * Create the schema for Stuff
 */
export const UserDataSchema = new SimpleSchema({
  firstName: {
    label: 'FirstName',
    type: String,
    optional: false,
    max: 200,
  },
  lastName: {
    label: 'LastName',
    type: String,
    optional: false,
  },
  email: {
    label: 'Email',
    type: String,
    optional: false,
  },
  sessionsAttended: {
    label: 'SessionsAttended',
    type: Number,
    optional: false,
  },
  sessionsCreated: {
    label: 'SessionsCreated',
    type: Number,
    optional: false,
  },
  sessionsAttendedThisMonth: {
    label: 'SessionsAttendedThisMonth',
        type: Number,
        optional: false,
  },
  sessionsCreatedThisMonth: {
    label: 'SessionsCreatedThisMonth',
        type: Number,
    optional: false,
  },
  grasshopperSubjects: {
    label: 'grasshopperSubjects',
    type: [String],
    optional: false,
    max: 200,
  },
  senseiSubjects: {
    label: 'senseiSubjects',
        type: [String],
        optional: false,
        max: 200,
  }
});

UserData.attachSchema(UserDataSchema);
