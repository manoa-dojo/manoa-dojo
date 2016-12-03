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
    optional: true,
    max: 200,
  },
  userName: {
    label: 'userName',
    type: String,
    max: 200,
  },
  firstName: {
    label: 'firstName',
    defaultValue: '',
    type: String,
    max: 200,
  },
  lastName: {
    label: 'lastName',
    defaultValue: '',
    type: String,
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
    defaultValue: '',
    type: String,
  },
  sessionsAttended: {
    label: 'sessionsAttended',
    defaultValue: 0,
    type: Number,
  },
  sessionsCreated: {
    label: 'sessionsCreated',
    defaultValue: 0,
    type: Number,
  },
  sessionsAttendedThisMonth: {
    label: 'sessionsAttendedThisMonth',
    defaultValue: 0,
    type: Number,
  },
  sessionsCreatedThisMonth: {
    label: 'sessionsCreatedThisMonth',
    defaultValue: 0,
    type: Number,
  },
  grasshopperSubjects: {
    label: 'grasshopperSubjects',
    type: [String],
    defaultValue: [],
    minCount: 0,
    max: 200,
  },
  senseiSubjects: {
    label: 'senseiSubjects',
    type: [String],
    defaultValue: [],
    minCount: 0,
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