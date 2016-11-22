/**
 * Created by Smau2 on 11/10/2016.
 */

/**
 * Created by X on 2016/11/2.
 */
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Sections, SectionsSchema } from '../../api/sections/userdata.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';



Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SectionsSchema.namedContext('Edit_Profile_Page');
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
  'submit .section-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;

    // let p = instance.$('input[name="purpose"]:checked').val();
    // let purpose = '';
    // if (p === 'Other'){
    //   purpose = event.target.otherInput.value;
    // }else{
    //   purpose = p;
    // }
    // console.log(purpose);
    const newSection = { course, startTime, endTime, currentCapacity, maxCapacity, purpose, createdBy, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SectionsSchema.clean(newSection);
    // Determine validity.
    instance.context.validate(newSection);
    if (instance.context.isValid()) {
      Sections.update(newSection);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Profile_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
