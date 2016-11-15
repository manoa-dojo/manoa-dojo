/**
 * Created by X on 2016/11/1.
 */
import { Template } from 'meteor/templating';
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';

Template.Study_Section_Page.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  sectionsList() {
    let currentTime = new Date();
    for (let section of Sections.find().fetch()) {
      if (section.endTime.getTime() < currentTime.getTime() && section.startTime.getTime() < currentTime.getTime()){
        // console.log('Removing a section');
        Sections.remove(section._id);
      }
    }



    console.log(Meteor.users.find().fetch());
    return Sections.find();
  },

});

Template.Study_Section_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
  // Example API Calls
  // Meteor.call('updateUser','firstName', 'Xyman');
  // Meteor.call('updateUser','lastName', 'Hman');
  // Meteor.call('updateUser','avatar', 'http://semantic-ui.com/images/avatar2/large/kristy.png');
  // Meteor.call('updateUser','senseiPts', 2);
  // Meteor.call('updateUser','grassPts', 10);
  // Meteor.call('updateUser','grassSubjects', 'ICS314');
  // Meteor.call('updateUser','senseiSubjects', 'ICS211');

});
