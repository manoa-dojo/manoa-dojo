/**
 * Created by Smau2 on 11/28/2016.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/userdata/userdata.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Sections } from '../../api/sections/sections.js';

Template.User_Home_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
});

Template.User_Home_Page.helpers({
  userDataList() {
    return UserData.find();
  },
  sectionsLikedList() {
    const user = UserData.findOne({userName: Meteor.user().userName});
    const likedSection = user.likedSection;
    return Sections.find({_id : {$in: likedSection}});
  },
  sectionsMakedList() {
    // console.log(Sections.find({},{createdBy:{user: Meteor.user().userName}}));
    return Sections.find({},{'createdBy.user':Meteor.user().userName});
  },
  currentInSec(id) {
    const user = UserData.findOne({userName: Meteor.user().userName});
    return user.currentInSection === id;
  },
  futureSec(secId){
    return Sections.findOne({_id: secId}).startTime > new Date();
  },
  liked(secId) {
    const user = UserData.findOne({userName: Meteor.user().userName});
    const likedSection = user.likedSection;
    // console.log($.inArray(secId, likedSection));
    return $.inArray(secId, likedSection) != -1;
  },
});

Template.User_Home_Page.events({
  'click .removeBt'(event,instance){
    if (confirm('Do you really want to cancel this section?')) {
      event.preventDefault();
      const usersArray = Sections.findOne({_id: event.target.name}).usersIn;
      // console.log(usersArray);
      if (usersArray){
        for (let usersObject of usersArray){
          // console.log(usersObject);
          const user = UserData.findOne({userName: usersObject.user});
          Meteor.call('updateUser',user._id, 'currentInSection', '');
        }
      }
      Meteor.call('messages.delete',event.target.name);
      Meteor.call('sections.remove',event.target.name);
      // Meteor.call('updateUser',user._id, 'currentInSection', '');
    }
    return false;
  },
  'click .joinBt'(event,instance){
    event.preventDefault();
    const user = UserData.findOne({userName: Meteor.user().userName});
    const oldSec = user.currentInSection;
    const newSec = Sections.findOne({_id:event.target.name});
    if (newSec.currentCapacity >= newSec.maxCapacity){
      $('.ui.roomfull.modal').modal('show');
      // throw new Meteor.Error('Room Full');

    }else {
      if (oldSec) {
        if (confirm(`You are currently already in a study section. Do you wish to leave and join ${newSec.course} section?`)) {
          if (newSec.createdBy.user == Meteor.user().userName) {
            Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
            Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, newSec.createdBy.role);
            FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
          } else {
            $('.small.modal').modal({
              onDeny: function () {
                Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
                Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, 'Grasshopper');
                $('.small.modal').modal('hide');
                FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
              },
              onApprove: function () {
                Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
                Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, 'Sensei');
                $('.small.modal').modal('hide');
                FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
              }
            }).modal('show');
          }
        }
      } else {
        if (newSec.createdBy.user == Meteor.user().userName) {
          Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
          Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, newSec.createdBy.role);
          FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
        } else {
          $('.small.modal').modal({
            onDeny: function () {
              Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
              Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, 'Grasshopper');
              $('.small.modal').modal('hide');
              FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
            },
            onApprove: function () {
              Meteor.call('updateUser', user._id, 'currentInSection', event.target.name);
              Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName, 'Sensei');
              $('.small.modal').modal('hide');
              FlowRouter.go('Joined_Section_Page', { _id: event.target.name });
            }
          }).modal('show');
        }
      }
    }
  },
  'click .likeBt'(event,instance){
    const user = UserData.findOne({userName: Meteor.user().userName});
    event.preventDefault();
    Meteor.call('sections.liked',event.target.name);
    Meteor.call('updateUser',user._id, 'likedSection',event.target.name);
  },
  'click .unlikeBt'(event,instance){
    const user = UserData.findOne({userName: Meteor.user().userName});
    event.preventDefault();
    Meteor.call('sections.unliked',event.target.name);
    Meteor.call('updateUser',user._id, 'unlikedSection',event.target.name);
  }
});