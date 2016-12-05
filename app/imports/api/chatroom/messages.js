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
    type: Date,
    optional: false,
  },
});

Messages.attachSchema(MessagesSchema);

Meteor.methods({
  'messages.insert'(newMessage) {
    check(newMessage, Object);
    // console.log(newSection.endTime);
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Messages.insert(newMessage,function(err,result){
      if (err){
        console.log(result);
      }else{
        console.log('good ' + result);
      }
    });
  },
  'messages.delete'(secId) {
    check(secId, String);
    // console.log(newSection.endTime);
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    const expiredMessages = Messages.find({section:secId}).fetch();
    for (let message of expiredMessages){
      Messages.remove(message._id);
    }
  },
})