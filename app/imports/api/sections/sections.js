/**
 * Created by X on 2016/11/1.
 */

import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import {check} from 'meteor/check';
/* eslint-disable object-shorthand */

export const Sections = new Mongo.Collection('Sections');

/**
 * Create the schema for Stuff
 */
export const SectionsSchema = new SimpleSchema({
  course: {
    label: 'Course',
    type: String,
    optional: false,
    max: 200,
  },
  startTime: {
    label: 'StartTime',
    type: Date,
    optional: false,
  },
  endTime: {
    label: 'EndTime',
    type: Date,
    optional: false,
  },
  currentCapacity: {
    label: 'CurrentCapacity',
    type: Number,
    optional: false,
  },
  maxCapacity: {
    label: 'MaxCapacity',
    type: String,
    optional: false,
    max: 200,
  },
  purpose: {
    label: 'Purpose',
    type: String,
    optional: false,
    max: 200,
  },
  roomNumber: {
    label: 'roomNumber',
    type: String,
    optional: false,
    max: 200,
  },
  createdBy: {
    label: 'createdBy',
    type: String,
    optional: false,
    max: 200,
  },
  description: {
    label: 'Description',
    type: String,
    optional: true,
    max: 200,
  },
  usersIn: {
    label: 'usersIn',
    type: [String],
    minCount: 0,
    optional: false,
    max: 200,
  }
});

Sections.attachSchema(SectionsSchema);
console.log(new Date());
Meteor.methods({
  'sections.insert'(newSection) {
    check(newSection, Object);
    // console.log(newSection.endTime);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.insert(newSection);
  },
  'sections.join'(newSec, oldSec, user){
    check(user, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.update(oldSec, { $pull: { usersIn: user } });
    Sections.update(newSec, { $push: { usersIn: user } });
  },
  'sections.countSessionsAttended'(user) {
    check(user, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.update(user.sessionsAttended + 1);
  },
  'sections.countSessionsAttendedThisMonth'(user) {
    check(user, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.update(user.sessionsAttendedThisMonth + 1);
  },
  'sections.countSessionsCreated'(user) {
    check(user, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.update(user.sessionsCreated + 1);
  },
  'sections.countSessionsCreatedThisMonth'(user) {
    check(user, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sections.update(user.sessionsCreatedThisMonth + 1);
  },
})