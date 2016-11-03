import { Template } from 'meteor/templating';

Template.Landing_Page.onCreated(function onCreated() {
	console.log('test01');
});

Template.Landing_Page.helpers({
});

Template.Landing_Page.events({
	'click #signup-btn'(event){
		$('#action-btns').slideToggle();
        $('#signup').slideToggle();
	},
	'click #login-btn'(event){
		$('#action-btns').slideToggle();
        $('#login').slideToggle();
	},
	'click #signup-back'(event){
      $('#signup').slideToggle();
      $('#action-btns').slideToggle();
	},
	'click #login-back'(event){
      $('#login').slideToggle();
      $('#action-btns').slideToggle();
	},
});