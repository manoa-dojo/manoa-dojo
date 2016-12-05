/**
 * Created by X on 2016/11/1.
 */
import { Template } from 'meteor/templating';
import { UserData } from '../../api/userdata/userdata.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Sections } from '../../api/sections/sections.js';

Template.Study_Section_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
  this.dropdownValue = new ReactiveVar()
  this.dropdownValue.set('all');
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
    // console.log(UserData.find().fetch());
    // console.log(Sections.find().fetch());
    // console.log(Template.instance().dropdownValue.get());
    if (Template.instance().dropdownValue.get() === 'comingUp'){
      return Sections.find({ startTime: { $gte: new Date()}});
    }else if (Template.instance().dropdownValue.get() === 'current'){
      return Sections.find({endTime: { $gte: new Date() }, startTime: { $lte: new Date()}});
    } else {
      return Sections.find();
    }

  },
  currentInSec(id) {
    const user = UserData.findOne({userName: Meteor.user().userName});
    return user.currentInSection === id;
  },
  ownerSec(userName, secId){
    if (Meteor.user().userName === userName){
      // const oldSec = Meteor.user().currentInSection;
      // Meteor.call('sections.join', secId, oldSec, Meteor.user().userName);
      // Meteor.call('updateUser','currentInSection', secId);
      return Meteor.user().userName === userName;
    }else{
      return Meteor.user().userName === userName;
    }
  },
  futureSec(secId){
    return Sections.findOne({_id: secId}).startTime > new Date();
  },
  getRole(array, name){
    // console.log(_.findWhere(array, {user: name}).role);
    return _.findWhere(array, {user: name}).role;
  },
  liked(secId) {
    const user = UserData.findOne({userName: Meteor.user().userName});
    const likedSection = user.likedSection;
    // console.log($.inArray(secId, likedSection));
    return $.inArray(secId, likedSection) != -1;
  }

});


Template.Study_Section_Page.onRendered(function enableDropDown() {
  $('#select').dropdown();
});

Template.Study_Section_Page.events({

  'change #select'(event,instance) {
    Template.instance().dropdownValue.set($('#select').dropdown('get value'));
    console.log($('#select').dropdown('get value'));
  },
  'click .joinBt'(event,instance){
    event.preventDefault();
    const user = UserData.findOne({userName: Meteor.user().userName});
    const oldSec = user.currentInSection;
    const newSec = Sections.findOne({_id:event.target.name});
    if (oldSec) {
      if (confirm(`You are currently already in a study section. Do you wish to leave and join ${newSec.course} section?`)) {
        $('.small.modal').modal({
          onDeny    : function(){
            Meteor.call('updateUser',user._id, 'currentInSection', event.target.name);
            Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName,'Grasshopper');
            $('.small.modal').modal('hide');
            FlowRouter.go('Joined_Section_Page',{_id: event.target.name});
          },
          onApprove : function() {
            Meteor.call('updateUser',user._id, 'currentInSection', event.target.name);
            Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName,'Sensei');
            $('.small.modal').modal('hide');
            FlowRouter.go('Joined_Section_Page',{_id: event.target.name});
          }
        }).modal('show');

      }
    }else{
      $('.small.modal').modal({
        onDeny    : function(){
          Meteor.call('updateUser',user._id, 'currentInSection', event.target.name);
          Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName,'Grasshopper');
          $('.small.modal').modal('hide');
          FlowRouter.go('Joined_Section_Page',{_id: event.target.name});
        },
        onApprove : function() {
          Meteor.call('updateUser',user._id, 'currentInSection', event.target.name);
          Meteor.call('sections.join', event.target.name, oldSec, Meteor.user().userName,'Sensei');
          // $('.small.modal').on('hidden.bs.modal', function() {
          $('.small.modal').modal('hide');
            FlowRouter.go('Joined_Section_Page',{_id: event.target.name});
          // }).modal('hide');
        }
      }).modal('show')

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
  },
});
/*
 {{#if ownerSec section.createdBy section._id}}
 <td><a href="" class="removeBt" name="{{section._id}}">Cancel</a></td>
 {{else}}
 */