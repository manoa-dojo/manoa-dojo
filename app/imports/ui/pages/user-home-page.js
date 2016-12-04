/**
 * Created by Smau2 on 11/28/2016.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/userdata/userdata.js';

// Template.User_Home_Page.onCreated(function onCreated() {
//   console.log(Meteor.user().userName);
// });

Template.User_Home_Page.helpers({
  userDataList() {
    return UserData.find();
  },
});

Template.User_Home_Page.events({

});