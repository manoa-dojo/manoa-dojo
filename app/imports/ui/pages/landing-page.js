import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/sections/userdata.js';

Template.Landing_Page.onCreated(function onCreated() {
	// console.log(Meteor.userId());

});

Template.Landing_Page.helpers({
  userDataList() {
    return UserData.find();
  },
});

Template.Landing_Page.events({
	'click .cas-logout': function casLogout(event) {
		event.preventDefault();
		Meteor.logout();
		return false;
	},

	'click .cas-login': function casLogin(event, instance) {
		event.preventDefault();
		if(confirm("By loggin in you agree to the Terms of Use:\n This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system. All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code. The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site."))
		{
		  const callback = function loginCallback(error) {
		    if (error) {
		      console.log(error);
		    }
		  };
      Meteor.loginWithCas(callback);
      console.log(Meteor.userId());
      //const updatedProfile = {userId: Meteor.userId(), userName: Meteor.user().username, firstName: firstName, lastName : lastName, telephone : telephone, sessionsAttended: 0, sessionsCreated: 0, sessionsAttendedThisMonth: 0, sessionsCreatedThisMonth: 0, grasshopperSubjects: grasshopper, SenseiSubjects: sensei };
      //Contacts.insert(newContact);
      return false;
		}

	},
});