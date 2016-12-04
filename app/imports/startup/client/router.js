import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('Landing_Body', { main: 'Landing_Page' });
  },
});

FlowRouter.route('/about', {
  name: 'About_Page',
  action() {
    BlazeLayout.render('Landing_Body', { main: 'About_Page' });
  },
});


FlowRouter.route('/home-page', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/study-section', {
  name: 'Study_Section_Page',
  action() {

    BlazeLayout.render('Section_Body', { main: 'Study_Section_Page' });
  },
});

FlowRouter.route('/study-section/:_id', {
  name: 'Joined_Section_Page',
  action() {

    BlazeLayout.render('Section_Body', { main: 'Joined_Section_Page' });
  },
});

FlowRouter.route('/calendar', {
  name: 'Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
  },
});

FlowRouter.route('/leaderboard', {
  name: 'Game_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Game_Page' });
  },
});


FlowRouter.route('/profile/:_id', {
  name: 'User_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Page' });
  },
});

FlowRouter.route('/edit-profile-page/:_id', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/create-section', {
  name: 'Create_Section_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Section_Page' });
  },
});

FlowRouter.route('/user-home-page', {
  name: 'User_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Home_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

Accounts.onLogin(function() {
  if ( Meteor.isClient ) {
    let currentRoute = FlowRouter.current();
    let path = currentRoute.path;
    if (path !== '/' ){
      return false;
    }else{
      return FlowRouter.go( 'User_Home_Page' );
    }
  }
});