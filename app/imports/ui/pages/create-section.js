/**
 * Created by X on 2016/11/2.
 */
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Sections, SectionsSchema } from '../../api/sections/sections.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';



Template.Create_Section_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SectionsSchema.namedContext('Create_Section_Page');
});

Template.Create_Section_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_Section_Page.onRendered(function enableRadioCheckBox() {
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

Template.Create_Section_Page.events({
  'submit .section-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const course = event.target.course.value;
    console.log(course);
    const startTime = new Date(event.target.startDate.value + ' ' + event.target.startTime.value);
    console.log(startTime);
    const endTime= new Date(event.target.endDate.value + ' ' + event.target.endTime.value);
    console.log(typeof(endTime));
    const currentCapacity = 1;
    const maxCapacity = event.target.people.value;
    let p = instance.$('input[name="purpose"]:checked').val();
    let purpose = '';
    if (p === 'Other'){
      purpose = event.target.otherInput.value;
    }else{
       purpose = p;
    }
    console.log(purpose);
    const roomNumber = event.target.room.value;
    const createdBy = Meteor.user().userName;
    console.log(createdBy);
    console.log(typeof(createdBy));
    const description = event.target.description.value;
    let usersIn = ["zhenfeng"];
    console.log(usersIn);
    console.log(usersIn instanceof Array);
    const newSection = { course, startTime, endTime, currentCapacity, maxCapacity, purpose, roomNumber, createdBy, description, usersIn };
    console.log(typeof(newSection));
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SectionsSchema.clean(newSection);
    // Determine validity.
    instance.context.validate(newSection);
    if (instance.context.isValid()) {
      Meteor.call('sections.insert',newSection);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Study_Section_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log("it's not valid");
    }
  },
  'click .submit'(event, instance) {
    Meteor.call('sections.countSessionsCreateded', event.target.name);
    Meteor.call('sections.countSessionsCreatedThisMonth', event.target.name);
  }
});