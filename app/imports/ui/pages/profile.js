import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { UserData } from '../../api/userdata/userdata.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.User_Profile_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  //this.context = ContactsSchema.namedContext('Add_Contact_Page');
});

Template.User_Profile_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  matchUser: function(userData) {
    if(typeof(userData) != "undefined")
      return userData.userName !== "undefined";
    else
      return false;
  },
  userProfile() {
    return UserData.findOne({userName: FlowRouter.getParam('_id')});
  },
  isSet(field) {
    return field != '';
  },
  myProfile(){
    return Meteor.user().userName == FlowRouter.getParam('_id');
  },
});

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('UserData');
  });
});
// Template.Add_Contact_Page.onRendered(function enableSemantic() {
//   const instance = this;
//   instance.$('select.ui.dropdown').dropdown();
//   instance.$('.ui.selection.dropdown').dropdown();
//   instance.$('select.dropdown').dropdown();
//   instance.$('.ui.checkbox').checkbox();
//   instance.$('.ui.radio.checkbox').checkbox();
// });

Template.User_Profile_Page.events({
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
  'click #addGrassSubject'(event, instance) {
    event.preventDefault();
    const user = UserData.findOne({userName: FlowRouter.getParam('_id')});
    const subject =instance.$('input[name="grassSubject"]').val();
    Meteor.call('updateUser',user._id,'grassSubjects',subject);
    instance.$('input[name="grassSubject"]').val('');
  },
  'click .removeGrassSubBt'(event, instance) {
    event.preventDefault();
    const user = UserData.findOne({userName: FlowRouter.getParam('_id')});
    const subject =event.target.name;
    Meteor.call('updateUser',user._id,'removeGrassSubjects',subject);
  },
  'click #addSenseiSubject'(event, instance) {
    event.preventDefault();
    const user = UserData.findOne({userName: FlowRouter.getParam('_id')});
    const subject =instance.$('input[name="senseiSubject"]').val();
    Meteor.call('updateUser',user._id,'senseiSubjects',subject);
    instance.$('input[name="senseiSubject"]').val('');
  },
  'click .removeSenseiSubBt'(event, instance) {
    event.preventDefault();
    const user = UserData.findOne({userName: FlowRouter.getParam('_id')});
    const subject =event.target.name;
    Meteor.call('updateUser',user._id,'removeSenseiSubjects',subject);
  },
});