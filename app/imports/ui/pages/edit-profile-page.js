import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { UserData, UserDataSchema } from '../../api/sections/userdata.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';



Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = UserDataSchema.namedContext('Edit_Profile_Page');
});

Template.Edit_Profile_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Edit_Profile_Page.onRendered(function enableRadioCheckBox() {
  this.$('.ui.radio.checkbox').checkbox();
});
// Template.Add_Contact_Page.onRendered(function enableSemantic() {
//   const instance = this;
//   instance.$('select.ui.dropdown').dropdown();
//   instance.$('.ui.selection.dropdown').dropdown();
//   instance.$('select.dropdown').dropdown();
//   instance.$('.ui.checkbox').checkbox();
//   instance.$('.ui.radio.checkbox').checkbox();
// });

Template.Edit_Profile_Page.events({
  'submit .edit-profile-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = "smau4";
    console.log(typeof(username));
    const firstName = event.target.firstName.value;
    console.log(typeof(firstName));
    console.log(firstName);
    const lastName = event.target.lastName.value;
    console.log(lastName);
    const telephone = event.target.telephone.value;
    console.log(telephone);
    const subjects = ["ICS 111", "ICS 141", "ICS 211", "ICS 212"];
    let grasshopper = [];
    let sensei = [];
    let interest = [];
    interest.push(instance.$('input[name="ICS111"]:checked').val());
    interest.push(instance.$('input[name="ICS141"]:checked').val());
    interest.push(instance.$('input[name="ICS211"]:checked').val());
    interest.push(instance.$('input[name="ICS212"]:checked').val());
    for(var i = 0; i < subjects.length; i++)
    {
      if(interest[i] == "grasshopper")
      {
        grasshopper.push(subjects[i]);
      }
      else if(interest[i] == "sensei")
      {
        sensei.push(subjects[i]);
      }
    }
    console.log(grasshopper);
    console.log(sensei);
    console.log(Meteor.userId());
    console.log(Meteor.user().userName);
    var user = JSON.stringify(Meteor.user());
    alert(user);
    console.log(typeof(alert(user)));
    console.log(UserData.find({userName: Meteor.user().userName}));
    const updatedProfile = {userId: Meteor.userId(), userName: Meteor.user().userName, firstName: firstName, lastName : lastName, telephone : telephone, sessionsAttended: 0, sessionsCreated: 0, sessionsAttendedThisMonth: 0, sessionsCreatedThisMonth: 0, grasshopperSubjects: grasshopper, SenseiSubjects: sensei };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    UserDataSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log("it's not valid");
    }
  },
});
