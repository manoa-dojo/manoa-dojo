/**
 * Created by X on 2016/11/1.
 */
import {Sections} from '../../api/sections/sections.js';
import {_} from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
let d = new Date();
console.log(typeof(d));
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

