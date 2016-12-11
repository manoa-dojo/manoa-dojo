import { Template } from 'meteor/templating';
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';
import { UserData } from '../../api/userdata/userdata.js';

Template.Calendar_Page.onCreated(function onCreated() {
	this.autorun(() => {
		this.subscribe('Sections');
	});

});

Template.Calendar_Page.onRendered(function() {


});

Template.Calendar_Page.helpers({

    options: function() {
      const user = UserData.findOne({userName: Meteor.user().userName});
      const likedSection = user.likedSection;
    	let likedSec = Sections.find({_id : {$in: likedSection}}).fetch();
      let madeSec = Sections.find({'createdBy.user': Meteor.user().userName}).fetch();
    	let sectionArr = [];
      let eventColor = 'orange';
    	for(section of likedSec){
        // Meteor.user() = Meteor.users.findOne(Meteor.userID())
    		sectionArr.push({
    			title: section.course,
    			start: section.startTime.toLocaleString(),
    			end: section.endTime.toLocaleString(),
                url: '../study-section',
    			color: eventColor,
    		});
    	};
      for(section of madeSec){
        // Meteor.user() = Meteor.users.findOne(Meteor.userID())
        sectionArr.push({
          title: section.course,
          start: section.startTime.toLocaleString(),
          end: section.endTime.toLocaleString(),
          url: '../study-section',
          color: 'green',
        });
      };
	    return {events: sectionArr};
    }
});

Template.Calendar_Page.events({

});