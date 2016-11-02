/**
 * Created by X on 2016/11/1.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Sections = new Mongo.Collection('Sections');

/**
 * Create the schema for Stuff
 */
export const SectionsSchema = new SimpleSchema({
  course: {
    label: 'Course',
    type: String,
    optional: false,
    max: 200,
  },
  startTime: {
    label: 'StartTime',
    type: String,
    optional: false,
    max: 200,
  },
  endTime: {
    label: 'EndTime',
    type: String,
    optional: false,
    max: 200,
  },
  currentCapacity: {
    label: 'CurrentCapacity',
    type: Number,
    optional: false,
  },
  maxCapacity: {
    label: 'MaxCapacity',
    type: String,
    optional: false,
    max: 200,
  },
  description: {
    label: 'Description',
    type: String,
    optional: false,
    max: 200,
  },
  purpose: {
    label: 'Purpose',
    type: String,
    optional: false,
    max: 200,
  }
});

Sections.attachSchema(SectionsSchema);
