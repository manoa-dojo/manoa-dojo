/**
 * Created by X on 2016/11/1.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { UserData } from '../../api/userdata/userdata.js';
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
    type: Object,
    optional: false,
    blackbox: true,
  },
  description: {
    label: 'Description',
    type: String,
    optional: true,
    max: 200,
  },
  usersIn: {
    label: 'usersIn',
    type: [Object],
    minCount: 0,
    optional: false,
    blackbox: true,
  },
  likes: {
    label: 'likes',
    type: Number,
    min: 0,
    optional: true,
  }
});

Sections.attachSchema(SectionsSchema);

Meteor.methods({
  'sections.insert'(newSection) {
    check(newSection, Object);
    // console.log(newSection.endTime);
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Sections.insert(newSection,function(err,result){
      if (err){
        console.log(result);
      }else{
        console.log('good ' + result);

        const user = UserData.findOne({userName: Meteor.user().userName});
        Meteor.call('updateUser',user._id, 'currentInSection', result);
        FlowRouter.go('Joined_Section_Page',{_id: result});
      }

    });

  },
  'sections.join'(newSec,oldSec, user){
    check(user,String);
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    if (oldSec !== ''){
      Sections.update(oldSec, { $pull: {usersIn: {user:user}}});
    }

    Sections.update(newSec, { $push: {usersIn: {user:user}}});
  },
  'sections.remove'(id){
    check(id,String);
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Sections.remove(id);
  },
})