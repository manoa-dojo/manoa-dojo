/**
 * Created by X on 2016/11/1.
 */
import {Sections} from '../../api/sections/sections.js';
import {_} from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
let d = new Date();

const sectionSeeds = [
  // { course: 'ICS314', startTime: d, endTime: new Date(d.getTime() + 75*60000), currentCapacity: 0, maxCapacity: '45', purpose: 'Project', description: 'No description Yet' },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Sections.find().count() === 0) {
  _.each(sectionSeeds, function seedSections(stuff) {
    Sections.insert(stuff);
  });
}

Meteor.setInterval(function() {
  // console.log(this.userId);

  let expiredSec = Sections.find({endTime: { $lte: new Date() }}).fetch();
  for (let section of expiredSec) {
    // console.log(section.currentCapacity);
    for (let user of section.usersIn){
      // console.log(user);
      let userId = Meteor.users.findOne({userName: user});
      // console.log(userId);
      // Must be changed
      Meteor.users.update(userId._id, { $inc: { senseiPts: 2 } });
    }
    Sections.remove(section._id);
  }

}, 5000);

