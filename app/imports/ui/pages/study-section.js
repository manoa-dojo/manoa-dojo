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
    return Sections.find();
  },
});

Template.Study_Section_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sections');
  });
});
