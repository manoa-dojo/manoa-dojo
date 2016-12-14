import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { UserData, UserDataSchema } from '../../api/userdata/userdata.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Game_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  //this.context = ContactsSchema.namedContext('Add_Contact_Page');
});

Template.Game_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  sortSessionsAttended() {
    return UserData.find({}, {sort: {sessionsAttended: -1}, limit: 10});
  },
  sortSessionsCreated() {
    return UserData.find({}, {sort: {sessionsCreated: -1}, limit: 10});
  },
  beltTypeAttended() {
    UserData.attend_belt = UserData.belt_types;
    return UserData.attend_belt;
  },
  beltTypeCreated() {
    UserData.create_belt = UserData.belt_types;
    return UserData.create_belt;
  },
  attendanceRanking() {
    if (UserData.sessionsAttended = 0) {
      return console.log('Attendance belt ranking: white');
    } else if (UserData.sessionsAttended < 3) {
      return console.log('Attendance belt ranking: yellow');
    } else if (UserData.sessionsAttended = 3 || UserData.sessionsAttended < 5) {
      return console.log('Attendance belt ranking: orange');
    } else if (UserData.sessionsAttended = 5 || UserData.sessionsAttended < 10) {
      return console.log('Attendance belt ranking: green');
    } else if (UserData.sessionsAttended = 10 || UserData.sessionsAttended < 15) {
      return console.log('Attendance belt ranking: blue');
    } else if (UserData.sessionsAttended = 15 || UserData.sessionsAttended < 20) {
      return console.log('Attendance belt ranking: purple');
    } else if (UserData.sessionsAttended = 20 || UserData.sessionsAttended < 25) {
      return console.log('Attendance belt ranking: brown');
    } else if (UserData.sessionsAttended = 25 || UserData.sessionsAttended < 30) {
      return console.log('Attendance belt ranking: red');
    } else if (UserData.sessionsAttended >= 30) {
      return console.log('Attendance belt ranking: black')
    }
  },
  createdRanking() {
    if (UserData.sessionsCreated == 0) {
      return console.log('Created belt ranking: white');
    } else if (UserData.sessionsCreated < 3) {
      return console.log('Created belt ranking: yellow');
    } else if (UserData.sessionsCreated = 3 || UserData.sessionsCreated < 5) {
      return console.log('Created belt ranking: orange');
    } else if (UserData.sessionsCreated = 5 || UserData.sessionsCreated < 10) {
      return console.log('Created belt ranking: green');
    } else if (UserData.sessionsCreated = 10 || UserData.sessionsCreated < 15) {
      return console.log('Created belt ranking: blue');
    } else if (UserData.sessionsCreated = 15 || UserData.sessionsCreated < 20) {
      return console.log('Created belt ranking: purple');
    } else if (UserData.sessionsCreated = 20 || UserData.sessionsCreated < 25) {
      return console.log('Created belt ranking: brown');
    } else if (UserData.sessionsCreated = 25 || UserData.sessionsCreated < 30) {
      return console.log('Created belt ranking: red');
    } else if (UserData.sessionsCreated >= 30) {
      return console.log('Created belt ranking: black')
    }
  },
});

// Template.Add_Contact_Page.onRendered(function enableSemantic() {
//   const instance = this;
//   instance.$('select.ui.dropdown').dropdown();
//   instance.$('.ui.selection.dropdown').dropdown();
//   instance.$('select.dropdown').dropdown();
//   instance.$('.ui.checkbox').checkbox();
//   instance.$('.ui.radio.checkbox').checkbox();
// });

Template.Game_Page.events({
  'click .created'(event, instance) {
    event.preventDefault();
    $("a.attended").removeClass("active");
    $("a.created").addClass("active");
    $("a.belts").removeClass("active");
    $("div.summary").removeClass("hide");
    $("div.details").addClass("hide");
    $("div.info").addClass("hide");
  },
  'click .attended'(event, instance) {
    event.preventDefault();
    $("a.created").removeClass("active");
    $("a.attended").addClass("active");
    $("a.belts").removeClass("active");
    $("div.details").removeClass("hide");
    $("div.summary").addClass("hide");
    $("div.info").addClass("hide");
  },
  'click .belts'(event, instance) {
    event.preventDefault();
    $("a.belts").addClass("active");
    $("a.attended").removeClass("active");
    $("a.created").removeClass("active");
    $("div.details").addClass("hide");
    $("div.summary").addClass("hide");
    $("div.info").removeClass("hide");
  }
});