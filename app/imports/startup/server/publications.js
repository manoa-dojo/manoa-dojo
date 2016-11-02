/**
 * Created by X on 2016/10/16.
 */
import { Sections } from '../../api/sections/sections.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sections', function publishSectionsData() {
  return Sections.find();
});