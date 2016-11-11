import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isClient) {
  Meteor.subscribe("userData");
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}

