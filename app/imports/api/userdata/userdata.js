/**
 * Created by X on 2016/11/11.
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
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
    defaultValue: '',
    optional: true,
    max: 200,
  },
  likedSection: {
    label: 'likedSection',
    type: [String],
    defaultValue: [],
    minCount: 0,
    max: 200,
  },
  description: {
    label: 'description',
    type: String,
    optional: true,
    max: 200,
  },
});

UserData.attachSchema(UserDataSchema);

Meteor.methods({
  'updateUser'(userId, field, value){
    check(field, String);

    if (! this.userId){
      throw new Meteor.Error('not-authorized');
    }
    if (field === 'firstName') {
      check(value, String);
      UserData.update(userId, { $set: { firstName: value } });
    } else if (field === 'lastName') {
      check(value, String);
      UserData.update(userId, { $set: { lastName: value } });
    } else if (field === 'avatar'){
      check(value, String);
      UserData.update(userId, { $set: { avatar: value } });
    } else if (field === 'senseiPts'){
      check(value, Number);
      UserData.update(userId, { $inc: { senseiPts: value } });
    } else if (field === 'grassPts') {
      check(value, Number);
      UserData.update(userId, { $inc: { grassPts: value } });
    } else if (field === 'grassSubjects') {
      check(value, String);
      if (_.indexOf(UserData.findOne({_id:userId}).grasshopperSubjects, value) == -1 && value != ''){
        UserData.update(userId, { $push: { grasshopperSubjects: value } });
        return true;
      }
      else {
        return false;
      }
    } else if (field === 'removeGrassSubjects') {
      check(value, String);
      UserData.update(userId, { $pull: { grasshopperSubjects: value } });
    } else if (field === 'senseiSubjects') {
      check(value, String);
      if (_.indexOf( UserData.findOne({_id:userId}).senseiSubjects,value) == -1 && value != ''){
        UserData.update(userId, { $push: { senseiSubjects: value } });
        return true;
      }
      else {
        return false;
      }

    } else if (field === 'removeSenseiSubjects') {
      check(value, String);
      UserData.update(userId, { $pull: { senseiSubjects: value } });
    } else if (field === 'currentInSection') {
      UserData.update(userId, { $set: { currentInSection: value } });
    } else if (field === 'likedSection') {
      UserData.update(userId, { $push: { likedSection: value } });
    } else if (field === 'unlikedSection') {
      UserData.update(userId, { $pull: { likedSection: value } });
    } else {
      throw new Meteor.Error('Invalid Field');
    }
  },
})