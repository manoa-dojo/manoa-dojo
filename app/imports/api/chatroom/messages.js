/**
 * Created by X on 2016/12/3.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
/* eslint-disable object-shorthand */

export const Messages = new Mongo.Collection('Messages');

/**
 * Create the schema for Stuff
 */
export const MessagesSchema = new SimpleSchema({
  user: {
    label: 'user',
    type: String,
    optional: false,
    max: 200,
  },
  section: {
    label: 'section',
    type: String,
    optional: false,
    max: 200,
  },
  content: {
    label: 'content',
    type: String,
    optional: false,
    max: 200,
  },
  createdAt: {
    label: 'createdAt',
    type: String,
    optional: false,
    max: 200,
  },
});

Messages.attachSchema(MessagesSchema);