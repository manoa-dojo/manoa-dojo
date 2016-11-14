import { Template } from 'meteor/templating';
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';

Template.Calendar_Page.onCreated(function onCreated() {
	this.autorun(() => {
		this.subscribe('Sections');
	});

});

Template.Calendar_Page.onRendered(function() {


});

Template.Calendar_Page.helpers({

    options: function() {
    	let sec = Sections.find().fetch();
    	let sectionArr = [];
        let eventColor = 'orange';
    	for(section of sec){
            if (Meteor.user().userName == section.createdBy){
                eventColor = 'green';
            };
    		sectionArr.push({
    			title: section.course,
    			start: section.startTime.toLocaleString(),
    			end: section.endTime.toLocaleString(),
                url: '../study-section',
    			color: eventColor,
    		});
    	};
	    return {events: sectionArr};
    }
});

Template.Calendar_Page.events({

});