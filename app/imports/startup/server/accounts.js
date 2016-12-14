// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

// /* eslint-disable no-console */

// /* When running app for first time, pass a settings file to set up a default user account. */
// if (Meteor.users.find().count() === 0) {
//   if (!!Meteor.settings.defaultAccount) {
//     Accounts.createUser({
//       username: Meteor.settings.defaultAccount.username,
//       password: Meteor.settings.defaultAccount.password,
//     });
//   } else {
//     console.log('No default user!  Please invoke meteor with a settings file.');
//   }
// }


import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { UserData } from '../../api/userdata/userdata.js';

/* eslint-disable no-console */

Accounts.onCreateUser((options, user) => {
  if (! user.services.cas) {
    throw new Error('Expected login with UH Cas only.');
  }


  // Don't forget to return the new user object at the end!
  return user;
});

/* Validate username, sending a specific error message on failure. */
Accounts.validateNewUser(function (user) {
  if (user) {
    const username = user.services.cas.id;
    if (username && _.contains(Meteor.settings.allowed_users, username)) {
      //New custom fields added.
      const { id } = user.services.cas;
      console.log(user.services.cas);
      console.log(id.toLowerCase());
      user.userName = id;
      console.log(user.userName);

      /**
       * Initialize userData collection.
       */
      if (UserData.findOne({userName: id})){
        // User already exists.
      }else{
        console.log("Made new user!");
        const newUserData = {userName: id.toLowerCase(), firstName: '', lastName :'', avatar: '/images/random.jpg', telephone : '', sessionsAttended: 0, sessionsCreated: 0, sessionsAttendedThisMonth: 0, sessionsCreatedThisMonth: 0, grasshopperSubjects: [], senseiSubjects: [], likedSection: []};
        UserData.insert(newUserData);
        console.log(UserData.find().fetch());
        console.log("Inserted data!");
      }
      return true;
    }
  }
  throw new Meteor.Error(403, 'User not in the allowed list');
});


if (!Meteor.settings.cas) {
  console.log('CAS settings not found! Hint: "meteor --settings ../config/settings.development.json"');
}
