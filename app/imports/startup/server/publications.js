/**
 * Created by X on 2016/10/16.
 */
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish('Sections', function publishSectionsData() {
  return Sections.find();
});

/*
  Publish all the fields except the services field because it has private data about the user.
 */

Meteor.publish('userData', function publishUserData() {
  if (this.userId) {
    return Meteor.users.find({fields: {'services': false}});
  } else {
    this.ready();
  }
});