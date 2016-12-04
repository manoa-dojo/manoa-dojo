/**
 * Created by X on 2016/12/3.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
/* eslint-disable object-shorthand */

export const RoomUsers = new Mongo.Collection('RoomUsers');

/**
 * Create the schema for Stuff
 */
export const RoomUsersSchema = new SimpleSchema({
  section: {
    label: 'section',
    type: String,
    optional: false,
    max: 200,
  },
  users: {
    label: 'users',
    type: [Object],
    minCount: 0,
    optional: false,
    blackbox: true,
  },
});

RoomUsers.attachSchema(RoomUsersSchema);