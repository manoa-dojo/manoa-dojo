/**
 * Created by X on 2016/11/1.
 */
import { Template } from 'meteor/templating';
import { Sections } from '../../api/sections/sections.js';

Template.Study_Section_Page.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  sectionsList() {
    let currentTime = new Date();
    for (let section of Sections.find().fetch()) {
      if (section.endTime.getTime() < currentTime.getTime()){
        console.log('Removing a section');
        Sections.remove(section._id);
      }
    }

    return Sections.find();
  },

});

Template.Study_Section_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
});
