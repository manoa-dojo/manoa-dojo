import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Landing_Page.onCreated(function onCreated() {
	// console.log(Meteor.userId());

});

Template.Landing_Page.helpers({
});

Template.Landing_Page.events({
	'click .cas-logout': function casLogout(event) {
		event.preventDefault();
		Meteor.logout();
		return false;
	},

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