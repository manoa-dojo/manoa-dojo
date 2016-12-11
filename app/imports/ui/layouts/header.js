import { Template } from 'meteor/templating';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});
Template.Header.helpers({
  active(route) {
    console.log(FlowRouter.current().route.name + "and input is " + route);
    return route == FlowRouter.current().route.name;
  }
});

Template.Header.events({
  'click a.item'(event, instance){
    $("a.item").removeClass("active");
    $(event.target).addClass("active");
  }
});
