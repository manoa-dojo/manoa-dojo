import { Template } from 'meteor/templating';

Template.Calendar_Page.onCreated(function onCreated() {


});

Template.Calendar_Page.onRendered(function() {
	    $('#calendar').fullCalendar({
            events: [
		        {
		            title  : 'ICS 314 Meeting',
		            start  : '2016-10-01',
		            color: 'orange',
		        },
		        {
		            title  : 'Physics 212',
		            start  : '2016-10-05',
		            end    : '2016-10-07',
		            color: 'green',

		        },
		        {
		            title  : 'Psycology 200 Tutoring',
		            start  : '2016-10-09T12:30:00',
		            allDay : false, // will make the time show
		            color: 'orange',

		        },
		        {
		            title  : 'Physics 212',
		            start  : '2016-10-10',
		            end    : '2016-10-13',
		            color: 'green',
		            link: "google.com"
		        },
		        {
		            title  : 'ICS 314 Meeting',
		            start  : '2016-10-20',
		            end    : '2016-10-20',
		            color: 'orange',

		        },
		    ]
    });

});

Template.Calendar_Page.helpers({
    options: function() {
	    return {
	        events: [
		        {
		            title  : 'ICS 314 Meeting',
		            start  : '2016-11-01',
		            color: 'orange',
		        },
		        {
		            title  : 'Physics 212',
		            start  : '2016-11-05',
		            end    : '2016-11-07',
		            color: 'green',

		        },
		        {
		            title  : 'Psycology 200 Tutoring',
		            start  : '2016-11-09T12:30:00',
		            allDay : false, // will make the time show
		            color: 'orange',

		        },
		        {
		            title  : 'Physics 212',
		            start  : '2016-11-10',
		            end    : '2016-11-13',
		            color: 'green',
		            link: "google.com"
		        },
		        {
		            title  : 'ICS 314 Meeting',
		            start  : '2016-11-20',
		            end    : '2016-11-20',
		            color: 'orange',

		        },
		    ]
	    };
    }
});

Template.Calendar_Page.events({

});