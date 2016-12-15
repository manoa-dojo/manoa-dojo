import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { UserData } from '../../api/userdata/userdata.js';
import { Meteor } from 'meteor/meteor';
//import { subjects } from '../../api/subjects/subjects.js';

/* eslint-disable no-param-reassign */

const subjects = [
  "ICS 111",
  "ICS 141",
  "ICS 211",
  "ICS 212"
];
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
  userExists() {
    return UserData.findOne({userName: FlowRouter.getParam('_id')}) != undefined;
  },
  isSet(field) {
      return (field != "First Name" && field != ""  && field != "NULL_DESCRIPTION");
  },
  myProfile(){
    return Meteor.user().userName == FlowRouter.getParam('_id');
  },
  subjectList(){
    return subjects;
  },
  beltTypeCreated(){
    var profile = UserData.findOne({userName: FlowRouter.getParam('_id')});
    var i = 0;
    // console.log(profile.belt_ranks);
    while(profile.sessionsCreated >= profile.belt_ranks[i] && i < 9){
      i++;
    }
    // console.log(profile.belt_ranks[0]);
    profile.create_belt = profile.belt_types[i-1];
    // console.log(profile.belt_types[i-1]);
    return profile.belt_types[i-1];
  },
  beltTypeAttended(){
    var profile = UserData.findOne({userName: FlowRouter.getParam('_id')});
    var i = 0;
    // console.log(profile.belt_ranks);
    while(profile.sessionsAttended >= profile.belt_ranks[i] && i < 9){
      i++;
    }
    // console.log(profile.belt_ranks[0]);
    profile.attend_belt = profile.belt_types[i-1];
    // console.log(profile.belt_types[i-1]);
    return profile.belt_types[i-1];
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
  'click .dropdown icon grass'(event, instance) {
    event.preventDefault();
    $('#search-select1')
        .dropdown()
    ;
  },
  'click .dropdown icon sensei'(event, instance) {
    event.preventDefault();
    $('#search-select2')
        .dropdown()
    ;
  },
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
    const e = document.getElementById("search-select1");
    const subject = e.options[e.selectedIndex].text;
    // console.log(subject);
    Meteor.call('updateUser',user._id,'grassSubjects',subject);
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
    const e = document.getElementById("search-select2");
    const subject = e.options[e.selectedIndex].text;
    // console.log(subject);
    Meteor.call('updateUser',user._id,'senseiSubjects',subject);
  },
  'click .removeSenseiSubBt'(event, instance) {
    event.preventDefault();
    const user = UserData.findOne({userName: FlowRouter.getParam('_id')});
    const subject =event.target.name;
    Meteor.call('updateUser',user._id,'removeSenseiSubjects',subject);
  },
});