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
  'submit .profile-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const firstName = event.target.firstName.value;
    console.log(firstName);
    const lastName = event.target.lastName.value;
    console.log(lastName);
    const email = event.target.email.value;
    console.log(email);
    // let p = instance.$('input[name="purpose"]:checked').val();
    // let purpose = '';
    // if (p === 'Other'){
    //   purpose = event.target.otherInput.value;
    // }else{
    //   purpose = p;
    // }
    // console.log(purpose);
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    UserDataSchema.clean(updatedData);
    // Determine validity.
    instance.context.validate(updatedData);
    if (instance.context.isValid()) {
      //UserData.update(FlowRouter.getParam('_id'), { $inc: { grassPts: value });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
