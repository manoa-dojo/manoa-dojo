/**
 * Created by X on 2016/11/11.
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';

Meteor.methods({
  'updateUser'(field, value){
    check(field, String);

    if (! this.userId){
      throw new Meteor.Error('not-authorized');
    }
    if (field === 'firstName') {
      check(value, String);
      Meteor.users.update(this.userId, { $set: { firstName: value } });
    } else if (field === 'lastName') {
      check(value, String);
      Meteor.users.update(this.userId, { $set: { lastName: value } });
    } else if (field === 'avatar'){
      check(value, String);
      Meteor.users.update(this.userId, { $set: { avatar: value } });
    } else if (field === 'senseiPts'){
      check(value, Number);
      Meteor.users.update(this.userId, { $inc: { senseiPts: value } });
    } else if (field === 'grassPts') {
      check(value, Number);
      Meteor.users.update(this.userId, { $inc: { grassPts: value } });
    } else if (field === 'grassSubjects') {
      check(value, String);
      Meteor.users.update(this.userId, { $push: { grassSubjects: value } });
    } else if (field === 'senseiSubjects') {
      check(value, String);
      Meteor.users.update(this.userId, { $push: { senseiSubjects: value } });
    } else if (field === 'currentInSection') {
      check(value, String);
      Meteor.users.update(this.userId, { $set: { currentInSection: value } });
    } else {
      console.log('Invalid field');
    }
  },
})