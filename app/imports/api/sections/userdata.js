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
  userId: {
    label: 'userId',
    type: String,
    optional: false,
    max: 200,
  },
  userName: {
    label: 'userName',
    type: String,
    optional: false,
    max: 200,
  },
  firstName: {
    label: 'firstName',
    type: String,
    optional: false,
    max: 200,
  },
  lastName: {
    label: 'lastName',
    type: String,
    optional: false,
    max: 200,
  },
  avatar: {
    label: 'avatar',
    type: String,
    optional: true,
    max: 200,
  },
  telephone: {
    label: 'telephone',
    type: String,
    optional: false,
  },
  sessionsAttended: {
    label: 'sessionsAttended',
    type: Number,
    optional: true,
  },
  sessionsCreated: {
    label: 'sessionsCreated',
    type: Number,
    optional: true,
  },
  sessionsAttendedThisMonth: {
    label: 'sessionsAttendedThisMonth',
    type: Number,
    optional: true,
  },
  sessionsCreatedThisMonth: {
    label: 'sessionsCreatedThisMonth',
    type: Number,
    optional: true,
  },
  grasshopperSubjects: {
    label: 'grasshopperSubjects',
    type: [String],
    minCount: 0,
    optional: true,
    max: 200,
  },
  senseiSubjects: {
    label: 'senseiSubjects',
    type: [String],
    minCount: 0,
    optional: true,
    max: 200,
  },
  currentInSection: {
    label: 'currentInSection',
    type: String,
    optional: true,
    max: 200,
  }
});

UserData.attachSchema(UserDataSchema);
