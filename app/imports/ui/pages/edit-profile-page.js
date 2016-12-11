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
    return field != '';
  },
  subjectListCol1(){
    return ["ICS 111", "ICS 141"];
  },
  subjectListCol2(){
    return ["ICS 211", "ICS 212"];
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
  $('.edit-profile-form')
      .form({
        fields: {
          name: {
            identifier: 'firstName',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your firstName'
              }
            ]
          },
          lastName: {
            identifier: 'lastName',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your lastName'
              }
            ]
          },
          telephone: {
            identifier: 'telephone',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your telephone'
              }
            ]
          }
        }
      })
  ;
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
    const description = event.target.description.value;
    console.log(description);
    // const subjects = ["ICS 111", "ICS 141", "ICS 211", "ICS 212"];
    // let grasshopper = [];
    // let sensei = [];
    // let interest = [];
    // interest.push(instance.$('input[name="' + subjects[0] + '"]:checked').val());
    // interest.push(instance.$('input[name="' + subjects[1] + '"]:checked').val());
    // interest.push(instance.$('input[name="' + subjects[2] + '"]:checked').val());
    // interest.push(instance.$('input[name="' + subjects[3] + '"]:checked').val());
    //
    // for (var i = 0; i < subjects.length; i++) {
    //   if (interest[i] == "grasshopper") {
    //     grasshopper.push(subjects[i]);
    //   }
    //   else
    //     if (interest[i] == "sensei") {
    //       sensei.push(subjects[i]);
    //     }
    // }
    // console.log(grasshopper);
    // console.log(sensei);
    // console.log(Meteor.userId());
    // console.log(Meteor.user().userName);
    var user = JSON.stringify(Meteor.user());
    // alert(user);
    const updatedProfile = {
      userId: Meteor.userId(),
      userName: Meteor.user().userName,
      firstName: firstName,
      lastName: lastName,
      avatar: oldProfile.avatar,
      telephone: telephone,
      sessionsAttended: oldProfile.sessionsAttended,
      sessionsCreated: oldProfile.sessionsCreated,
      sessionsAttendedThisMonth: 0,
      sessionsCreatedThisMonth: 0,
      grasshopperSubjects: oldProfile.grasshopperSubjects,
      senseiSubjects: oldProfile.senseiSubjects,
      currentInSection: oldProfile.currentInSection,
      likedSection: oldProfile.likedSection,
      description: description
    };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    UserDataSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      UserData.update(FlowRouter.getParam('_id'), { $set: updatedProfile });
      console.log(UserData.findOne({ userName: Meteor.user().userName }));
      FlowRouter.go('User_Profile_Page', { _id: updatedProfile.userName });
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log("it's not valid");
    }
  },
});
