/**
 * Created by X on 2016/12/3.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/userdata/userdata.js';

Template.Section_Body.onCreated(function landingBodyOnCreated() {
  // placeholder: typically you will put global subscriptions here if you remove the autopublish package.
});

Template.Section_Body.helpers({
  sectionNumber() {

    return UserData.findOne({userName: Meteor.user().userName}).currentInSection;

  },
  activeTabEnable(e){
    // console.log(e);
    // console.log(FlowRouter.getParam('_id'));
    if (e == 'B') {
      if (FlowRouter.getParam('_id')) {
        return true;
      }else{
        return false;
      }
    } else {
        if (FlowRouter.getParam('_id')) {
          return false;
        }
        else {
          return true;
        }
    }
  }
  // placeholder: if you display dynamic data in your layout, you will put your template helpers here.
});
Template.Section_Body.onRendered(function landingBodyOnRendered() {

  // placeholder: typically you will put global subscriptions here if you remove the autopublish package.
});

Template.Section_Body.events({
  'click .step.A'(event, instance) {
    event.preventDefault();
    $(".step.B").removeClass("active");
    $(".step.A").addClass("active");
    FlowRouter.go('Study_Section_Page');
  },
  'click .step.B'(event, instance) {
    event.preventDefault();
    $(".step.A").removeClass("active");
    $(".step.B").addClass("active");
    let id = UserData.findOne({userName: Meteor.user().userName}).currentInSection;
    FlowRouter.go('Joined_Section_Page',{_id: id});
  },
  // placeholder: if you add a form to this top-level layout, handle the associated events here.
});
