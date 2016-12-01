import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isClient) {
  Meteor.subscribe("UserData2");
  Meteor.subscribe("UserData");
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}

