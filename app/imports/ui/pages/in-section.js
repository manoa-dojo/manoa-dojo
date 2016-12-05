/**
 * Created by X on 2016/12/3.
 */
import { Template } from 'meteor/templating';
import { Messages, MessagesSchema } from '../../api/chatroom/messages.js';
import { Sections } from '../../api/sections/sections.js';
import { UserData } from '../../api/userdata/userdata.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

const displayErrorMessages = 'displayErrorMessages';

Template.Joined_Section_Page.onCreated(function Joined_Section_PageOnCreated() {
  this.subscribe('SectionMessages', FlowRouter.getParam('_id'));

  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = MessagesSchema.namedContext('Joined_Section_Page');

});

Template.Joined_Section_Page.onRendered(function Joined_Section_PageOnRendered() {
  this.subscribe('Sections');
  $("#Text1").keypress(function (e) {
    if(e.which == 13 && !e.shiftKey) {
      $(this).closest("form").submit();
      e.preventDefault();
      return false;
    }
  });

});

Template.Joined_Section_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  sectionMessages(){
    return Messages.find();
  },
  sectionUsers(){
    // console.log(Sections.findOne({_id: FlowRouter.getParam('_id')}).usersIn);
    // console.log(Messages.find().fetch());
    return Sections.findOne({_id: FlowRouter.getParam('_id')}).usersIn;
  },
  sectionDescription(){
    return Sections.findOne({_id: FlowRouter.getParam('_id')}).description;
  },
  sectionName(){

    return Sections.findOne({_id: FlowRouter.getParam('_id')}).course;
  },
  userAvatar(userName){
    return UserData.findOne({userName: Meteor.user().userName}).avatar;
  },
  sectionAvailable(){
    return Sections.findOne({_id: FlowRouter.getParam('_id')});
  },
  render() {
    $("#Text1").keypress(function (e) {
      if(e.which == 13 && !e.shiftKey) {
        $(this).closest("form").submit();
        e.preventDefault();
        return false;
      }
    });
  },

});

Template.Joined_Section_Page.events({
  'submit .ui.reply.form'(event, instance) {
    event.preventDefault();
    const user = Meteor.user().userName;
    const section = FlowRouter.getParam('_id');
    const content = $("#Text1").val()
    // console.log(content);
    const createdAt = new Date();

    const newMessage = {user, section, content, createdAt};
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    MessagesSchema.clean(newMessage);
    // Determine validity.
    instance.context.validate(newMessage);
    if (instance.context.isValid()) {
      Meteor.call('messages.insert',newMessage);
      event.target.Text1.value = '';
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log("it's not valid");
    }
  },
  'click #exitBt'(event,instance){

    if (confirm('Do you really want to exit this section?')) {
      event.preventDefault();
      const user = UserData.findOne({userName: Meteor.user().userName});
      Meteor.call('updateUser',user._id, 'currentInSection', '');
      Meteor.call('sections.exit',FlowRouter.getParam('_id'),Meteor.user().userName);
      FlowRouter.go('Study_Section_Page');
    }
    return false;
  },
  // placeholder: if you add a form to this top-level layout, handle the associated events here.

});
