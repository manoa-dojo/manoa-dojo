import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/userdata/userdata.js';

Template.Cas_Login.helpers({
  matchUser: function(userData) {
    if(typeof(userData) != "undefined")
      return userData.userName !== "undefined";
    else
      return false;
  },
  userProfile() {
    return UserData.findOne({userName: Meteor.user().userName});
  },
  active(route){
    return route == FlowRouter.current().route.name;
  }
})

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Landing_Page');
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    if(confirm("By logging in you agree to the terms and conditions stated in the about page."))
    {
      const callback = function loginCallback(error) {
        if (error) {
          console.log(error);
        }
      };
      Meteor.loginWithCas(callback);
      return false;
    }

  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Cas_Login.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});
