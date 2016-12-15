import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { UserData, UserDataSchema } from '../../api/userdata/userdata.js';

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
  userProfile(fieldName) {
    const profile = UserData.findOne({ userName: Meteor.user().userName });
    return profile && profile[fieldName];
  },
  isSet(field) {
    return (field != "First Name" && field != "Last Name" && field != "Telephone" && field != "");
  },
  //Checks if subject is at grasshopper(g), sensei(s), or not interested(n)
  checkSubject(subject, level) {
    const profile = UserData.findOne({ userName: Meteor.user().userName });
    if (level == "g") {
      for (var i = 0; i < profile.grasshopperSubjects.length; i++) {
        if(profile.grasshopperSubjects[i] == subject)
          return true;
      }
      return false;
    }
    if (level == "s") {
      for (var i = 0; i < profile.senseiSubjects.length; i++) {
        if(profile.senseiSubjects[i] == subject)
          return true;
      }
      return false;
    }
    if (level == "n") {
      for (var i = 0; i < profile.senseiSubjects.length; i++) {
        if(profile.senseiSubjects[i] == subject)
          return false;
      }
      for (i = 0; i < profile.grasshopperSubjects.length; i++) {
        if(profile.grasshopperSubjects[i] == subject)
          return false;
      }
      return true;
    }
    return true;
  }
});

Template.Edit_Profile_Page.onRendered(function enableRadioCheckBox() {
  this.$('.ui.radio.checkbox').checkbox();
});
Template.Edit_Profile_Page.onRendered(function enableSemantic() {
  // $('.edit-profile-form')
  //     .form({
  //       fields: {
  //         firstName: {
  //           identifier: 'firstName',
  //           rules: [
  //             {
  //               type   : 'empty',
  //               prompt : 'Please enter your firstName'
  //             }
  //           ]
  //         },
  //         lastName: {
  //           identifier: 'lastName',
  //           rules: [
  //             {
  //               type   : 'empty',
  //               prompt : 'Please enter your lastName'
  //             }
  //           ]
  //         },
  //         telephone: {
  //           identifier: 'telephone',
  //           rules: [
  //             {
  //               type   : 'empty',
  //               prompt : 'Please enter your telephone'
  //             }
  //           ]
  //         }
  //       }
  //     })
  // ;
});

Template.Edit_Profile_Page.events({
  'submit .edit-profile-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)

    const oldProfile = UserData.findOne({ userName: Meteor.user().userName });
    const username = Meteor.user().userName;
    console.log(typeof(username));
    const firstName = event.target.firstName.value;
    console.log(typeof(firstName));
    console.log(firstName);
    const lastName = event.target.lastName.value;
    console.log(lastName);
    const telephone = event.target.telephone.value;
    console.log(telephone);
    var description = event.target.description.value;
    var avatar = event.target.avatar.value;
    //var user = JSON.stringify(Meteor.user());
    // alert(user);
    if(!avatar){
      avatar = "/images/random.jpg";
    }
    var updatedProfile = {
      userId: Meteor.userId(),
      userName: Meteor.user().userName,
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      telephone: telephone,
      sessionsAttended: oldProfile.sessionsAttended,
      sessionsCreated: oldProfile.sessionsCreated,
      sessionsAttendedThisMonth: 0,
      sessionsCreatedThisMonth: 0,
      grasshopperSubjects: oldProfile.grasshopperSubjects,
      senseiSubjects: oldProfile.senseiSubjects,
      currentInSection: oldProfile.currentInSection,
      likedSection: oldProfile.likedSection,
      description: description,
      attend_belt: oldProfile.attend_belt,
      create_belt: oldProfile.create_belt,
      belt_ranks: oldProfile.belt_ranks,
      belt_types: oldProfile.belt_types
    };

    if(!description){
      updatedProfile.description = '';
      delete updatedProfile.description;
      console.log(updatedProfile);
    }
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    UserDataSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      UserData.update(FlowRouter.getParam('_id'), { $set: updatedProfile });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page', { _id: updatedProfile.userName });
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log("it's not valid");
    }
  },
});
