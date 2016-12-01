/**
 * Created by X on 2016/11/1.
 */
import { Template } from 'meteor/templating';
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';


Template.Study_Section_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
  this.dropdownValue = new ReactiveVar()
  this.dropdownValue.set('current');
  // Example API Calls
  // Meteor.call('updateUser','firstName', 'Xyman');
  // Meteor.call('updateUser','lastName', 'Hman');
  // Meteor.call('updateUser','avatar', 'http://semantic-ui.com/images/avatar2/large/kristy.png');
  // Meteor.call('updateUser','senseiPts', 2);
  // Meteor.call('updateUser','grassPts', 10);
  // Meteor.call('updateUser','grassSubjects', 'ICS314');
  // Meteor.call('updateUser','senseiSubjects', 'ICS211');

});

Template.Study_Section_Page.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  sectionsList() {
    // let currentTime = new Date();
    //
    // for (let section of Sections.find().fetch()) {
    //   let startTime = new Date(section.startTime);
    //   console.log(startTime);
    //   let endTime = new Date(section.endTime);
    //   console.log(endTime);
    //   if (endTime.getTime() < currentTime.getTime() && startTime.getTime() < currentTime.getTime()){
    //     // console.log('Removing a section');
    //     // Sections.remove(section._id);
    //   }
    // }
    console.log(Meteor.users.find().fetch());
    console.log(Sections.find().fetch());
    // console.log(Template.instance().dropdownValue.get());
    if (Template.instance().dropdownValue.get() === 'comingUp'){
      return Sections.find({ startTime: { $gte: new Date()}});
    }else{
      return Sections.find({endTime: { $gte: new Date() }, startTime: { $lte: new Date()}});
    }

  },
  currentInSec(id) {
    return Meteor.user().currentInSection === id;
  },

});


Template.Study_Section_Page.onRendered(function enableDropDown() {
  $('.ui.dropdown').dropdown();
});

Template.Study_Section_Page.events({
  'change .ui.dropdown'(event,instance) {
    Template.instance().dropdownValue.set(event.target.value);
    // console.log(event.target.value);
  },
  'click .joinBt'(event,instance){
    console.log(typeof(event.target.name));
    const oldSec = Meteor.user().currentInSection;
    Meteor.call('updateUser','currentInSection', event.target.name);
    Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName);
  }
});
