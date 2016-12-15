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
  }
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