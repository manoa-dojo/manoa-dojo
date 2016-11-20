import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
  'click .menuItemA'(event, instance) {
    event.preventDefault();
    $("a.menuItemB").removeClass("active");
    $("a.menuItemA").addClass("active");
    $("div.summary").removeClass("hide");
    $("div.details").addClass("hide");
  },
  'click .menuItemB'(event, instance) {
    event.preventDefault();
    $("a.menuItemA").removeClass("active");
    $("a.menuItemB").addClass("active");
    $("div.details").removeClass("hide");
    $("div.summary").addClass("hide");
  },
});