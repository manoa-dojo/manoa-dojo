/**
 * Created by X on 2016/12/3.
 */
import { Template } from 'meteor/templating';
import { Messages } from '../../api/chatroom/messages.js';
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.Joined_Section_Page.onCreated(function Joined_Section_PageOnCreated() {
  this.subscribe('SectionMessages', FlowRouter.getParam('_id'));

});

Template.Joined_Section_Page.onRendered(function Joined_Section_PageOnRendered() {
  this.subscribe('Sections');

});

Template.Joined_Section_Page.helpers({
  sectionMessages(){
    return Messages.find();
  },
  sectionUsers(){
    console.log(Sections.findOne({_id: FlowRouter.getParam('_id')}).usersIn);
    return Sections.findOne({_id: FlowRouter.getParam('_id')}).usersIn;
  }

});

Template.Joined_Section_Page.events({
  // placeholder: if you add a form to this top-level layout, handle the associated events here.
});
